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
import {IdentityInfo} from '@polkadot/types/interfaces';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function TestScreen({navigation}: PropTypes) {
  return (
    <GenericNavigationLayout
      title="Identity Form"
      onBackPressed={() => navigation.goBack()}>
      <Layout level="1">
        <IdentityInfoForm />
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

function IdentityInfoForm() {
  const [display, setDisplay] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [legal, setLegal] = React.useState('');
  const [riot, setRiot] = React.useState('');
  const [twitter, setTwitter] = React.useState('');
  const [web, setWeb] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.formFieldContainer}>
        <Input
          label={() => <Label text="Display Name" />}
          placeholder="My On-Chain Name"
          value={display}
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
          onChangeText={setRiot}
          accessoryLeft={(props: IconProps) => (
            <Icon {...props} name="message-square-outline" />
          )}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <Button status="success">Submit</Button>
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
