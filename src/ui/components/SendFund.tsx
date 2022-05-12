import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {Button, Subheading, TextInput, Switch, HelperText} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import BalanceInput from '@ui/components/BalanceInput';
import {useAccount} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';
import {InputLabel} from '@ui/library/InputLabel';
import {useSnackbar} from 'context/SnackbarContext';
import {BN_ZERO} from '@polkadot/util';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {stringToBn as stringToBnUtil, formattedStringToBn} from 'src/utils/balance';
import AddressInput from '@ui/components/AddressInput';
import {Layout} from '@ui/components/Layout';

type Props = {
  address: string;
  onClose: () => void;
};

export function SendFund({address, onClose}: Props) {
  const {data: accountInfo} = useAccount(address);
  const [amount, setAmount] = React.useState('');
  const [toAddress, setToAddress] = React.useState<string>();
  const [isToAddressValid, setIsToAddressValid] = React.useState(false);
  const startTx = useApiTx();
  const {data: chainInfo} = useChainInfo();
  const [isKeepAliveActive, setIsKeepAliveActive] = React.useState(true);
  const snackbar = useSnackbar();
  const {stringToBn} = useFormatBalance();

  const isEnteredBalanceValid = useMemo(() => {
    const enteredBalance = stringToBn(amount) ?? BN_ZERO;
    if (isKeepAliveActive) {
      const keepAliveBalance = formattedStringToBn(accountInfo?.balance?.free).sub(
        formattedStringToBn(chainInfo?.existentialDeposit),
      );
      return enteredBalance.gt(BN_ZERO) && enteredBalance.lt(keepAliveBalance);
    }
    return enteredBalance.gt(BN_ZERO) && enteredBalance.lt(formattedStringToBn(accountInfo?.balance?.free));
  }, [amount, accountInfo, stringToBn, isKeepAliveActive, chainInfo]);

  const isSendDisabled = !isEnteredBalanceValid || !isToAddressValid;

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>Send funds</Subheading>
      <Padder scale={1} />
      <InputLabel label="Enter amount" helperText="Type the amount you want to transfer" />
      <BalanceInput account={accountInfo} onChangeBalance={setAmount} initialBalance={amount} />
      <Padder scale={0.5} />
      <InputLabel
        label="Send to address"
        helperText="Scan a contact address or paste the address you want to send funds to."
      />
      <AddressInput onValidateAddress={setIsToAddressValid} onAddressChanged={setToAddress} />
      <Padder scale={1} />
      <InputLabel
        label="Existential deposit"
        helperText="The minimum amount that an account should have to be deemed active"
      />
      <TextInput dense mode="outlined" disabled defaultValue={chainInfo?.formattedExistentialDeposit} />
      <Padder scale={1} />
      <View style={styles.keepAlive}>
        <View style={styles.keepAliveContainer}>
          <HelperText type="info">{`${
            isKeepAliveActive ? 'Transfer with account keep-alive checks' : 'Normal transfer without keep-alive checks'
          }`}</HelperText>
        </View>
        <Switch value={isKeepAliveActive} onValueChange={() => setIsKeepAliveActive(!isKeepAliveActive)} />
      </View>
      <Padder scale={1} />
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            if (chainInfo) {
              const _amountBN = stringToBnUtil(chainInfo.registry, amount);
              startTx({
                address,
                txMethod: `${isKeepAliveActive ? `balances.transferKeepAlive` : `balances.transfer`}`,
                params: [toAddress, _amountBN],
              })
                .then(() => {
                  snackbar('Funds transferred');
                  onClose();
                })
                .catch(() => {
                  snackbar('Error while transferring funds');
                });
            }
          }}
          mode="outlined"
          disabled={isSendDisabled}
          icon={'send-outline'}>
          Make Transfer
        </Button>
      </View>
      <Padder scale={2} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: standardPadding * 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  keepAlive: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: standardPadding * 2,
  },
  keepAliveContainer: {
    paddingVertical: 5,
    paddingHorizontal: standardPadding,
  },
});
