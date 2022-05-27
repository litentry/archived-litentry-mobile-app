import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {BN} from '@polkadot/util';
import globalStyles, {standardPadding} from '@ui/styles';
import {HashBlock} from '@ui/components/HashBlock';
import {Padder} from '@ui/components/Padder';
import {Button, Caption, Icon, Subheading, Text, useTheme} from '@ui/library';
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
      <Subheading style={globalStyles.textCenter}>{`Preview`}</Subheading>
      <Padder scale={1} />
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
      <Padder scale={2} />
      <View style={styles.buttonGroup}>
        <Button mode="outlined" onPress={onCancel} color={colors.accent}>
          Cancel
        </Button>
        <Padder scale={1} />
        <Button mode="contained" compact onPress={onConfirm} icon={isExternalAccount ? 'qrcode-scan' : undefined}>
          Continue
        </Button>
      </View>
      <Padder scale={2} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: standardPadding * 2,
  },
  content: {padding: standardPadding * 2},
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: standardPadding,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
