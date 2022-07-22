import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {BN} from '@polkadot/util';
import globalStyles, {standardPadding} from '@ui/styles';
import {HashBlock} from '@ui/components/HashBlock';
import {Padder} from '@ui/components/Padder';
import {Button, Caption, Icon, Subheading, Text, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {TxConfig, TxInfo} from 'polkadot-api';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';

const {height} = Dimensions.get('window');

type Props = {
  address: string;
  txConfig: TxConfig;
  txInfo: TxInfo;
  onConfirm: (isExternalAccount: boolean) => void;
  onCancel: () => void;
};

export function TxPreview({address, txConfig, txInfo, onCancel, onConfirm}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();
  const {accounts} = useAppAccounts();
  const isExternal = Boolean(accounts[address]?.meta.isExternal);
  const toggleShowParams = () => setOpen(!open);

  const onConfirmPress = useCallback(() => {
    onConfirm(isExternal);
  }, [onConfirm, isExternal]);

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>{`Preview`}</Subheading>
      <Padder scale={1} />
      <HashBlock text={txInfo.blockHash} title={'call hash'} />
      <Padder scale={0.5} />
      <TouchableOpacity style={styles.infoContainer} onPress={txConfig.params.length ? toggleShowParams : undefined}>
        <View style={globalStyles.flex}>
          <Text>{txInfo.title}</Text>
          <Padder scale={0.3} />
          <Caption>{txInfo.description}</Caption>
        </View>
        {txConfig.params.length ? <Icon name={open ? 'chevron-up' : 'chevron-down'} /> : null}
      </TouchableOpacity>
      {open ? <Text style={[styles.payload]}>{stringifyParams(txConfig.params)}</Text> : undefined}
      <Text>{`Fees of ${txInfo.partialFee / 10 ** 6} micro Unit will be applied to the submission`}</Text>
      <Padder scale={2} />
      <View style={styles.buttonGroup}>
        <Button mode="outlined" onPress={onCancel} color={colors.accent}>
          Cancel
        </Button>
        <Padder scale={1} />
        <Button mode="contained" compact onPress={onConfirmPress} icon={isExternal ? 'qrcode-scan' : undefined}>
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
  emptyState: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
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
