import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Share, View, StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import qrcode from 'qrcode-generator';
import {stringShorten} from '@polkadot/util';
import {Text, IconButton, Button, Skeleton} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {useSnackbar} from 'context/SnackbarContext';
import {Layout} from '@ui/components/Layout';

type Props = {
  address: string;
  onClose: () => void;
};

const QR_CODE_DIMENSION = Dimensions.get('screen').width * 0.5;

export function ReceiveFund({address, onClose}: Props) {
  const snackbar = useSnackbar();
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setImageUri(getAccountQRCode(address));
    }, 500);
  }, [address]);

  const copyToClipboard = () => {
    Clipboard.setString(address);
    snackbar('Address copied to clipboard!');
  };

  return (
    <Layout style={styles.container}>
      <Text variant="titleMedium">Receive Fund</Text>
      <Padder scale={1} />
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.qrCode} />
      ) : (
        <Skeleton width={QR_CODE_DIMENSION} height={QR_CODE_DIMENSION} />
      )}
      <Padder scale={1} />
      <View style={globalStyles.rowAlignCenter}>
        <IconButton icon="content-copy" size={20} onPress={copyToClipboard} />
        <IconButton icon="share-variant" size={20} onPress={() => share(address)} />
      </View>
      <Text variant="bodySmall" onPress={copyToClipboard} style={styles.address}>
        {stringShorten(address, 16)}
      </Text>
      <Padder scale={1} />
      <Button onPress={onClose}>Close</Button>
      <Padder scale={2} />
    </Layout>
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
