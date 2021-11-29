import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {NavigationProp} from '@react-navigation/core';
import {InternalAccount, useAccounts} from 'context/AccountsContext';
import {NetworkContext} from 'context/NetworkContext';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import SubstrateSign from 'react-native-substrate-sign';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {accountsScreen} from 'src/navigation/routeKeys';
import {Button, Caption, ErrorText, List, Padder, Text, TextInput, useTheme} from 'src/packages/base_components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';

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
          meta: {...parsedJson.meta, network: currentNetwork.key, isFavorite: false},
          isExternal: false,
        };
        addAccount(newAcc);
        navigation.navigate(accountsScreen, {reload: true});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        <Caption>Supply a backed-up JSON file, encrypted with your account-specific password.</Caption>
        <Padder scale={0.5} />
        {parsedJson ? (
          <List.Item
            title={parsedJson.meta.name as string}
            left={() => <IdentityIcon value={parsedJson.address} size={40} />}
            description={parsedJson.address}
          />
        ) : (
          <>
            <Button
              mode="outlined"
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
        <ErrorText>{error}</ErrorText>
        <Padder scale={1} />
        <TextInput
          autoComplete={false}
          secureTextEntry={!isPasswordVisible}
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          right={() => (
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
              color={theme.colors.disabled}
              style={styles.icon}
            />
          )}
        />

        <View style={globalStyles.flex} />
        <Button mode="outlined" disabled={!password || !parsedJson} onPress={() => restoreAccount()}>
          <Text>Restore</Text>
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

function tryParseJson(json: string): InternalAccount | undefined {
  try {
    return JSON.parse(json);
  } catch (e) {
    return undefined;
  }
}
