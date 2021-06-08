import React, {useState, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import {ApiPromise} from '@polkadot/api';
import {ExtrinsicPayload} from '@polkadot/types/interfaces';
import {Layout, Button, Divider, Icon, IconProps} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {createSignPayload, createFrames, QrCode} from 'src/utils';
import {CMD_MORTAL, CMD_HASH} from 'src/constants';
import ModalTitle from './ModalTitle';

const QR_CODE_DIMENTION = {width: 280, height: 280};

const QRIcon = (props: IconProps) => <Icon {...props} name="video-outline" />;

type PropTypes = {
  api: ApiPromise;
  payload: SignerPayloadJSON;
  onConfirm: () => void;
  onCancel: () => void;
};

function TxPayloadQr({api, payload, onConfirm, onCancel}: PropTypes) {
  const [imageUri, setImageUri] = useState<string>();
  // limit size of the transaction
  const isQrHashed = payload.method.length > 5000;
  const wrapper: ExtrinsicPayload = api.registry.createType('ExtrinsicPayload', payload);

  const signPayload = createSignPayload(
    payload.address,
    isQrHashed ? CMD_HASH : CMD_MORTAL,
    wrapper.toU8a(),
    payload.genesisHash,
  );

  useEffect(() => {
    // TODO: not supporting multi frame
    const frames = createFrames(signPayload);
    const qr = QrCode(0, 'M');

    qr.addData(frames[0] as any, 'Byte');
    qr.make();

    setImageUri(qr.createDataURL(16, 0));
  }, [signPayload]);

  return (
    <Layout style={styles.container} level="1">
      <ModalTitle title="Authorization required" />
      <Divider style={globalStyles.dividerPlain} />
      <Layout style={styles.qrContainer} level="3">
        <Image
          source={{
            uri: imageUri,
            width: QR_CODE_DIMENTION.width - standardPadding,
            height: QR_CODE_DIMENTION.height - standardPadding,
          }}
        />
      </Layout>
      <Layout style={styles.buttonGroup}>
        <Button style={styles.cancel} appearance="ghost" size="small" status="warning" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.submit} appearance="outline" onPress={onConfirm} accessoryRight={QRIcon}>
          Scan Signature
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: standardPadding * 2,
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  qrContainer: {
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    margin: standardPadding * 3,
    ...QR_CODE_DIMENTION,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  cancel: {
    width: '30%',
  },
  submit: {
    flex: 1,
  },
});
export default TxPayloadQr;
