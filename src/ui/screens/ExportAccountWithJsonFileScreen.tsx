import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {List, Button, TextInput} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {exportAccountWithJsonFileScreen} from '@ui/navigation/routeKeys';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import Share from 'react-native-share';
import {useSnackbar} from 'context/SnackbarContext';
import {NavigationProp} from '@react-navigation/core';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import {useKeyring} from '@polkadotApi/useKeyring';
import {ErrorText} from '@ui/components/ErrorText';
import {ErrorPayload} from 'polkadot-api';

type ScreenProps = {
  route: RouteProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;
  navigation: NavigationProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;
};

export function ExportAccountWithJsonFileScreen({route, navigation}: ScreenProps) {
  const {address} = route.params;
  const {accounts} = useAppAccounts();
  const account = accounts[address];
  const {exportAccount} = useKeyring();

  const snackbar = useSnackbar();

  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const doBackup = async () => {
    try {
      const encryptedJson = await exportAccount({address, password});
      const blob = new Blob([JSON.stringify(encryptedJson)], {type: 'application/json'});
      await Share.open({
        title: address,
        filename: `${address}.json`,
        type: 'application/json',
        saveToFiles: true,
        url: await blobToBase64(blob),
      });
      snackbar('Account successfully exported!');
      navigation.goBack();
    } catch (e) {
      console.warn(e);
      setError((e as ErrorPayload).message);
    }
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
      <View style={styles.container}>
        <List.Item title={account?.meta.name} left={AccountIdentityIcon} description={address} />
        <Padder scale={1} />

        <TextInput
          secureTextEntry={!isPasswordVisible}
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
            />
          }
          mode="outlined"
          autoComplete="off"
        />

        <Padder scale={1} />
        {error ? <ErrorText>{error}</ErrorText> : null}
        <Padder scale={1} />
        <Button disabled={!password} mode="outlined" onPress={doBackup}>
          Export
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
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        return resolve(reader.result);
      } else {
        throw new Error('blobToBase64: failed to convert blob to base64');
      }
    };
    reader.readAsDataURL(blob);
  });
}
