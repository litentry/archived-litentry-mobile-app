import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from '@ui/library';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {decimalKeypad} from 'src/utils';
import MaxBalance from './MaxBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {ApiPromise} from '@polkadot/api';

type PropTypes = {
  api?: ApiPromise;
  account?: string;
  dispatchType?: string;
  onSelectDispatch: (dispatch: any) => any;
};

export function BalanceInput(props: PropTypes) {
  const {colors} = useTheme();
  const {api, account, dispatchType} = props;
  const [amount, setAmount] = useState<string>('');
  const [isMaximum, setIsMaximum] = useState<boolean>(true);
  const formatBalance = useFormatBalance();
  useEffect(() => {
    if (dispatchType) props.onSelectDispatch({type: dispatchType, payload: amount});
    else props.onSelectDispatch(amount);
  }, [amount, dispatchType, props]);
  return (
    <>
      <TextInput
        dense
        style={styles.textInput}
        theme={isMaximum ? {colors: {primary: colors.primary}} : {colors: {primary: colors.error}}}
        mode="outlined"
        autoComplete="off"
        placeholder="Enter amount"
        keyboardType="decimal-pad"
        value={amount}
        onFocus={() => setAmount('')}
        onChangeText={(nextValue: string) => setAmount(decimalKeypad(nextValue))}
        contextMenuHidden={true}
        right={
          <TextInput.Affix
            textStyle={{paddingTop: 10}}
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
  affix: {paddingTop: 9},
});

export default BalanceInput;
