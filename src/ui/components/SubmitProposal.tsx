import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Subheading, TextInput, Paragraph, Caption} from '@ui/library';
import {useApi} from 'context/ChainApiContext';
import {Padder} from '@ui/components/Padder';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import globalStyles, {standardPadding} from '@ui/styles';

export function SubmitProposal() {
  const {api} = useApi();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const formatBalance = useFormatBalance();
  const startTx = useApiTx();

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
    if (api && state.balance && state.account) {
      const balance = getBalanceFromString(api, state.balance);
      startTx({
        address: state.account,
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

      <Modal visible={state.open} onDismiss={closeModal}>
        <View style={globalStyles.alignCenter}>
          <Subheading>{`Submit proposal`}</Subheading>
        </View>
        <Padder scale={1} />

        <SelectAccount
          onSelect={(account) => {
            dispatch({type: 'SELECT_ACCOUNT', payload: account.address});
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
        <TextInput
          dense
          autoComplete="off"
          mode="outlined"
          placeholder="Place your Text"
          keyboardType="decimal-pad"
          value={state.balance}
          onChangeText={(nextValue) =>
            dispatch({type: 'SET_BALANCE', payload: nextValue.replace(/[^(\d+).(\d+)]/g, '')})
          }
        />

        <Subheading style={styles.lockedBalance}>
          {api && formatBalance(getBalanceFromString(api, state.balance))}
        </Subheading>
        <Padder scale={1} />

        <Caption>{`Minimum deposit: ${api && formatBalance(api.consts.democracy.minimumDeposit)}`}</Caption>
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
  account: string;
  preimageHash: string;
  balance: string;
};

const initialState = {
  account: '',
  preimageHash: '',
  balance: '',
  open: false,
};

type Action =
  | {type: 'SELECT_ACCOUNT'; payload: string}
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
