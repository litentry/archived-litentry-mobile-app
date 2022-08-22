import React from 'react';
import {Keyboard, StyleSheet, View, ScrollView} from 'react-native';
import {Button, Subheading, TextInput, Switch, HelperText, useBottomSheetInternal} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import BalanceInput from '@ui/components/BalanceInput';
import {useAccount} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';
import {InputLabel} from '@ui/library/InputLabel';
import {useSnackbar} from 'context/SnackbarContext';
import {bnToHex, BN_ZERO} from '@polkadot/util';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {formattedStringToBn} from 'src/utils/balance';
import AddressInput from '@ui/components/AddressInput';
import {Layout} from '@ui/components/Layout';
import {useStartTx} from 'context/TxContext';

type Props = {
  address: string;
  onClose: () => void;
};

export function SendFund({address, onClose}: Props) {
  const {data: accountInfo} = useAccount(address);
  const [amount, setAmount] = React.useState('');
  const [toAddress, setToAddress] = React.useState<string>();
  const [isToAddressValid, setIsToAddressValid] = React.useState(false);
  const {startTx} = useStartTx();
  const {data: chainInfo} = useChainInfo();
  const [isKeepAliveActive, setIsKeepAliveActive] = React.useState(true);
  const snackbar = useSnackbar();
  const {stringToBn} = useFormatBalance();
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();

  const handleOnFocus = React.useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);

  const handleOnBlur = React.useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  const isEnteredBalanceValid = React.useMemo(() => {
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

  const sendFund = React.useCallback(() => {
    const _amountBN = stringToBn(amount);
    if (toAddress) {
      startTx({
        address,
        txConfig: {
          method: `${isKeepAliveActive ? `balances.transferKeepAlive` : `balances.transfer`}`,
          params: [toAddress, bnToHex(_amountBN)],
        },
      })
        .then(() => {
          snackbar('Funds transferred');
          onClose();
        })
        .catch(() => {
          snackbar('Error while transferring funds');
        });
    }
  }, [address, isKeepAliveActive, toAddress, snackbar, onClose, amount, startTx, stringToBn]);

  const onCancel = React.useCallback(() => {
    Keyboard.dismiss();
    onClose();
  }, [onClose]);

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Subheading style={globalStyles.textCenter}>Send funds</Subheading>
        <Padder scale={1} />
        <InputLabel label="Enter amount" helperText="Type the amount you want to transfer" />
        <BalanceInput
          account={accountInfo}
          onChangeBalance={setAmount}
          initialBalance={amount}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <Padder scale={0.5} />
        <InputLabel
          label="Send to address"
          helperText="Scan a contact address or paste the address you want to send funds to."
        />
        <AddressInput
          onValidateAddress={setIsToAddressValid}
          onAddressChanged={setToAddress}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
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
              isKeepAliveActive
                ? 'Transfer with account keep-alive checks'
                : 'Normal transfer without keep-alive checks'
            }`}</HelperText>
          </View>
          <Switch
            value={isKeepAliveActive}
            onValueChange={() => setIsKeepAliveActive(!isKeepAliveActive)}
            testID={'keep_alive_switch'}
          />
        </View>
        <Padder scale={1} />

        <View style={globalStyles.spaceAroundRowContainer}>
          <Button mode="outlined" onPress={onCancel}>
            {`Cancel`}
          </Button>
          <Button
            testID="send-fund-button"
            disabled={isSendDisabled}
            mode="outlined"
            onPress={sendFund}>{`Send`}</Button>
        </View>
        <Padder scale={3} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: standardPadding * 2,
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
