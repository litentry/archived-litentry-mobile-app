import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {ExtrinsicPayload} from '@polkadot/types/interfaces';
import {Layout, Button, Divider, Icon, IconProps} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {createSignPayload, createFrames, QrCode} from 'src/utils';
import {CMD_MORTAL, CMD_HASH} from 'src/constants';
import ModalTitle from './ModalTitle';
import {ChainApiContext} from 'context/ChainApiContext';
import {HashBlock} from 'presentational/HashBlock';

const QR_CODE_DIMENTION = {width: 280, height: 280};

const QRIcon = (props: IconProps) => <Icon {...props} name="video-outline" />;

type PropTypes = {
  payload: SignerPayloadJSON;
  onConfirm: () => void;
  onCancel: () => void;
};

function TxPayloadQr({payload, onConfirm, onCancel}: PropTypes): React.ReactElement {
  const {api} = useContext(ChainApiContext);
  const [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    if (!api) {
      return;
    }
    // limit size of the transaction
    const isQrHashed = payload.method.length > 5000;
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

    qr.addData(frames[0] as any, 'Byte');
    qr.make();

    setImageUri(qr.createDataURL(16, 0));
  }, [api, payload]);

  return (
    <Layout style={styles.container} level="1">
      <ModalTitle title="Authorization required" />
      <View style={styles.content}>
        <Divider style={globalStyles.dividerPlain} />
        <HashBlock text={payload.blockHash} title={'call hash'} />
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
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: standardPadding * 2,
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  content: {padding: standardPadding * 2},
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
