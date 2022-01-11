import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {BN} from '@polkadot/util';
import ModalTitle from '@ui/components/ModalTitle';
import globalStyles, {standardPadding} from '@ui/styles';
import {HashBlock} from '@ui/components/HashBlock';
import {Padder} from '@ui/components/Padder';
import {Button, Caption, Icon, Divider, Text, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';

type PropTypes = {
  transactionTitle: string;
  transactionInfo: string;
  txPayload: SignerPayloadJSON;
  params: unknown[];
  partialFee: number;
  onConfirm: () => void;
  onCancel: () => void;
  isExternalAccount: boolean;
};

export function TxPreview(props: PropTypes): React.ReactElement {
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();
  const {transactionTitle, transactionInfo, partialFee, txPayload, params, onConfirm, onCancel, isExternalAccount} =
    props;

  return (
    <Layout style={styles.container}>
      <ModalTitle title="Preview" />
      <Divider />
      <ScrollView style={styles.content}>
        <HashBlock text={txPayload.blockHash} title={'call hash'} />
        <Padder scale={0.5} />
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => {
            setOpen(!open);
          }}>
          <View style={globalStyles.flex}>
            <Text>{transactionTitle}</Text>
            <Padder scale={0.3} />
            <Caption>{transactionInfo}</Caption>
          </View>
          <Icon name={open ? 'chevron-up' : 'chevron-down'} />
        </TouchableOpacity>
        {open ? <Text style={[styles.payload]}>{stringifyParams(params)}</Text> : undefined}
        <Text>{`Fees of ${partialFee / 10 ** 6} micro Unit will be applied to the submission`}</Text>
        <Padder scale={1} />
        <View style={styles.buttonGroup}>
          <Button mode="outlined" onPress={onCancel} color={colors.accent}>
            Cancel
          </Button>
          <Padder scale={1} />
          <Button mode="contained" compact onPress={onConfirm} icon={isExternalAccount ? 'qrcode-scan' : undefined}>
            Continue
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: standardPadding * 2,
    marginBottom: standardPadding * 2,
  },
  content: {padding: standardPadding * 2},
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: standardPadding,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  payload: {fontSize: 9, padding: standardPadding, marginVertical: standardPadding},
});

function stringifyParams(params: unknown[]): string {
  return JSON.stringify(
    params.map((p) => {
      if (BN.isBN(p)) {
        return p.toNumber().toLocaleString();
      }
      if (Array.isArray(p)) {
        return stringifyParams(p);
      }
      return p;
    }),
    null,
    2,
  );
}
