import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {BN} from '@polkadot/util';
import globalStyles, {standardPadding} from '@ui/styles';
import {HashBlock} from '@ui/components/HashBlock';
import {Padder} from '@ui/components/Padder';
import {Button, Caption, Icon, Subheading, Text, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {TxConfig, TxInfo} from 'polkadot-api';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import {useTx} from '@polkadotApi/useTx';

const {height} = Dimensions.get('window');

type Props = {
  address: string;
  txConfig: TxConfig;
  onConfirm: (isExternalAccount: boolean) => void;
  onCancel: () => void;
};

export function TxPreview({address, txConfig, onCancel, onConfirm}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();
  const {getTxInfo} = useTx();
  const {accounts} = useAppAccounts();
  const isExternal = Boolean(accounts[address]?.meta.isExternal);
  const [txInfo, setTxInfo] = useState<TxInfo>();
  const toggleShowParams = () => setOpen(!open);

  const onConfirmPress = useCallback(() => {
    onConfirm(isExternal);
    setTxInfo(undefined);
  }, [onConfirm, isExternal]);

  const onCancelPress = useCallback(() => {
    onCancel();
    setTxInfo(undefined);
  }, [onCancel]);

  useEffect(() => {
    getTxInfo({address, txConfig}).then(setTxInfo);
  }, [getTxInfo, address, txConfig]);

  return (
    <Layout style={styles.container}>
      {!txInfo ? (
        <View style={[styles.emptyState, globalStyles.fillCenter]}>
          <Subheading>Preparing transaction payload...</Subheading>
        </View>
      ) : (
        <>
          <Subheading style={globalStyles.textCenter}>{`Preview`}</Subheading>
          <Padder scale={1} />
          <HashBlock text={txInfo.blockHash} title={'call hash'} />
          <Padder scale={0.5} />
          <TouchableOpacity
            style={styles.infoContainer}
            onPress={txConfig.params.length ? toggleShowParams : undefined}>
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
            <Button mode="outlined" onPress={onCancelPress} color={colors.accent}>
              Cancel
            </Button>
            <Padder scale={1} />
            <Button mode="contained" compact onPress={onConfirmPress} icon={isExternal ? 'qrcode-scan' : undefined}>
              Continue
            </Button>
          </View>
        </>
      )}
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
