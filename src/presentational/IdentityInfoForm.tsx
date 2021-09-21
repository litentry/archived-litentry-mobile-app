import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input, Button, Icon, IconProps} from '@ui-kitten/components';
import {WHITESPACE, validateFormField} from 'src/utils';
import FormLabel from 'presentational/FormLabel';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

export type IdentityPayload = {
  display: {raw: string} | {none: null};
  legal: {raw: string} | {none: null};
  email: {raw: string} | {none: null};
  riot: {raw: string} | {none: null};
  twitter: {raw: string} | {none: null};
  web: {raw: string} | {none: null};
};

type IdentityInfoFormProps = {
  identity?: IdentityInfo;
  onSubmit: (identityPayload: IdentityPayload) => void;
};

type FormStatus = Record<
  'isDisplayValid' | 'isLegalValid' | 'isEmailValid' | 'isRiotValid' | 'isTwitterValid' | 'isWebValid' | 'isFormValid',
  boolean
>;

function IdentityInfoForm({onSubmit, identity}: IdentityInfoFormProps): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, {
    display: identity?.registration?.display ?? '',
    legal: identity?.registration?.legal ?? '',
    email: identity?.registration?.email ?? '',
    riot: identity?.registration?.riot ?? '',
    twitter: identity?.registration?.twitter ?? '',
    web: identity?.registration?.web ?? '',
  });
  const {display, legal, email, riot, twitter, web} = state;
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
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Display Name" />}
          placeholder="My On-Chain Name"
          value={display}
          status={formStatus.isDisplayValid ? 'basic' : 'danger'}
          onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'display', value}})}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="person-outline" />}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Legal Name" />}
          placeholder="Full Legal Name"
          value={legal}
          status={formStatus.isLegalValid ? 'basic' : 'danger'}
          onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'legal', value}})}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="credit-card-outline" />}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Email" />}
          placeholder="somebody@example.com"
          autoCapitalize="none"
          value={email}
          status={formStatus.isEmailValid ? 'basic' : 'danger'}
          onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'email', value}})}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="email-outline" />}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Web" />}
          placeholder="https://example.com"
          value={web}
          autoCapitalize="none"
          status={formStatus.isWebValid ? 'basic' : 'danger'}
          onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'web', value}})}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="browser-outline" />}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Twitter" />}
          placeholder="@YourTwitterName"
          value={twitter}
          autoCapitalize="none"
          status={formStatus.isTwitterValid ? 'basic' : 'danger'}
          onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'twitter', value}})}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="twitter-outline" />}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Riot" />}
          placeholder="@yourname:matrix.org"
          value={riot}
          autoCapitalize="none"
          status={formStatus.isRiotValid ? 'basic' : 'danger'}
          onChangeText={(value) => dispatch({type: 'set_prop', value: {key: 'riot', value}})}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="message-square-outline" />}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <Button status="success" onPress={onSubmitPress} disabled={!formStatus.isFormValid}>
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}

export default IdentityInfoForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formFieldContainer: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  submitButtonContainer: {
    paddingHorizontal: 10,
    marginVertical: 25,
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
