import {Button, Card, Icon, Input, Modal, Text} from '@ui-kitten/components';
import {useApi} from 'context/ChainApiContext';
import {useTX} from 'context/TxContext';
import Padder from 'presentational/Padder';
import {SelectAccount} from 'presentational/SelectAccount';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import globalStyles, {standardPadding} from 'src/styles';

export function SubmitProposalButton() {
  const {api} = useApi();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const formatBalance = useFormatBalance();
  const {start} = useTX();

  return (
    <>
      <Button
        accessoryLeft={(p) => <Icon {...p} name="plus-circle-outline" />}
        status="basic"
        onPress={() => dispatch({type: 'SET_OPEN', payload: true})}>
        Submit a proposal
      </Button>
      <Modal
        visible={state.open}
        backdropStyle={globalStyles.backdrop}
        onBackdropPress={() => dispatch({type: 'SET_OPEN', payload: false})}>
        <Card disabled={true} style={styles.modalCard}>
          <Text>Send from account:</Text>
          <Padder scale={0.5} />
          <SelectAccount
            selected={state.account}
            onSelect={(account) => {
              dispatch({type: 'SELECT_ACCOUNT', payload: account});
            }}
          />
          <Padder scale={1.5} />

          <Text>Preimage hash:</Text>
          <Padder scale={0.5} />
          <Input
            placeholder="Place your Text"
            value={state.preimageHash}
            onFocus={() => dispatch({type: 'SET_HASH', payload: ''})}
            onChangeText={(payload) => dispatch({type: 'SET_HASH', payload})}
          />
          <Padder scale={0.5} />

          <Text>Locked balance:</Text>
          <Padder scale={0.5} />
          <Input
            placeholder="Place your Text"
            keyboardType="decimal-pad"
            value={state.balance}
            onFocus={() => dispatch({type: 'SET_BALANCE', payload: ''})}
            onChangeText={(nextValue) =>
              dispatch({type: 'SET_BALANCE', payload: nextValue.replace(/[^(\d+).(\d+)]/g, '')})
            }
          />
          <Text>{state.balance && api && formatBalance(getBalanceFromString(api, state.balance))}</Text>
          <Padder scale={0.5} />
          <Text category="c1">{`Minimum deposit: ${api && formatBalance(api.consts.democracy.minimumDeposit)}`}</Text>
          <Padder scale={1} />

          <View style={styles.row}>
            <Button
              onPress={() => {
                dispatch({type: 'RESET'});
              }}
              appearance="ghost"
              status="basic">
              CANCEL
            </Button>
            <Button
              disabled={!state.account || !state.preimageHash || !state.balance}
              onPress={() => {
                if (api && state.balance && state.account) {
                  const balance = getBalanceFromString(api, state.balance);

                  start({
                    api,
                    address: state.account,
                    txMethod: 'democracy.propose',
                    params: [state.preimageHash, balance],
                  });
                  dispatch({type: 'RESET'});
                }
              }}>{`SUBMIT`}</Button>
          </View>
        </Card>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: standardPadding * 2},
  modalCard: {width: 300},
});

type State = {
  open: boolean;
  account?: string;
  preimageHash?: string;
  balance?: string;
};

const initialState = {
  account: undefined,
  hash: undefined,
  balance: undefined,
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
