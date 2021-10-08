import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, ListItem, Icon, useTheme, Button} from '@ui-kitten/components';
import {Keyring} from '@polkadot/keyring';
import {mnemonicGenerate} from '@polkadot/util-crypto';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import FormLabel from 'presentational/FormLabel';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import Padder from 'presentational/Padder';
import Clipboard from '@react-native-community/clipboard';
import {ProgressBar} from 'presentational/ProgressBar';
import zxcvbn from 'zxcvbn';
import {NetworkContext} from 'context/NetworkContext';

type Account = {
  title: string;
  password: string;
};

export function CreateAccountScreen() {
  const theme = useTheme();
  const {currentNetwork} = React.useContext(NetworkContext);
  const keyring = new Keyring({ss58Format: currentNetwork.ss58Format});
  const [mnemonic] = React.useState(mnemonicGenerate());
  const [account, setAccount] = React.useState<Account>({title: '', password: ''});
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isMnemonicCopied, setIsMnemonicCopied] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const pair = keyring.addFromUri(mnemonic, {name: account.title});

  const isDisabled = !(
    isMnemonicCopied &&
    account.password &&
    account.password === confirmPassword &&
    account.title &&
    passwordStrength >= 3
  );

  React.useEffect(() => {
    setPasswordStrength(zxcvbn(account.password).score);
  }, [account.password]);

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <ListItem
          title={() => (
            <View style={styles.accountName}>
              <Text>{account.title}</Text>
            </View>
          )}
          accessoryLeft={() => <IdentityIcon value={pair.address} size={40} />}
          description={pair.address}
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
        />
        <View style={styles.progressBar}>
          <ProgressBar percentage={passwordStrength * 25} noSpacing />
        </View>
        <Padder scale={1} />
        <Input
          secureTextEntry={!isPasswordVisible}
          label={() => <FormLabel text="Confirm password" />}
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
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
  caption: {
    marginTop: standardPadding,
  },
  accountName: {
    height: 20,
    marginLeft: standardPadding,
  },
  progressBar: {
    marginTop: 5,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
