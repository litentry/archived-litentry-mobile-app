import React, {useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {NavigationProp} from '@react-navigation/native';
import {Subheading, TextInput, Caption, useTheme, Button} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {Padder} from '@ui/components/Padder';
import {Account} from 'src/api/hooks/useAccount';

export function ProposeTipScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {colors} = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const startTx = useApiTx();
  const queryClient = useQueryClient();

  const valid = state.account && state.beneficiary && state.reason && state.reason.length > 4;

  const submit = () => {
    if (state.account) {
      startTx({
        address: state.account.address,
        txMethod: 'tips.reportAwesome',
        params: [state.reason, state.beneficiary],
      })
        .then(() => {
          queryClient.invalidateQueries('tips');
          navigation.goBack();
        })
        .catch((e: Error) => {
          if (e.message.includes('failed on who')) {
            dispatch({type: 'SET_ERROR', payload: 'beneficiary_error'});
          }
          console.warn(e);
        });
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <View style={globalStyles.flex}>
          <Subheading>{`Sending from`}</Subheading>
          <Padder scale={0.5} />
          <SelectAccount onSelect={(account) => dispatch({type: 'SET_ACCOUNT', payload: account.accountInfo})} />
          <Padder scale={1.5} />

          <Subheading>{`Beneficiary`}</Subheading>
          <TextInput
            mode="outlined"
            placeholder={'Beneficiary'}
            multiline
            numberOfLines={2}
            value={state.beneficiary}
            onChangeText={(payload) => dispatch({type: 'SET_BENEFICIARY', payload})}
          />
          {state.error === 'beneficiary_error' && (
            <Caption style={{color: colors.error}}>{'Please enter a valid beneficiary!'}</Caption>
          )}
          <Padder scale={1.5} />

          <Subheading>{`Tip reason`}</Subheading>
          <TextInput
            mode="outlined"
            placeholder={'Tip reason'}
            value={state.reason}
            onChangeText={(payload) => dispatch({type: 'SET_REASON', payload})}
          />
        </View>

        <Button mode="contained" disabled={!valid} onPress={submit}>
          {`Sign and Submit`}
        </Button>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: standardPadding * 2, paddingBottom: standardPadding * 4},
  rowContainer: {flexDirection: 'row', alignItems: 'center'},
});

type Action =
  | {type: 'SET_BENEFICIARY'; payload: string}
  | {type: 'SET_ACCOUNT'; payload: Account | undefined}
  | {
      type: 'SET_REASON';
      payload: string;
    }
  | {type: 'SET_ERROR'; payload: State['error']};

type State = {
  account?: Account | undefined;
  beneficiary: string;
  reason: string;
  error?: 'beneficiary_error';
};

const initialState: State = {reason: '', beneficiary: ''};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return {...state, account: action.payload};
    case 'SET_BENEFICIARY':
      return {...state, beneficiary: action.payload, error: undefined};
    case 'SET_REASON':
      return {...state, reason: action.payload};
    case 'SET_ERROR':
      return {...state, error: action.payload};
    default:
      return state;
  }
}
