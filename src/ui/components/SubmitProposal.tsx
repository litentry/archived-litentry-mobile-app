import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Subheading, TextInput, Paragraph, Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import globalStyles, {standardPadding} from '@ui/styles';
import BalanceInput from './BalanceInput';
import type {Account} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';

export function SubmitProposal() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {formatBalance, getBNFromLocalInputString} = useFormatBalance();
  const startTx = useApiTx();
  const {data: chainInfo} = useChainInfo();

  const openModal = () => {
    dispatch({type: 'SET_OPEN', payload: true});
  };

  const closeModal = () => {
    dispatch({type: 'SET_OPEN', payload: false});
    reset();
  };

  const reset = () => {
    dispatch({type: 'RESET'});
  };

  const isDisabled = !state.account || !state.preimageHash || !state.balance;

  const submit = () => {
    if (state.balance && state.account) {
      const balance = getBNFromLocalInputString(state.balance);
      startTx({
        address: state.account.address,
        txMethod: 'democracy.propose',
        params: [state.preimageHash, balance],
      });
      reset();
    }
  };

  return (
    <>
      <Button icon="message-plus-outline" mode="outlined" onPress={openModal}>
        {`Submit proposal`}
      </Button>

      <Modal visible={state?.open} onDismiss={closeModal}>
        <View style={globalStyles.alignCenter}>
          <Subheading>{`Submit proposal`}</Subheading>
        </View>
        <Padder scale={1} />

        <SelectAccount
          onSelect={(account) => {
            dispatch({type: 'SELECT_ACCOUNT', payload: account.accountInfo});
          }}
        />
        <Padder scale={1} />

        <Paragraph>{`Preimage hash:`}</Paragraph>
        <TextInput
          dense
          multiline
          numberOfLines={4}
          autoComplete="off"
          mode="outlined"
          placeholder="Place your Text"
          value={state.preimageHash}
          onChangeText={(payload) => dispatch({type: 'SET_HASH', payload})}
        />
        <Padder scale={1} />

        <Paragraph>{`Locked balance:`}</Paragraph>
        <BalanceInput
          account={state.account}
          onChangeBalance={(amount) => {
            dispatch({type: 'SET_BALANCE', payload: amount});
          }}
        />

        <Padder scale={1} />

        <Caption>{`Minimum deposit: ${
          chainInfo?.democracyMinimumDeposit && formatBalance(chainInfo.democracyMinimumDeposit)
        }`}</Caption>
        <Padder scale={1} />

        <View style={styles.row}>
          <Button mode="outlined" onPress={reset}>{`Cancel`}</Button>
          <Button mode="outlined" disabled={isDisabled} onPress={submit}>{`Submit`}</Button>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: standardPadding * 2,
  },
  lockedBalance: {
    marginLeft: standardPadding,
  },
});

type State = {
  open: boolean;
  account?: Account | undefined;
  preimageHash?: string;
  balance?: string;
};

const initialState = {
  account: undefined,
  preimageHash: '',
  balance: '',
  open: false,
};

type Action =
  | {type: 'SELECT_ACCOUNT'; payload: Account | undefined}
  | {type: 'SET_BALANCE'; payload: string}
  | {type: 'SET_HASH'; payload: string}
  | {type: 'SET_OPEN'; payload: boolean}
  | {type: 'RESET'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT_ACCOUNT':
      return {...state, account: action.payload};
    case 'SET_BALANCE':
      return {...state, balance: action.payload};
    case 'SET_HASH':
      return {...state, preimageHash: action.payload};
    case 'SET_OPEN':
      return {...state, open: action.payload};
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
