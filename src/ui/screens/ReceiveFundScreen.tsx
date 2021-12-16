import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, Share, View, StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import qrcode from 'qrcode-generator';
import {stringShorten} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import {Modalize} from 'react-native-modalize';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {receiveFundScreen} from '@ui/navigation/routeKeys';
import {Caption, Headline, IconButton, Snackbar} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';

type Props = {
  navigation: NavigationProp<AccountsStackParamList, typeof receiveFundScreen>;
  route: RouteProp<AccountsStackParamList, typeof receiveFundScreen>;
};

export function ReceiveFundScreen({navigation, route}: Props) {
  const {address} = route.params;
  const ref = useRef<Modalize>(null);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    ref.current?.open();
  }, []);

  const [imageUri] = useState(() => getAccountQRCode(address));

  const copyToClipboard = () => {
    Clipboard.setString(address);
    setVisible(true);
  };

  return (
    <Modalize ref={ref} adjustToContentHeight onClose={navigation.goBack} closeOnOverlayTap>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Headline>Receive</Headline>
          <Padder scale={1} />
          <Image source={{uri: imageUri}} style={styles.qrCode} />
          <Padder scale={1} />
          <View style={globalStyles.rowAlignCenter}>
            <IconButton icon="content-copy" size={20} onPress={copyToClipboard} />
            <IconButton icon="share-variant" size={20} onPress={() => share(address)} />
          </View>
          <Caption onPress={copyToClipboard} style={styles.address}>
            {stringShorten(address, 16)}
          </Caption>
        </View>
      </SafeView>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        duration={3000}>
        Address copied to clipboard!
      </Snackbar>
    </Modalize>
  );
}

// share string via react-native
function share(string: string) {
  Share.share({
    message: string,
  });
}

const QR_CODE_DIMENSION = Dimensions.get('screen').width * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: standardPadding * 2,
  },
  address: {
    flex: 1,
    textAlign: 'center',
    marginVertical: standardPadding,
    marginHorizontal: standardPadding * 4,
  },
  qrCode: {
    width: QR_CODE_DIMENSION,
    height: QR_CODE_DIMENSION,
  },
});

function getAccountQRCode(text: string) {
  if (qrcode.stringToBytesFuncs['UTF-8']) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
  }

  const qr = qrcode(0, 'M');
  qr.addData(text, 'Byte');
  qr.make();
  return qr.createDataURL(16);
}
