import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from '@ui/library';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {decimalKeypad} from 'src/utils';
import MaxBalance from './MaxBalance';
import type {Account} from 'src/api/hooks/useAccount';
import {formattedStringToBn} from 'src/api/utils/balance';

type PropTypes = {
  account?: Account;
  onChangeBalance: (dispatch: string) => void;
};

export function BalanceInput(props: PropTypes) {
  const {account} = props;
  const [amount, setAmount] = useState('');
  const {formatBalance, stringToBn} = useFormatBalance();

  const hasEnoughBalance = useMemo(() => {
    const amountBN = stringToBn(amount);
    const freeBalance = formattedStringToBn(account?.balance.free);
    if (amountBN) {
      return freeBalance.gt(amountBN);
    }

    return false;
  }, [amount, account, stringToBn]);

  return (
    <>
      <TextInput
        dense
        style={styles.textInput}
        error={!hasEnoughBalance}
        mode="outlined"
        autoComplete="off"
        placeholder="Enter amount"
        keyboardType="decimal-pad"
        value={amount}
        onFocus={() => setAmount('')}
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
