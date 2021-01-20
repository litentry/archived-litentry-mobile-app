import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/types';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {
  Layout,
  Input,
  Button,
  Icon,
  IconProps,
  Text,
} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {standardPadding, monofontFamily} from 'src/styles';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function TestScreen({navigation}: PropTypes) {
  return (
    <GenericNavigationLayout
      title="Identity Info Form"
      onBackPressed={() => navigation.goBack()}>
      <Layout level="1">
        <IdentityInfoForm
          onSubmit={(identityInfo) => console.log(identityInfo)}
        />
      </Layout>
    </GenericNavigationLayout>
  );
}

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
  label: {
    fontFamily: monofontFamily,
    paddingBottom: standardPadding,
  },
});

function Label({text}: {text: string}) {
  return (
    <Text category="label" appearance="hint" style={styles.label}>
      {text}
    </Text>
  );
}

type IdentityInfo = {
  display: string;
  legal: string;
  email: string;
  riot: string;
  twitter: string;
  web: string;
};

type IdentityInfoFormProps = {
  onSubmit: (identityInfo: IdentityInfo) => void;
};

type FormStatus = Record<
  | 'isDisplayValid'
  | 'isLegalValid'
  | 'isEmailValid'
  | 'isRiotValid'
  | 'isTwitterValid'
  | 'isWebValid'
  | 'isFormValid',
  boolean
>;

function IdentityInfoForm({onSubmit}: IdentityInfoFormProps) {
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
      const isDisplayValid = validate(!!display, display, 1, [], [], []);
      const isLegalValid = validate(!!legal, legal, 1, [], [], []);
      const isEmailValid = validate(!!email, email, 3, ['@'], WHITESPACE, []);
      const isRiotValid = validate(!!riot, riot, 6, [':'], WHITESPACE, [
        '@',
        '~',
      ]);
      const isTwitterValid = validate(!!twitter, twitter, 3, [], WHITESPACE, [
        '@',
      ]);
      const isWebValid = validate(!!web, web, 8, ['.'], WHITESPACE, [
        'https://',
        'http://',
      ]);
      const hasOneOrMoreValues =
        !!display || !!legal || !!email || !!riot || !!twitter || !!web;

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
      display,
      email,
      legal,
      riot,
      twitter,
      web,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Display Name" />}
          placeholder="My On-Chain Name"
          value={display}
          status={formStatus.isDisplayValid ? 'basic' : 'danger'}
          onChangeText={setDisplay}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="person-outline" />
          )}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Legal Name" />}
          placeholder="Full Legal Name"
          value={legal}
          status={formStatus.isLegalValid ? 'basic' : 'danger'}
          onChangeText={setLegal}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="credit-card-outline" />
          )}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Email" />}
          placeholder="somebody@example.com"
          value={email}
          status={formStatus.isEmailValid ? 'basic' : 'danger'}
          onChangeText={setEmail}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="email-outline" />
          )}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Web" />}
          placeholder="https://example.com"
          value={web}
          status={formStatus.isWebValid ? 'basic' : 'danger'}
          onChangeText={setWeb}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="browser-outline" />
          )}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Twitter" />}
          placeholder="@YourTwitterName"
          value={twitter}
          status={formStatus.isTwitterValid ? 'basic' : 'danger'}
          onChangeText={setTwitter}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="twitter-outline" />
          )}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Riot" />}
          placeholder="@yourname:matrix.org"
          value={riot}
          status={formStatus.isRiotValid ? 'basic' : 'danger'}
          onChangeText={setRiot}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="message-square-outline" />
          )}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <Button
          status="success"
          onPress={onSubmitPress}
          disabled={!formStatus.isFormValid}>
          Submit
        </Button>
      </View>
    </View>
  );
}

const WHITESPACE = [' ', '\t'];

function validate(
  hasValue: boolean,
  value: string | null | undefined,
  minLength: number,
  includes: string[],
  excludes: string[],
  starting: string[],
  notStarting: string[] = WHITESPACE,
  notEnding: string[] = WHITESPACE,
): boolean {
  return (
    !hasValue ||
    (!!value &&
      value.length >= minLength &&
      includes.reduce(
        (hasIncludes: boolean, check) => hasIncludes && value.includes(check),
        true,
      ) &&
      (!starting.length || starting.some((check) => value.startsWith(check))) &&
      !excludes.some((check) => value.includes(check)) &&
      !notStarting.some((check) => value.startsWith(check)) &&
      !notEnding.some((check) => value.endsWith(check)))
  );
}

export default TestScreen;
