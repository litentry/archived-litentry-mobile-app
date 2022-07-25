import React, {useReducer, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TextInput, Button, HelperText} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {Account} from 'src/api/hooks/useAccount';
import {useRefetch} from 'src/api/hooks/useRefetch';
import {TIPS_QUERY} from 'src/api/hooks/useTips';
import {InputLabel} from '@ui/library/InputLabel';
import AddressInput from '@ui/components/AddressInput';
import {useStartTx} from 'context/TxContext';

export function ProposeTipScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {startTx} = useStartTx();
  const {refetch: refetchTips} = useRefetch([TIPS_QUERY]);
  const [isBeneficiaryAddressValid, setIsBeneficiaryAddressValid] = useState(false);

  const valid = state.account && isBeneficiaryAddressValid && state.reason.length > 4;

  const submit = () => {
    if (state.account) {
      startTx({
        address: state.account.address,
        txConfig: {
          method: 'tips.reportAwesome',
          params: [state.reason, state.beneficiary],
        },
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
              <AddressInput
                onValidateAddress={setIsBeneficiaryAddressValid}
                onAddressChanged={(address) => dispatch({type: 'SET_BENEFICIARY', payload: address.trim()})}
              />
              <Padder scale={1} />

              <InputLabel label="Tip reason" helperText="The reason why this tip should be paid." />
              <TextInput
                mode="outlined"
                multiline
                placeholder={'Tip reason'}
                value={state.reason}
                numberOfLines={5}
                maxLength={100}
                onChangeText={(payload) => dispatch({type: 'SET_REASON', payload: payload.replace(/\r?\n|\r/g, ' ')})}
              />
              {state.reason && state.reason.length < 5 ? (
                <HelperText type="error" style={styles.helper}>
                  Enter a minimum of five letters
                </HelperText>
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
  helper: {right: standardPadding},
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
