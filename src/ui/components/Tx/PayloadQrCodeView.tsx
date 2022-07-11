import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import {createFrames, QrCode} from 'src/utils/qrCode';
import {createSignPayload} from 'src/utils/signer';
import {CMD_HASH, CMD_MORTAL} from 'src/constants';
import {Button, useTheme, Subheading} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {Layout} from '@ui/components/Layout';
import {TxConfig, TxPayload} from 'polkadot-api';
import {useCryptoUtil} from '@polkadotApi/useCryptoUtil';
import {useTx} from '@polkadotApi/useTx';
import LoadingView from '@ui/components/LoadingView';

const TX_SIZE_LIMIT = 5000;

type Props = {
  address: string;
  txConfig: TxConfig;
  onConfirm: (txPayload: TxPayload) => void;
  onCancel: () => void;
};

export function PayloadQrCodeView({address, txConfig, onConfirm, onCancel}: Props): React.ReactElement {
  const [imageUri, setImageUri] = useState<string>();
  const {colors} = useTheme();
  const {decodeAddress} = useCryptoUtil();
  const {getTxPayload} = useTx();
  const [txPayload, setTxPayload] = useState<TxPayload>();

  useEffect(() => {
    (async () => {
      const _txPayloadData = await getTxPayload({address, txConfig});
      // limit size of the transaction
      const isQrHashed = _txPayloadData.txPayload.method.length > TX_SIZE_LIMIT;
      const decodedAddress = await decodeAddress({encoded: address});
      const signPayload = createSignPayload(
        decodedAddress,
        isQrHashed ? CMD_HASH : CMD_MORTAL,
        _txPayloadData.signablePayload,
        _txPayloadData.txPayload.genesisHash,
      );
      // TODO: not supporting multi frame
      const frames = createFrames(signPayload);
      const qr = QrCode(0, 'M');

      // TODO: check me!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      qr.addData(frames[0] as any, 'Byte');
      qr.make();

      setImageUri(qr.createDataURL(16, 0));
      setTxPayload(_txPayloadData.txPayload);
    })();
  }, [txConfig, decodeAddress, address, getTxPayload]);

  const onPress = useCallback(() => {
    if (txPayload) {
      onConfirm(txPayload);
    }
  }, [onConfirm, txPayload]);

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>{`Authorization required`}</Subheading>
      <Padder scale={1} />
      <View style={styles.qrContainer}>
        {!imageUri ? (
          <LoadingView />
        ) : (
          <Image
            source={{
              uri: imageUri,
              width: QR_CODE_DIMENSION.width - standardPadding,
              height: QR_CODE_DIMENSION.height - standardPadding,
            }}
          />
        )}
      </View>
      <Padder scale={1} />
      <View style={styles.buttonGroup}>
        <Button mode="outlined" color={colors.accent} onPress={onCancel}>
          Cancel
        </Button>
        <Padder scale={1} />
        <Button compact mode="contained" onPress={onPress} icon="qrcode-scan">
          Scan Signature
        </Button>
      </View>
      <Padder scale={2} />
    </Layout>
  );
}

const QR_CODE_DIMENSION = {width: 180, height: 180};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: standardPadding * 2,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
