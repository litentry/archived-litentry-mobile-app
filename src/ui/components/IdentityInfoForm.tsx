import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button} from '@ui/library';
import {WHITESPACE, validateFormField} from 'src/utils/form';
import {Account} from 'src/api/hooks/useAccount';
import {Padder} from './Padder';
import {standardPadding} from '@ui/styles';

export type IdentityPayload = {
  display: {raw: string} | {none: null};
  legal: {raw: string} | {none: null};
  email: {raw: string} | {none: null};
  riot: {raw: string} | {none: null};
  twitter: {raw: string} | {none: null};
  web: {raw: string} | {none: null};
};

type IdentityInfoFormProps = {
  accountInfo?: Account;
  onSubmit: (identityPayload: IdentityPayload) => void;
};

type FormStatus = Record<
  'isDisplayValid' | 'isLegalValid' | 'isEmailValid' | 'isRiotValid' | 'isTwitterValid' | 'isWebValid' | 'isFormValid',
  boolean
>;

function IdentityInfoForm({onSubmit, accountInfo}: IdentityInfoFormProps) {
  const [state, dispatch] = React.useReducer(reducer, {});
  const {display, legal, email, riot, twitter, web} = state;
  const formStatus = validateForm(state);

  React.useEffect(() => {
    dispatch({
      type: 'set_value',
      payload: {
        display: accountInfo?.registration?.display ?? '',
        legal: accountInfo?.registration?.legal ?? '',
        email: accountInfo?.registration?.email ?? '',
        riot: accountInfo?.registration?.riot ?? '',
        twitter: accountInfo?.registration?.twitter ?? '',
        web: accountInfo?.registration?.web ?? '',
      },
    });
  }, [accountInfo]);

  const onSubmitPress = () => {
    onSubmit({
      display: display ? {raw: display} : {none: null},
      email: email ? {raw: email} : {none: null},
      legal: legal ? {raw: legal} : {none: null},
      riot: riot ? {raw: riot} : {none: null},
      twitter: twitter ? {raw: twitter} : {none: null},
      web: web ? {raw: web} : {none: null},
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        dense
        mode="outlined"
        label="Display Name"
        placeholder="My On-Chain Name"
        testID="display-name"
        value={display}
        error={!formStatus.isDisplayValid}
        onChangeText={(value) => dispatch({type: 'set_value', payload: {display: value}})}
        left={<TextInput.Icon name="account-outline" />}
      />
      <Padder scale={1} />
      <TextInput
        dense
        mode="outlined"
        label="Legal Name"
        placeholder="Full Legal Name"
        value={legal}
        error={!formStatus.isLegalValid}
        onChangeText={(value) => dispatch({type: 'set_value', payload: {legal: value}})}
        left={<TextInput.Icon name="card-text-outline" />}
      />
      <Padder scale={1} />
      <TextInput
        dense
        mode="outlined"
        label="Email"
        placeholder="somebody@example.com"
        autoCapitalize="none"
        value={email}
        error={!formStatus.isEmailValid}
        onChangeText={(value) => dispatch({type: 'set_value', payload: {email: value}})}
        left={<TextInput.Icon name="email-outline" />}
      />
      <Padder scale={1} />
      <TextInput
        dense
        mode="outlined"
        label="Web"
        placeholder="https://example.com"
        value={web}
        autoCapitalize="none"
        error={!formStatus.isWebValid}
        onChangeText={(value) => dispatch({type: 'set_value', payload: {web: value}})}
        left={<TextInput.Icon name="earth" />}
      />
      <Padder scale={1} />
      <TextInput
        dense
        mode="outlined"
        label="Twitter"
        placeholder="@YourTwitterName"
        value={twitter}
        autoCapitalize="none"
        error={!formStatus.isTwitterValid}
        onChangeText={(value) => dispatch({type: 'set_value', payload: {twitter: value}})}
        left={<TextInput.Icon name="twitter" />}
      />
      <Padder scale={1} />
      <TextInput
        dense
        mode="outlined"
        label="Riot"
        placeholder="@yourName:matrix.org"
        value={riot}
        autoCapitalize="none"
        error={!formStatus.isRiotValid}
        onChangeText={(value) => dispatch({type: 'set_value', payload: {riot: value}})}
        left={<TextInput.Icon name="message-outline" />}
      />
      <Padder scale={1} />
      <Button
        mode="contained"
        onPress={onSubmitPress}
        disabled={!formStatus.isFormValid}
        testID="identity-submit-button">
        Submit
      </Button>
    </ScrollView>
  );
}

export default IdentityInfoForm;

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 2,
    marginBottom: standardPadding * 2,
  },
});

type State = {
  display?: string;
  legal?: string;
  email?: string;
  riot?: string;
  twitter?: string;
  web?: string;
};

type Action = {
  type: 'set_value';
  payload: State;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'set_value':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

function validateForm({display, legal, email, riot, twitter, web}: State) {
  const isDisplayValid = validateFormField(!!display, display, 1, [], [], []);
  const isLegalValid = validateFormField(!!legal, legal, 1, [], [], []);
  const isEmailValid = validateFormField(!!email, email, 3, ['@'], WHITESPACE, []);
  const isRiotValid = validateFormField(!!riot, riot, 6, [':'], WHITESPACE, ['@', '~']);
  const isTwitterValid = validateFormField(!!twitter, twitter, 3, [], WHITESPACE, ['@']);
  const isWebValid = validateFormField(!!web, web, 8, ['.'], WHITESPACE, ['https://', 'http://']);
  const hasOneOrMoreValues = !!display || !!legal || !!email || !!riot || !!twitter || !!web;

  const status: FormStatus = {
    isDisplayValid,
    isLegalValid,
    isEmailValid,
    isRiotValid,
    isTwitterValid,
    isWebValid,
    isFormValid:
      hasOneOrMoreValues &&
      isDisplayValid &&
      isLegalValid &&
      isEmailValid &&
      isRiotValid &&
      isTwitterValid &&
      isWebValid,
  };
  return status;
}
