import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input, Button, Icon, IconProps} from '@ui-kitten/components';
import {WHITESPACE, validateFormField} from 'src/utils';
import FormLabel from 'presentational/FormLabel';

export type IdentityPayload = {
  display: {raw: string} | {none: null};
  legal: {raw: string} | {none: null};
  email: {raw: string} | {none: null};
  riot: {raw: string} | {none: null};
  twitter: {raw: string} | {none: null};
  web: {raw: string} | {none: null};
};

type IdentityInfoFormProps = {
  onSubmit: (identityPayload: IdentityPayload) => void;
};

type FormStatus = Record<
  'isDisplayValid' | 'isLegalValid' | 'isEmailValid' | 'isRiotValid' | 'isTwitterValid' | 'isWebValid' | 'isFormValid',
  boolean
>;

function IdentityInfoForm({onSubmit}: IdentityInfoFormProps): React.ReactElement {
  const [display, setDisplay] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [legal, setLegal] = React.useState<string>('');
  const [riot, setRiot] = React.useState<string>('');
  const [twitter, setTwitter] = React.useState<string>('');
  const [web, setWeb] = React.useState<string>('');
  const [formStatus, setFormStatus] = React.useState<FormStatus>({
    isDisplayValid: false,
    isLegalValid: false,
    isEmailValid: false,
    isRiotValid: false,
    isTwitterValid: false,
    isWebValid: false,
    isFormValid: false,
  });

  React.useEffect(
    function validateForm() {
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
      setFormStatus(status);
    },
    [display, legal, email, riot, twitter, web],
  );

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
          onChangeText={setDisplay}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="person-outline" />}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <FormLabel text="Legal Name" />}
          placeholder="Full Legal Name"
          value={legal}
          status={formStatus.isLegalValid ? 'basic' : 'danger'}
          onChangeText={setLegal}
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
          onChangeText={setEmail}
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
          onChangeText={setWeb}
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
          onChangeText={setTwitter}
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
          onChangeText={setRiot}
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
