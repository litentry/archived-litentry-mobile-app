import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ExtrinsicPayload} from '@polkadot/types/interfaces';
import globalStyles, {standardPadding} from '@ui/styles';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {createFrames, QrCode} from 'src/utils/qrCode';
import {createSignPayload} from 'src/utils/signer';
import {CMD_HASH, CMD_MORTAL} from 'src/constants';
import {ChainApiContext} from 'context/ChainApiContext';
import {Button, useTheme, Subheading} from '@ui/library';
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
      <Subheading style={globalStyles.textCenter}>{`Authorization required`}</Subheading>
      <Padder scale={1} />
      <View style={styles.qrContainer}>
        <Image
          source={{
            uri: imageUri,
            width: QR_CODE_DIMENSION.width - standardPadding,
            height: QR_CODE_DIMENSION.height - standardPadding,
          }}
        />
      </View>
      <Padder scale={1} />
      <View style={styles.buttonGroup}>
        <Button mode="outlined" color={colors.accent} onPress={onCancel}>
          Cancel
        </Button>
        <Padder scale={1} />
        <Button compact mode="contained" onPress={onConfirm} icon="qrcode-scan">
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
