import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {NavigationProp} from '@react-navigation/core';
import {useNetwork} from '@atoms/network';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {accountsScreen} from '@ui/navigation/routeKeys';
import {Button, Caption, List, Text, TextInput, useTheme} from '@ui/library';
import {ErrorText} from '@ui/components/ErrorText';
import {Padder} from '@ui/components/Padder';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import {SecureKeychain} from 'src/service/SecureKeychain';
import {useKeyring} from '@polkadotApi/useKeyring';

export function ImportAccountWithJsonFileScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const theme = useTheme();
  const {currentNetwork} = useNetwork();
  const [jsonContent, setJsonContent] = React.useState<string>();
  const [error, setError] = React.useState<string | undefined>(undefined);
  const parsedJson = jsonContent ? tryParseJson(jsonContent) : undefined;
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const {restoreAccount} = useKeyring();

  async function onRestoreAccount() {
    if (parsedJson && password) {
      try {
        const account = await restoreAccount({
          json: parsedJson,
          password,
          network: currentNetwork.key,
        });
        SecureKeychain.setPasswordByServiceId(password, 'BIOMETRICS', account.address as string);
        navigation.navigate(accountsScreen, {reload: true});
      } catch (e) {
        console.warn(e);
        setError((e as Error).message);
      }
    }
  }

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Text>Add via backup file</Text>
        <Padder scale={1} />

        <Caption>Supply a backed-up JSON file, encrypted with your account-specific password.</Caption>
        <Padder scale={0.5} />
        {parsedJson ? (
          <List.Item
            title={parsedJson.meta.name}
            left={() => (
              <View style={globalStyles.justifyCenter}>
                <IdentityIcon value={parsedJson.address} size={40} />
              </View>
            )}
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
        <TextInput
          autoComplete="off"
          secureTextEntry={!isPasswordVisible}
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
              color={theme.colors.disabled}
            />
          }
        />
        <Padder scale={1} />
        <ErrorText>{error}</ErrorText>
        <Padder scale={2} />
        <Button mode="outlined" disabled={!password || !parsedJson} onPress={() => onRestoreAccount()}>
          <Text>Restore</Text>
        </Button>
        <Padder scale={2} />
      </ScrollView>
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

function tryParseJson(json: string) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return undefined;
  }
}
