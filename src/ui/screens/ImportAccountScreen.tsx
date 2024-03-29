import React from 'react';
import {StyleSheet, useWindowDimensions, View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNetwork} from '@atoms/network';
import {ProgressBar} from '@ui/components/ProgressBar';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {accountsScreen} from '@ui/navigation/routeKeys';
import {Button, List, TextInput, useTheme, HelperText} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
import {Padder} from '@ui/components/Padder';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import zxcvbn from 'zxcvbn';
import {SecureKeychain} from 'src/service/SecureKeychain';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ImportAccountWithJsonFileScreen} from './ImportAccountWithJsonFileScreen';
import {useKeyboardStatus} from 'src/hooks/useKeyboardStatus';
import {useCryptoUtil} from '@polkadotApi/useCryptoUtil';
import {useKeyring} from '@polkadotApi/useKeyring';

type Account = {
  title: string;
  password: string;
  confirmPassword: string;
};

const Tab = createMaterialTopTabNavigator();

export function ImportAccountScreen() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialLayout={{width: layout.width}}
      screenOptions={{
        tabBarLabelStyle: {color: colors.text},
        tabBarItemStyle: {width: 200},
        tabBarStyle: {backgroundColor: colors.background},
      }}>
      <Tab.Screen name="Import seed" component={ImportAccount} />
      <Tab.Screen name="Import json" component={ImportAccountWithJsonFileScreen} />
    </Tab.Navigator>
  );
}

function ImportAccount({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const theme = useTheme();
  const {status: keyboardStatus} = useKeyboardStatus();
  const {currentNetwork} = useNetwork();
  const [account, setAccountState] = React.useState<Account>({title: '', password: '', confirmPassword: ''});
  const setAccount = (_account: Account) => {
    setAccountState(_account);
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {mnemonic, setMnemonic, address, isMnemonicValid} = useVerifyMnemonic();

  const {addAccount} = useKeyring();

  const passwordStrength = zxcvbn(account.password).score;

  const mnemonicError = Boolean(mnemonic) && !isMnemonicValid;
  const passwordError = Boolean(account.password) && passwordStrength < 3;
  const confirmPasswordError = Boolean(account.confirmPassword) && !(account.password === account.confirmPassword);

  const isDisabled = !isMnemonicValid || !account.password || !(account.password === account.confirmPassword);

  const onSubmit = async () => {
    const addedAccount = await addAccount({
      mnemonic: mnemonic,
      password: account.password,
      name: account.title,
      network: currentNetwork.key,
      isFavorite: false,
      isExternal: false,
    });
    SecureKeychain.setPasswordByServiceId(account.password, 'BIOMETRICS', addedAccount.address as string);
    navigation.navigate(accountsScreen, {reload: true});
  };

  const AccountIdentityIcon = React.useCallback(
    () => <View style={globalStyles.justifyCenter}>{address ? <Identicon value={address} size={40} /> : null}</View>,
    [address],
  );

  return (
    <SafeView edges={noTopEdges}>
      <KeyboardAvoidingView style={globalStyles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.container}>
          <TextInput
            autoComplete="off"
            autoCapitalize={'none'}
            label={'Existing mnemonic seed'}
            numberOfLines={4}
            multiline={true}
            value={mnemonic}
            onChangeText={(_mnemonic) => setMnemonic(_mnemonic.trim())}
            mode="outlined"
            error={mnemonicError}
            style={styles.seedInput}
          />
          <HelperText type="error" visible={mnemonicError}>
            {`The seed appears to be invalid`}
          </HelperText>
          <Padder scale={1} />
          <TextInput
            mode="outlined"
            autoComplete="off"
            label={'Descriptive name for the account'}
            value={account.title}
            onChangeText={(text) => setAccount({...account, title: text})}
          />
          <Padder scale={1} />
          <TextInput
            mode="outlined"
            autoComplete="off"
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
            error={passwordError}
          />
          <HelperText type="error" visible={passwordError}>
            {`Password is too weak`}
          </HelperText>
          <View style={styles.progressBar}>
            <ProgressBar percentage={passwordStrength * 25} requiredAmount={75} />
          </View>
          <Padder scale={1} />
          <TextInput
            autoComplete="off"
            mode="outlined"
            secureTextEntry={!isPasswordVisible}
            label={'Confirm password'}
            style={styles.input}
            value={account.confirmPassword}
            onChangeText={(text) => setAccount({...account, confirmPassword: text})}
            error={confirmPasswordError}
          />
          <HelperText type="error" visible={confirmPasswordError}>
            {`Confirm password doesn't match`}
          </HelperText>
          <Padder scale={2} />
          {address ? (
            <>
              <List.Item title={account.title} left={AccountIdentityIcon} description={address} />
              <Padder scale={1} />
            </>
          ) : null}
          <View style={globalStyles.flex} />
          <Button mode="outlined" icon={'download'} onPress={onSubmit} disabled={isDisabled}>
            Import Seed
          </Button>
          <Padder scale={keyboardStatus === 'visible' ? 12 : 2} />
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
  seedInput: {
    height: 100,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
  progressBar: {
    marginTop: standardPadding * 2,
    marginHorizontal: standardPadding,
  },
});

function useVerifyMnemonic() {
  const {validateMnemonic} = useCryptoUtil();
  const [mnemonic, setMnemonic] = React.useState('');
  const [address, setAddress] = React.useState<string>();
  const [isMnemonicValid, setIsMnemonicValid] = React.useState(false);

  React.useEffect(() => {
    if (mnemonic) {
      validateMnemonic({mnemonic}).then(({isValid, address: _address}) => {
        setIsMnemonicValid(isValid);
        setAddress(_address);
      });
    }
  }, [mnemonic, validateMnemonic]);

  return {mnemonic, setMnemonic, address, isMnemonicValid};
}
