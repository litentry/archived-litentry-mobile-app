import {Button, Icon, Input, ListItem, useTheme} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {monofontFamily, standardPadding} from 'src/styles';
import {mnemonicValidate} from '@polkadot/util-crypto';
import {createTestKeyring} from '@polkadot/keyring';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {ProgressBar} from 'presentational/ProgressBar';
import Padder from 'presentational/Padder';
import FormLabel from 'presentational/FormLabel';
import zxcvbn from 'zxcvbn';
import {NetworkContext} from 'context/NetworkContext';

export function ImportMnemonicSeedScreen() {
  const theme = useTheme();
  const [account, setAccount] = React.useState({title: '', password: '', confirmPassword: ''});
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {seed, setSeed, address, isSeedValid} = useImportAccount();

  const passwordStrength = zxcvbn(account.password).score;

  const isDisabled = !(
    isSeedValid &&
    address &&
    account.password &&
    account.password === account.confirmPassword &&
    passwordStrength >= 3
  );

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {address && (
          <ListItem
            title={account.title}
            accessoryLeft={() => <IdentityIcon value={address} size={40} />}
            description={address}
          />
        )}
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
        <Button disabled={isDisabled} status="basic" onPress={() => ({})}>
          Submit
        </Button>
      </View>
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

function useImportAccount() {
  const network = useContext(NetworkContext);
  const [seed, setSeed] = React.useState('');
  const ss58Format = network.currentNetwork.ss58Format;
  const keyring = createTestKeyring({type: 'sr25519', ss58Format}, true);

  let address: string | null = null;
  const isSeedValid = mnemonicValidate(seed);
  if (isSeedValid) {
    try {
      address = keyring.createFromUri(seed, {}, 'sr25519').address;
    } catch (error) {
      console.error(error);
    }
  }

  return {seed, setSeed, address, isSeedValid};
}
