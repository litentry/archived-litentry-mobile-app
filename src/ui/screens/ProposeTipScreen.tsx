import React, {useContext, useMemo, useReducer} from 'react';
import {Platform, ScrollView, StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TextInput, Button, HelperText} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {Padder} from '@ui/components/Padder';
import {Account} from 'src/api/hooks/useAccount';
import {useRefetch} from 'src/api/hooks/useRefetch';
import {TIPS_QUERY} from 'src/api/hooks/useTips';
import {InputLabel} from '@ui/library/InputLabel';
import {isAddressValid} from 'src/utils/address';
import {NetworkContext} from 'context/NetworkContext';

export function ProposeTipScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const startTx = useApiTx();
  const {refetch: refetchTips} = useRefetch([TIPS_QUERY]);
  const {currentNetwork} = useContext(NetworkContext);

  const isBeneficiaryAddressValid = useMemo(() => {
    state.beneficiary = state.beneficiary
      .replace(/\r?\n|\r/g, ' ')
      .split(' ')
      .join('');
    return state.beneficiary ? isAddressValid(currentNetwork, state.beneficiary) : false;
  }, [state, currentNetwork]);

  const isTipReasonValid = useMemo(() => {
    return state.reason ? state.reason.length > 4 : false;
  }, [state]);

  const valid = state.account && isBeneficiaryAddressValid && isTipReasonValid;

  const submit = () => {
    if (state.account) {
      startTx({
        address: state.account.address,
        txMethod: 'tips.reportAwesome',
        params: [state.reason, state.beneficiary],
      })
        .then(() => {
          refetchTips();
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.flex}>
          <ScrollView>
            <View style={globalStyles.flex}>
              <InputLabel label="Sending from" helperText="Select the account you wish to submit the tip from" />
              <Padder scale={0.5} />
              <SelectAccount onSelect={(account) => dispatch({type: 'SET_ACCOUNT', payload: account.accountInfo})} />
              <Padder scale={1} />

              <InputLabel
                label="Beneficiary address"
                helperText="The account to which the tip will be transferred if approved"
              />
              <TextInput
                mode="outlined"
                placeholder={'Beneficiary address'}
                multiline
                numberOfLines={2}
                value={state.beneficiary}
                onChangeText={(payload) => dispatch({type: 'SET_BENEFICIARY', payload})}
              />
              {!isBeneficiaryAddressValid && state.beneficiary ? (
                <HelperText type="error">Please enter a valid beneficiary address</HelperText>
              ) : null}
              <Padder scale={1} />

              <InputLabel label="Tip reason" helperText="The reason why this tip should be paid." />
              <TextInput
                mode="outlined"
                multiline
                placeholder={'Tip reason'}
                value={state.reason}
                numberOfLines={10}
                maxLength={100}
                onChangeText={(payload) => dispatch({type: 'SET_REASON', payload})}
              />
              {!isTipReasonValid && state.reason ? (
                <HelperText type="error">Enter a minimum of five letters</HelperText>
              ) : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Button mode="contained" disabled={!valid} onPress={submit}>
          {`Propose Tip`}
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
