import {NavigationProp, RouteProp} from '@react-navigation/core';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {StyleSheet, Headline, View, Button, IconButton, Caption} from 'src/packages/base_components';
import globalStyles, {standardPadding} from 'src/styles';
import {receiveFundScreen} from 'src/navigation/routeKeys';
import {Image, Share} from 'react-native';
import {useTheme} from 'context/ThemeContext';
import Clipboard from '@react-native-community/clipboard';
import {QrCode} from 'src/utils';

type Props = {
  navigation: NavigationProp<AccountsStackParamList, typeof receiveFundScreen>;
  route: RouteProp<AccountsStackParamList, typeof receiveFundScreen>;
};

export function ReceiveFundScreen({navigation, route}: Props) {
  const theme = useTheme();
  const {address} = route.params;
  const ref = useRef<Modalize>(null);

  useEffect(() => {
    ref.current?.open();
  }, []);

  const [imageUri] = useState(() => getAccountQRCode(address));

  return (
    <Modalize ref={ref} adjustToContentHeight onClose={navigation.goBack} closeOnOverlayTap panGestureEnabled={false}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Headline>Receive</Headline>
          <Image source={{uri: imageUri}} style={styles.qrCode} />
          <View style={globalStyles.rowAlignCenter}>
            <Caption style={styles.address}>{address}</Caption>
            <IconButton
              icon="content-copy"
              color={theme.colors.disabled}
              onPress={() => Clipboard.setString(address)}
            />
          </View>
          <Button icon="share-variant" onPress={() => share(address)}>
            Share
          </Button>
        </View>
      </SafeView>
    </Modalize>
  );
}

// share string via react-native
function share(string: string) {
  Share.share({
    message: string,
  });
}

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
  },
  qrCode: {
    width: 250,
    height: 250,
  },
});

function getAccountQRCode(text: string) {
  const qr = QrCode(0, 'M');
  qr.addData(text, 'Byte');
  qr.make();
  return qr.createDataURL(16);
}
