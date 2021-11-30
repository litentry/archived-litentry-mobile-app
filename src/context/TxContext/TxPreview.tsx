import React, {useState} from 'react';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {Button, Divider, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import ModalTitle from 'presentational/ModalTitle';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {HashBlock} from 'presentational/HashBlock';
import {Padder} from 'src/packages/base_components';
import {BN} from '@polkadot/util';

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
  const theme = useTheme();
  const {transactionTitle, transactionInfo, partialFee, txPayload, params, onConfirm, onCancel, isExternalAccount} =
    props;

  return (
    <Layout style={styles.container} level="1">
      <ModalTitle title="Preview" />
      <Divider style={globalStyles.dividerPlain} />
      <ScrollView style={styles.content}>
        <HashBlock text={txPayload.blockHash} title={'call hash'} />
        <Padder scale={0.5} />
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => {
            setOpen(!open);
          }}>
          <View style={globalStyles.flex}>
            <Text category={'c1'}>{transactionTitle}</Text>
            <Padder scale={0.3} />
            <Text category={'c1'} style={{color: theme['color-basic-600']}}>
              {transactionInfo}
            </Text>
          </View>
          <Icon
            name={open ? 'arrow-up-outline' : 'arrow-down-outline'}
            style={globalStyles.icon}
            fill={theme['color-basic-600']}
          />
        </TouchableOpacity>
        {open ? (
          <Text style={[styles.payload, {backgroundColor: theme['color-basic-500']}]}>{stringifyParams(params)}</Text>
        ) : undefined}
        <Text category={'c1'}>{`Fees of ${partialFee / 10 ** 6} micro Unit will be applied to the submission`}</Text>
        <Padder scale={1} />
        <Layout style={styles.buttonGroup}>
          <Button style={styles.cancel} appearance="ghost" size="small" status="warning" onPress={onCancel}>
            Cancel
          </Button>
          <Button
            style={styles.submit}
            appearance="outline"
            onPress={onConfirm}
            accessoryRight={isExternalAccount ? (p) => <Icon {...p} name="video-outline" /> : undefined}>
            Continue
          </Button>
        </Layout>
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
  infoContainer: {flexDirection: 'row', alignItems: 'center', paddingVertical: standardPadding},
  buttonGroup: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {flex: 1},
  submit: {flex: 2},
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
