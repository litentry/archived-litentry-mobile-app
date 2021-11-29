import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAccounts} from 'context/AccountsContext';
import {NetworkContext} from 'context/NetworkContext';
import {ProgressBar} from 'presentational/ProgressBar';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubstrateSign from 'react-native-substrate-sign';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {accountsScreen, importAccountWithJsonFileScreen} from 'src/navigation/routeKeys';
import {AppBar, Button, ErrorText, List, Padder, TextInput, useTheme} from 'src/packages/base_components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import zxcvbn from 'zxcvbn';

type Account = {
  title: string;
  password: string;
  confirmPassword: string;
};

export function ImportAccountScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const theme = useTheme();
  const {currentNetwork} = React.useContext(NetworkContext);
  const [account, setAccountState] = React.useState<Account>({title: '', password: '', confirmPassword: ''});
  const setAccount = (_account: Account) => {
    setAccountState(_account);
    setError('');
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {seed, setSeed, address, isSeedValid} = useParseSeed();
  const {addAccount} = useAccounts();
  const [error, setError] = React.useState<null | string>(null);

  const passwordStrength = zxcvbn(account.password).score;

  const onSubmit = async () => {
    if (!isSeedValid) {
      setError('The seed appears to be invalid');
    } else if (!address) {
      setError('Could not parse the address from the seed');
    } else if (!account.password) {
      setError('Please enter a password');
    } else if (account.password !== account.confirmPassword) {
      setError('Passwords do not match');
    } else if (passwordStrength < 3) {
      setError('Password is too weak');
    } else {
      if (!address) {
        throw new Error('address not provided');
      }
      const encoded = await SubstrateSign.encryptData(seed, account.password);
      const newAcc = {
        address,
        encoded,
        meta: {
          name: account.title,
          network: currentNetwork.key,
          isFavorite: false,
        },
        isExternal: false,
      };

      addAccount(newAcc);
      navigation.navigate(accountsScreen, {reload: true});
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <TextInput
          autoComplete={false}
          label={'EXISTING 12 WORD MNEMONIC SEED'}
          numberOfLines={4}
          multiline={true}
          value={seed}
          onChangeText={(_seed) => {
            setSeed(_seed);
            setError(null);
          }}
          editable
          mode="outlined"
          outlineColor={seed.length ? (isSeedValid ? 'success' : 'danger') : 'basic'}
          style={styles.seedInput}
        />
        <Padder scale={1} />
        <TextInput
          mode="outlined"
          autoComplete={false}
          label={'Descriptive name for the account'}
          value={account.title}
          onChangeText={(text) => setAccount({...account, title: text})}
        />
        <Padder scale={1} />
        <TextInput
          mode="outlined"
          autoComplete={false}
          secureTextEntry={!isPasswordVisible}
          label={'New password for the account'}
          value={account.password}
          onChangeText={(text) => {
            setAccount({...account, password: text});
          }}
          right={() => (
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
              color={theme.colors.disabled}
            />
          )}
          outlineColor={account.password ? (passwordStrength >= 3 ? 'success' : 'danger') : 'basic'}
        />
        <View style={styles.progressBar}>
          <ProgressBar percentage={passwordStrength * 25} requiredAmount={75} />
        </View>
        <Padder scale={1} />
        <TextInput
          autoComplete={false}
          mode="outlined"
          secureTextEntry={!isPasswordVisible}
          label={'Confirm password'}
          style={styles.input}
          value={account.confirmPassword}
          onChangeText={(text) => setAccount({...account, confirmPassword: text})}
          outlineColor={
            account.confirmPassword ? (account.password === account.confirmPassword ? 'success' : 'danger') : 'basic'
          }
        />
        <Padder scale={2} />
        {address && (
          <>
            <List.Item
              title={account.title}
              left={() => <IdentityIcon value={address} size={40} />}
              description={address}
            />
            <Padder scale={1} />
          </>
        )}
        {error ? (
          <>
            <ErrorText> {error}</ErrorText>
            <Padder scale={1} />
          </>
        ) : null}
        <View style={globalStyles.flex} />
        <Button mode="outlined" icon={'download'} onPress={onSubmit}>
          Import Seed
        </Button>
        <Padder scale={2} />
      </View>
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
    marginTop: 5,
  },
});

function useParseSeed() {
  const {currentNetwork} = React.useContext(NetworkContext);
  const [seed, setSeed] = React.useState(' ');
  const [address, setAddress] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      try {
        if (seed) {
          const _address = await SubstrateSign.substrateAddress(seed.trim(), currentNetwork.ss58Format);
          setAddress(_address);
        }
      } catch (e) {}
    })();
  }, [currentNetwork.ss58Format, seed]);

  return {seed, setSeed, address, isSeedValid: Boolean(address)};
}

export function ImportScreenHeaderRight() {
  const navigation = useNavigation();
  return <AppBar.Action icon="plus" onPress={() => navigation.navigate(importAccountWithJsonFileScreen)} />;
}
