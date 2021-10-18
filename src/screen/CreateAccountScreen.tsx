import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, ListItem, Icon, useTheme, Button} from '@ui-kitten/components';
import {mnemonicGenerate} from '@polkadot/util-crypto';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import FormLabel from 'presentational/FormLabel';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import Padder from 'presentational/Padder';
import Clipboard from '@react-native-community/clipboard';
import {ProgressBar} from 'presentational/ProgressBar';
import zxcvbn from 'zxcvbn';
import {ScrollView} from 'react-native-gesture-handler';
import {keyring} from '@polkadot/ui-keyring';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {accountsScreen} from 'src/navigation/routeKeys';
import {NetworkContext} from 'context/NetworkContext';

export function CreateAccountScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const theme = useTheme();
  const {currentNetwork} = React.useContext(NetworkContext);
  const [mnemonic] = React.useState(mnemonicGenerate());
  const [account, setAccount] = React.useState<{
    title: string;
    password: string;
    confirmPassword: string;
  }>({title: '', password: '', confirmPassword: ''});
  const [isMnemonicCopied, setIsMnemonicCopied] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {address} = keyring.createFromUri(mnemonic);

  const passwordStrength = zxcvbn(account.password).score;

  const isDisabled = !(
    isMnemonicCopied &&
    account.password &&
    account.password === account.confirmPassword &&
    account.title &&
    passwordStrength >= 3
  );

  const onSubmit = () => {
    keyring.addUri(mnemonic, account.password, {name: account.title, network: currentNetwork.key});
    navigation.navigate(accountsScreen, {reload: true});
  };

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={globalStyles.paddedContainer}>
        <ListItem
          title={() => (
            <View style={styles.accountName}>
              <Text>{account.title}</Text>
            </View>
          )}
          accessoryLeft={() => <IdentityIcon value={address} size={40} />}
          description={address}
        />
        <Padder scale={1} />
        <Input
          label={() => <FormLabel text="Generated mnemonic seed" />}
          style={styles.input}
          value={mnemonic}
          disabled
          multiline
          caption={() => (
            <View style={styles.caption}>
              <Text category="c1" appearance="hint">
                {`Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.`}
              </Text>
            </View>
          )}
          accessoryRight={() => (
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(mnemonic);
                setIsMnemonicCopied(true);
              }}>
              <Icon
                name={`${isMnemonicCopied ? 'checkmark' : 'copy'}-outline`}
                fill={theme['color-basic-600']}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        />
        <Padder scale={2} />
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
        <View style={styles.passwordMeter}>
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
        <Button disabled={isDisabled} status="basic" onPress={onSubmit}>
          Submit
        </Button>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginTop: standardPadding,
  },
  accountName: {
    height: 20,
    marginLeft: standardPadding,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
  passwordMeter: {
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
