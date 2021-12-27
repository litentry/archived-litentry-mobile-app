import React from 'react';
import {View, StyleSheet} from 'react-native';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {RouteProp} from '@react-navigation/core';
import {List, Button, TextInput, Subheading, useTheme} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {exportAccountWithJsonFileScreen} from '@ui/navigation/routeKeys';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import Share from 'react-native-share';
import {useAccounts} from 'context/AccountsContext';
import SubstrateSign from 'react-native-substrate-sign';
import {useSnackbar} from 'context/SnackbarContext';

export function ExportAccountWithJsonFileScreen({
  route,
}: {
  route: RouteProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;
}) {
  const {colors} = useTheme();
  const {address} = route.params;
  const {accounts} = useAccounts();
  const account = accounts[address];
  const showSnackbar = useSnackbar();

  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const verifyPassword = async () => {
    try {
      if (!account?.isExternal && account?.encoded) {
        await SubstrateSign.decryptData(account.encoded, password);
      }
    } catch (e) {
      throw new Error('Incorrect password');
    }
  };

  const _doBackup = async () => {
    setError('');
    try {
      if (!account || account.isExternal) {
        throw new Error('Account not found');
      }

      await verifyPassword();
      const blob = new Blob([JSON.stringify(account)], {type: 'application/json', lastModified: Date.now()});
      await Share.open({
        title: address,
        filename: `${address}.json`,
        type: 'application/json',
        failOnCancel: false,
        saveToFiles: true,
        url: await blobToBase64(blob),
      });
      showSnackbar('Account successfully exported!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if ('message' in e) {
        setError(e.message);
      }
      console.warn(e);
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <List.Item
          title={account?.meta.name}
          left={() => (
            <View style={globalStyles.justifyCenter}>
              <IdentityIcon value={address} size={40} />
            </View>
          )}
          description={address}
        />
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
        {error ? <Subheading style={{color: colors.error}}>{error}</Subheading> : null}
        <Padder scale={1} />
        <Button mode="outlined" onPress={_doBackup}>
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
