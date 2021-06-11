import React from 'react';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {Button, Divider, Icon, Layout, Text} from '@ui-kitten/components';
import ModalTitle from 'presentational/ModalTitle';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {HashBlock} from 'presentational/HashBlock';

type PropTypes = {
  transactionTitle: string;
  transactionInfo: string;
  payload: SignerPayloadJSON;
  onConfirm: () => void;
  onCancel: () => void;
};
export function PreviewStep(props: PropTypes) {
  const {transactionTitle, transactionInfo, payload, onConfirm, onCancel} = props;

  return (
    <Layout style={styles.container} level="1">
      <ModalTitle title="Preview" />
      <View style={styles.content}>
        <Divider style={globalStyles.dividerPlain} />
        <Text>{transactionTitle}</Text>
        <Text>{transactionInfo}</Text>
        <HashBlock text={payload.blockHash} title={'call hash'} />
        <Layout style={styles.buttonGroup}>
          <Button style={styles.cancel} appearance="ghost" size="small" status="warning" onPress={onCancel}>
            Cancel
          </Button>
          <Button
            style={styles.submit}
            appearance="outline"
            onPress={onConfirm}
            accessoryRight={(props) => <Icon {...props} name="video-outline" />}>
            Continue
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  cancel: {flex: 1},
  submit: {flex: 2},
});
