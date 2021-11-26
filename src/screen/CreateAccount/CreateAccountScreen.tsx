import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, ListItem, Icon, useTheme, Button} from '@ui-kitten/components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import FormLabel from 'presentational/FormLabel';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {Padder} from 'src/packages/base_components';
import {ProgressBar} from 'presentational/ProgressBar';
import zxcvbn from 'zxcvbn';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {accountsScreen, createAccountScreen} from 'src/navigation/routeKeys';
import {NetworkContext} from 'context/NetworkContext';
import {useAccounts} from 'context/AccountsContext';
import SubstrateSign from 'react-native-substrate-sign';

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

  const [account, setAccount] = React.useState<{
    title: string;
    password: string;
    confirmPassword: string;
  }>({title: '', password: '', confirmPassword: ''});

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [address, setAddress] = React.useState('');

  React.useEffect(() => {
    SubstrateSign.substrateAddress(mnemonic, currentNetwork.ss58Format).then(setAddress);
  }, [mnemonic, currentNetwork.ss58Format]);

  const passwordStrength = zxcvbn(account.password).score;

  const isDisabled = !(
    account.password &&
    account.password === account.confirmPassword &&
    account.title &&
    passwordStrength >= 3
  );

  const onSubmit = async () => {
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
          label={() => <FormLabel text="Mnemonic seed" />}
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
