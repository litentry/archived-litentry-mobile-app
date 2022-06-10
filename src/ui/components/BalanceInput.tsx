import React, {useMemo, useState} from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import {TextInput} from '@ui/library';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {decimalKeypad} from 'src/utils';
import MaxBalance from './MaxBalance';
import type {Account} from 'src/api/hooks/useAccount';
import {formattedStringToBn} from 'src/utils/balance';

type PropTypes = {
  account?: Account;
  onChangeBalance: (dispatch: string) => void;
  initialBalance?: string;
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
};

export function BalanceInput(props: PropTypes) {
  const {account, onBlur, onFocus} = props;
  const [amount, setAmount] = useState(props.initialBalance ?? '');
  const {formatBalance, stringToBn} = useFormatBalance();

  const hasEnoughBalance = useMemo(() => {
    const amountBN = stringToBn(amount);
    const freeBalance = formattedStringToBn(account?.balance?.free);
    if (amountBN) {
      return freeBalance.gt(amountBN);
    }

    return false;
  }, [amount, account, stringToBn]);

  return (
    <>
      <TextInput
        {...{onFocus, onBlur}}
        dense
        style={styles.textInput}
        error={Boolean(!hasEnoughBalance && amount)}
        mode="outlined"
        autoComplete="off"
        placeholder="Enter amount"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={(nextValue: string) => {
          setAmount(decimalKeypad(nextValue));
          props.onChangeBalance(decimalKeypad(nextValue));
        }}
        contextMenuHidden={true}
        right={<TextInput.Affix textStyle={styles.affix} text={formatBalance(stringToBn(amount)) ?? ''} />}
      />
      <MaxBalance address={account} />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {height: 45},
  affix: {paddingTop: 10},
});

export default BalanceInput;
