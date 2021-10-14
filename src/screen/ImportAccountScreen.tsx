import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {keyring} from '@polkadot/ui-keyring';
import {mnemonicValidate} from '@polkadot/util-crypto';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, Input, ListItem, TopNavigationAction, useTheme} from '@ui-kitten/components';
import {useAccounts} from 'context/AccountsContext';
import {NetworkContext} from 'context/NetworkContext';
import FormLabel from 'presentational/FormLabel';
import Padder from 'presentational/Padder';
import {ProgressBar} from 'presentational/ProgressBar';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {accountsScreen, importAccountWithJsonFileScreen} from 'src/navigation/routeKeys';
import {monofontFamily, standardPadding} from 'src/styles';
import zxcvbn from 'zxcvbn';

export function ImportAccountScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const theme = useTheme();

  const {currentNetwork} = React.useContext(NetworkContext);
  const {addAccount} = useAccounts();

  const [account, setAccount] = React.useState({title: '', password: '', confirmPassword: ''});
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {seed, setSeed, address, isSeedValid} = useParseSeed();

  const passwordStrength = zxcvbn(account.password).score;

  const isDisabled = !(
    isSeedValid &&
    address &&
    account.password &&
    account.password === account.confirmPassword &&
    passwordStrength >= 3
  );

  const onSubmit = () => {
    const {json: key} = keyring.addUri(seed, account.password, {name: account.title});
    addAccount(currentNetwork.key, {
      address: key.address,
      name: key.meta.name as string,
      isFavorite: false,
      isInternal: true,
    });
    navigation.navigate(accountsScreen, {reload: true});
  };

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Input
          label={() => <FormLabel text="EXISTING 12 OR 24-WORD MNEMONIC SEED" />}
          numberOfLines={4}
          multiline
          value={seed}
          onChangeText={setSeed}
          editable
          style={styles.textInput}
          size="large"
          textStyle={styles.textInputText}
          status={seed.length ? (isSeedValid ? 'success' : 'danger') : 'basic'}
        />
        <Padder scale={1} />
        <Input
          label={() => <FormLabel text="Descriptive name for the account" />}
          style={styles.input}
          value={account.title}
          onChangeText={(text) => setAccount({...account, title: text})}
        />
        <Padder scale={1} />
        <Input
          secureTextEntry={!isPasswordVisible}
          label={() => <FormLabel text="New password for the account" />}
          style={styles.input}
          value={account.password}
          onChangeText={(text) => {
            setAccount({...account, password: text});
          }}
          accessoryRight={() => (
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Icon
                name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
                fill={theme['color-basic-600']}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          status={account.password ? (passwordStrength >= 3 ? 'success' : 'danger') : 'basic'}
        />
        <View style={styles.progressBar}>
          <ProgressBar percentage={passwordStrength * 25} requiredAmount={75} />
        </View>
        <Padder scale={1} />
        <Input
          secureTextEntry={!isPasswordVisible}
          label={() => <FormLabel text="Confirm password" />}
          style={styles.input}
          value={account.confirmPassword}
          onChangeText={(text) => setAccount({...account, confirmPassword: text})}
          status={
            account.confirmPassword ? (account.password === account.confirmPassword ? 'success' : 'danger') : 'basic'
          }
        />
        <Padder scale={2} />
        {address && (
          <>
            <ListItem
              title={account.title}
              accessoryLeft={() => <IdentityIcon value={address} size={40} />}
              description={address}
            />
            <Padder scale={1} />
          </>
        )}
        <Button
          disabled={isDisabled}
          status="basic"
          accessoryLeft={(p) => <Icon {...p} name="download-outline" />}
          onPress={onSubmit}>
          Import account
        </Button>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: standardPadding * 2,
  },
  textInput: {},
  textInputText: {
    minHeight: 70,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
  progressBar: {
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

function useParseSeed() {
  const [seed, setSeed] = React.useState('');

  let address: string | null = null;
  const isSeedValid = mnemonicValidate(seed);
  if (isSeedValid) {
    try {
      address = keyring.createFromUri(seed, {}, 'sr25519').address;
    } catch (error) {
      address = null;
      console.error(error);
    }
  }

  return {seed, setSeed, address, isSeedValid};
}

export function ImportScreenHeaderRight() {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      onPress={() => navigation.navigate(importAccountWithJsonFileScreen)}
      icon={(p) => <Icon {...p} name={'flip-2-outline'} />}
    />
  );
}
