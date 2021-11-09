import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {RouteProp} from '@react-navigation/core';
import {Icon, Input, Text, ListItem, useTheme, Button} from '@ui-kitten/components';
import FormLabel from 'presentational/FormLabel';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {exportAccountWithJsonFileScreen} from 'src/navigation/routeKeys';
import {monofontFamily, standardPadding} from 'src/styles';
import Share from 'react-native-share';
import {useAccounts} from 'context/AccountsContext';

export function ExportAccountWithJsonFileScreen({
  route,
}: {
  route: RouteProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;
}) {
  const theme = useTheme();
  const {address} = route.params;
  const {accounts} = useAccounts();
  const account = accounts[address];

  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const _doBackup = async () => {
    setError('');
    try {
      if (!account || account.isExternal) {
        throw new Error('Account not found');
      }

      const blob = new Blob([JSON.stringify(account)], {type: 'application/json', lastModified: Date.now()});
      await Share.open({
        title: address,
        filename: `${address}.json`,
        type: 'application/json',
        failOnCancel: false,
        saveToFiles: true,
        url: await blobToBase64(blob),
      });
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
        <ListItem
          title={account?.meta.name}
          accessoryLeft={() => <IdentityIcon value={address} size={40} />}
          description={address}
        />
        <Padder scale={1} />
        <Input
          secureTextEntry={!isPasswordVisible}
          label={() => <FormLabel text="password" />}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          accessoryRight={() => (
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Icon
                name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
                fill={theme['color-basic-600']}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          status={password ? 'success' : 'basic'}
        />
        <Padder scale={1} />
        {error ? <Text status="danger">{error}</Text> : null}
        <Padder scale={1} />
        <Button disabled={!password} onPress={() => _doBackup()}>
          <Text>export</Text>
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
