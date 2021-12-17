import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import SubstrateSign from 'react-native-substrate-sign';
import zxcvbn from 'zxcvbn';
import {useAccounts} from 'context/AccountsContext';
import {NetworkContext} from 'context/NetworkContext';
import {ProgressBar} from '@ui/components/ProgressBar';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {accountsScreen, createAccountScreen} from '@ui/navigation/routeKeys';
import {Button, Caption, List, Text, TextInput} from '@ui/library';
import {useTheme} from '@ui/library';
import {ErrorText} from '@ui/components/ErrorText';
import {Padder} from '@ui/components/Padder';
import globalStyles from '@ui/styles';
import {SecureKeychain} from 'src/service/SecureKeychain';

type Account = {
  title: string;
  password: string;
  confirmPassword: string;
};

export function CreateAccountScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof createAccountScreen>;
}) {
  const {mnemonic} = route.params;

  const theme = useTheme();
  const {currentNetwork} = React.useContext(NetworkContext);
  const {addAccount} = useAccounts();

  const [account, setAccountState] = React.useState<Account>({title: '', password: '', confirmPassword: ''});
  const setAccount = (acc: Account) => {
    setAccountState(acc);
    setError(null);
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [address, setAddress] = React.useState('');

  React.useEffect(() => {
    SubstrateSign.substrateAddress(mnemonic, currentNetwork.ss58Format).then(setAddress);
  }, [mnemonic, currentNetwork.ss58Format]);

  const passwordStrength = zxcvbn(account.password).score;

  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async () => {
    if (passwordStrength < 3) {
      setError('Password is too weak');
    } else if (account.password !== account.confirmPassword) {
      setError('Passwords do not match');
    } else if (!account.title) {
      setError('Account title is required');
    } else {
      const _address = await SubstrateSign.substrateAddress(mnemonic, currentNetwork.ss58Format);
      const encoded = await SubstrateSign.encryptData(mnemonic, account.password);
      const newAcc = {
        address: _address,
        encoded,
        meta: {
          name: account.title,
          network: currentNetwork.key,
          isFavorite: false,
        },
        isExternal: false,
      };

      addAccount(newAcc);
      SecureKeychain.setGenericPassword(account.password, 'BIOMETRICS', _address);

      navigation.navigate(accountsScreen, {reload: true});
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      <KeyboardAvoidingView behavior={'position'} style={styles.keyboardAvoidingViewContainer}>
        <ScrollView style={globalStyles.paddedContainer}>
          <List.Item
            title={() => <Text>{account.title}</Text>}
            left={() => <IdentityIcon value={address} size={40} />}
            description={address}
          />
          <Padder scale={1} />
          <TextInput autoComplete="off" label={'Mnemonic seed'} value={mnemonic} disabled multiline />
          <Caption>
            {`Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.`}
          </Caption>
          <Padder scale={2} />
          <TextInput
            mode="outlined"
            autoComplete
            label={'Descriptive name for the account'}
            value={account.title}
            onChangeText={(text) => setAccount({...account, title: text})}
          />
          <Padder scale={1} />
          <TextInput
            secureTextEntry={!isPasswordVisible}
            label={'New password for the account'}
            value={account.password}
            onChangeText={(text) => {
              setAccount({...account, password: text});
            }}
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
                color={theme.colors.disabled}
              />
            }
            mode="outlined"
            autoComplete={false}
            error={Boolean(account.password) && passwordStrength < 3}
          />
          <View style={styles.passwordMeter}>
            <ProgressBar percentage={passwordStrength * 25} requiredAmount={75} />
          </View>
          <Padder scale={1} />
          <TextInput
            mode="outlined"
            secureTextEntry={!isPasswordVisible}
            label={'Confirm password'}
            value={account.confirmPassword}
            onChangeText={(text) => setAccount({...account, confirmPassword: text})}
            error={Boolean(account.confirmPassword) && account.password !== account.confirmPassword}
            autoComplete={false}
          />
          <Padder scale={2} />
          {error ? (
            <>
              <ErrorText>{error}</ErrorText>
              <Padder scale={2} />
            </>
          ) : null}
          <Button mode="outlined" onPress={onSubmit}>
            Submit
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  passwordMeter: {
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
});
