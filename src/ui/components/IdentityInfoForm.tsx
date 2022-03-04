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

function IdentityInfoForm({onSubmit, accountInfo}: IdentityInfoFormProps): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, {
    display: accountInfo?.registration?.display ?? '',
    legal: accountInfo?.registration?.legal ?? '',
    email: accountInfo?.registration?.email ?? '',
    riot: accountInfo?.registration?.riot ?? '',
    twitter: accountInfo?.registration?.twitter ?? '',
    web: accountInfo?.registration?.web ?? '',
  });
  const {display, legal, email, riot, twitter, web} = state;
  console.log(accountInfo?.display);
  const formStatus = validateForm(state);

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
        mode="outlined"
        label="Display Name"
        placeholder="My On-Chain Name"
        value={display}
        error={!formStatus.isDisplayValid}
        onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'display', value}})}
        left={<TextInput.Icon name="account-outline" />}
      />
      <Padder scale={1} />
      <TextInput
        mode="outlined"
        label="Legal Name"
        placeholder="Full Legal Name"
        value={legal}
        error={!formStatus.isLegalValid}
        onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'legal', value}})}
        left={<TextInput.Icon name="card-text-outline" />}
      />
      <Padder scale={1} />
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="somebody@example.com"
        autoCapitalize="none"
        value={email}
        error={!formStatus.isEmailValid}
        onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'email', value}})}
        left={<TextInput.Icon name="email-outline" />}
      />
      <Padder scale={1} />
      <TextInput
        mode="outlined"
        label="Web"
        placeholder="https://example.com"
        value={web}
        autoCapitalize="none"
        error={!formStatus.isWebValid}
        onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'web', value}})}
        left={<TextInput.Icon name="earth" />}
      />
      <Padder scale={1} />
      <TextInput
        mode="outlined"
        label="Twitter"
        placeholder="@YourTwitterName"
        value={twitter}
        autoCapitalize="none"
        error={!formStatus.isTwitterValid}
        onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'twitter', value}})}
        left={<TextInput.Icon name="twitter" />}
      />
      <Padder scale={1} />
      <TextInput
        mode="outlined"
        label="Riot"
        placeholder="@yourName:matrix.org"
        value={riot}
        autoCapitalize="none"
        error={!formStatus.isRiotValid}
        onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'riot', value}})}
        left={<TextInput.Icon name="message-outline" />}
      />
      <Padder scale={1} />
      <Button mode="contained" onPress={onSubmitPress} disabled={!formStatus.isFormValid}>
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
  display: string;
  legal: string;
  email: string;
  riot: string;
  twitter: string;
  web: string;
};

function reducer(state: State, action: {type: 'set_prop'; value: {key: keyof State; value: string}}) {
  switch (action.type) {
    case 'set_prop':
      return {
        ...state,
        [action.value.key]: action.value.value,
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
