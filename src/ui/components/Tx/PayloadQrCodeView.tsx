import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ExtrinsicPayload} from '@polkadot/types/interfaces';
import {standardPadding} from '@ui/styles';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {createFrames, QrCode} from 'src/utils/qrCode';
import {createSignPayload} from 'src/utils/signer';
import {CMD_HASH, CMD_MORTAL} from 'src/constants';
import ModalTitle from '@ui/components/ModalTitle';
import {ChainApiContext} from 'context/ChainApiContext';
import {Button, Divider, useTheme} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {Layout} from '@ui/components/Layout';

const TX_SIZE_LIMIT = 5000;

type PropTypes = {
  payload: SignerPayloadJSON;
  onConfirm: () => void;
  onCancel: () => void;
};

export function PayloadQrCodeView({payload, onConfirm, onCancel}: PropTypes): React.ReactElement {
  const {api} = useContext(ChainApiContext);
  const [imageUri, setImageUri] = useState<string>();
  const {colors} = useTheme();

  useEffect(() => {
    if (!api) {
      return;
    }
    // limit size of the transaction
    const isQrHashed = payload.method.length > TX_SIZE_LIMIT;
    const wrapper: ExtrinsicPayload = api.registry.createType('ExtrinsicPayload', payload);
    const signPayload = createSignPayload(
      payload.address,
      isQrHashed ? CMD_HASH : CMD_MORTAL,
      wrapper.toU8a(),
      payload.genesisHash,
    );
    // TODO: not supporting multi frame
    const frames = createFrames(signPayload);
    const qr = QrCode(0, 'M');

    // TODO: check me!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    qr.addData(frames[0] as any, 'Byte');
    qr.make();

    setImageUri(qr.createDataURL(16, 0));
  }, [api, payload]);

  return (
    <Layout style={styles.container}>
      <ModalTitle title="Authorization required" />
      <Divider />
      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <Image
            source={{
              uri: imageUri,
              width: QR_CODE_DIMENSION.width - standardPadding,
              height: QR_CODE_DIMENSION.height - standardPadding,
            }}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button mode="outlined" color={colors.accent} onPress={onCancel}>
            Cancel
          </Button>
          <Padder scale={1} />
          <Button compact mode="contained" onPress={onConfirm} icon="qrcode-scan">
            Scan Signature
          </Button>
        </View>
      </View>
    </Layout>
  );
}

const QR_CODE_DIMENSION = {width: 180, height: 180};
const styles = StyleSheet.create({
  container: {
    paddingVertical: standardPadding * 2,
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  content: {padding: standardPadding * 2},
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
});
