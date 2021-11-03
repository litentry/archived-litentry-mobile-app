import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {Button, Icon, Input, ListItem, Text, useTheme} from '@ui-kitten/components';
import FormLabel from 'presentational/FormLabel';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {monofontFamily, standardPadding} from 'src/styles';
import type {KeyringPair$Json} from '@polkadot/keyring/types';
import {NavigationProp} from '@react-navigation/core';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {accountsScreen} from 'src/navigation/routeKeys';
import {NetworkContext} from 'context/NetworkContext';
import {useAccounts} from 'context/AccountsContext';
import SubstrateSign from 'react-native-substrate-sign';

export function ImportAccountWithJsonFileScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const theme = useTheme();
  const {currentNetwork} = React.useContext(NetworkContext);
  const [jsonContent, setJsonContent] = React.useState<string>();
  const [error, setError] = React.useState<string | undefined>(undefined);
  const parsedJson = jsonContent ? tryParseJson(jsonContent) : undefined;
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const {addAccount} = useAccounts();

  async function restoreAccount() {
    if (parsedJson && password) {
      try {
        // TODO: NOT WORKING WITH POLKADOT EXTENSION THE ENCODING IS DIFFERENT THERE
        await SubstrateSign.decryptData(parsedJson.encoded, password);

        const newAcc = {
          address: parsedJson.address,
          encoded: parsedJson.encoded,
          meta: {name: '', ...parsedJson.meta, network: currentNetwork.key, isFavorite: false},
          isExternal: false,
        };
        addAccount(newAcc);
        navigation.navigate(accountsScreen, {reload: true});
      } catch (e: any) {
        console.warn(e);
        setError(e.message);
      }
    }
  }

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text>Add via backup file</Text>
        <Padder scale={1} />

        <Text category="c1">Supply a backed-up JSON file, encrypted with your account-specific password.</Text>
        <Padder scale={0.5} />
        {parsedJson ? (
          <ListItem
            title={parsedJson.meta.name as string}
            accessoryLeft={() => <IdentityIcon value={parsedJson.address} size={40} />}
            description={parsedJson.address}
          />
        ) : (
          <>
            <Button
              status="basic"
              onPress={() =>
                pickFile()
                  .then(setJsonContent)
                  .catch((e: Error) => {
                    setJsonContent(undefined);
                    setError(e.message);
                  })
              }>
              <Text>Pick the json file</Text>
            </Button>
            <Padder scale={0.5} />
          </>
        )}
        <Text status="danger">{error}</Text>
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

        <Padder scale={2} />
        <Button disabled={!password || !parsedJson} onPress={() => restoreAccount()}>
          <Text>Restore</Text>
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
  progressBar: {
    marginTop: 5,
  },
});

async function pickFile() {
  let res: DocumentPickerResponse[] | undefined;
  try {
    res = await DocumentPicker.pick({type: DocumentPicker.types.allFiles});
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      return;
    } else {
      throw err;
    }
  }

  if (res) {
    const pickedFile = res[0];
    if (!pickedFile) {
      throw new Error('No file selected');
    }
    if (pickedFile.type !== 'application/json') {
      throw new Error('File is not json');
    }

    const file = await RNFS.readFile(pickedFile.uri, 'utf8');
    return file;
  }
}

function tryParseJson(json: string): KeyringPair$Json | undefined {
  try {
    return JSON.parse(json);
  } catch (e) {
    return undefined;
  }
}
