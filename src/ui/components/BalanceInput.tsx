import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from '@ui/library';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {decimalKeypad} from 'src/utils';
import MaxBalance from './MaxBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {ApiPromise} from '@polkadot/api';
import type {Account} from 'src/api/hooks/useAccount';

type PropTypes = {
  api?: ApiPromise;
  account?: Account;
  onChangeBalance: (dispatch: string) => void;
};

export function BalanceInput(props: PropTypes) {
  const {colors} = useTheme();
  const {api, account} = props;
  const [amount, setAmount] = useState<string>('');
  const [isMaximum, setIsMaximum] = useState<boolean>(true);
  const formatBalance = useFormatBalance();
  useEffect(() => {
    amount !== '' && Number(amount) >= Number(account?.balance.total) ? setIsMaximum(false) : setIsMaximum(true);
  }, [amount, account]);
  return (
    <>
      <TextInput
        dense
        style={styles.textInput}
        theme={{colors: {primary: isMaximum ? colors.primary : colors.backdrop}}}
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
        right={
          <TextInput.Affix
            textStyle={styles.affix}
            text={(api && formatBalance(getBalanceFromString(api, amount))) ?? ''}
          />
        }
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
