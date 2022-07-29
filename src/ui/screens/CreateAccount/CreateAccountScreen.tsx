import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import zxcvbn from 'zxcvbn';
import {useNetwork} from '@atoms/network';
import {ProgressBar} from '@ui/components/ProgressBar';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {accountsScreen, createAccountScreen} from '@ui/navigation/routeKeys';
import {Button, Text, List, TextInput, HelperText} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {SecureKeychain} from 'src/service/SecureKeychain';
import {useKeyboardStatus} from 'src/hooks/useKeyboardStatus';
import {useKeyring} from '@polkadotApi/useKeyring';
import {Identicon} from '@ui/components/Identicon';

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

  const {status: keyboardStatus} = useKeyboardStatus();
  const {currentNetwork} = useNetwork();

  const [account, setAccountState] = React.useState<Account>({title: '', password: '', confirmPassword: ''});
  const setAccount = (acc: Account) => {
    setAccountState(acc);
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [address, setAddress] = React.useState('');

  const {createAddressFromMnemonic, addAccount} = useKeyring();
  React.useEffect(() => {
    createAddressFromMnemonic({mnemonic}).then((_address) => setAddress(_address));
  }, [createAddressFromMnemonic, mnemonic]);

  const passwordStrength = zxcvbn(account.password).score;
  const isDisabled = !account.password || !(account.password === account.confirmPassword);

  const passwordError = Boolean(account.password) && passwordStrength < 3;
  const confirmPasswordError = Boolean(account.confirmPassword) && !(account.password === account.confirmPassword);

  const onSubmit = async () => {
    await addAccount({
      mnemonic,
      password: account.password,
      name: account.title,
      network: currentNetwork.key,
      isFavorite: false,
      isExternal: false,
    });
    SecureKeychain.setPasswordByServiceId(account.password, 'BIOMETRICS', address);
    navigation.navigate(accountsScreen, {reload: true});
  };

  const AccountIdentityIcon = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Identicon value={address} size={40} />
      </View>
    ),
    [address],
  );

  return (
    <SafeView edges={noTopEdges}>
      <KeyboardAvoidingView style={globalStyles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.container}>
          <List.Item title={account.title} left={AccountIdentityIcon} description={address} />
          <Padder scale={1} />
          <TextInput autoComplete="off" label={'Mnemonic seed'} value={mnemonic} disabled multiline />
          <Text variant="bodySmall">
            {`Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.`}
          </Text>
          <Padder scale={2} />
          <TextInput
            mode="outlined"
            autoComplete="off"
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
              />
            }
            mode="outlined"
            autoComplete="off"
            error={Boolean(account.password) && passwordStrength < 3}
          />
          <HelperText type="error" visible={passwordError}>
            {`Password is too weak`}
          </HelperText>
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
            autoComplete="off"
          />
          <HelperText type="error" visible={confirmPasswordError}>
            {`Confirm password doesn't match`}
          </HelperText>
          <Padder scale={2} />
          <Button mode="outlined" onPress={onSubmit} disabled={isDisabled}>
            Submit
          </Button>
          <Padder scale={keyboardStatus === 'visible' ? 9 : 2} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
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
