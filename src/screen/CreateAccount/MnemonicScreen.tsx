import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet} from 'react-native';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {Button, Caption, Padder, TextInput} from 'src/packages/base_components';
import {verifyMnemonicScreen} from 'src/navigation/routeKeys';
import SubstrateSign from 'react-native-substrate-sign';

function consoleLogMnemonic(mnemonic: string) {
  if (__DEV__) {
    console.log('Mnemonic seed ::: ', mnemonic);
  }
}

export function MnemonicScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const [mnemonic, setMnemonic] = React.useState<string>();

  React.useEffect(() => {
    SubstrateSign.randomPhrase(12).then((_mnemonic) => {
      consoleLogMnemonic(_mnemonic);
      setMnemonic(_mnemonic);
    });
  }, []);

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <TextInput
          autoComplete={false}
          label={'Generated mnemonic seed'}
          style={styles.input}
          value={mnemonic}
          disabled
          multiline
        />
        <Padder scale={1} />
        <Caption>
          {`Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.`}
        </Caption>
        <Padder scale={2} />
        <Button
          mode="outlined"
          icon={'arrow-right-circle'}
          onPress={() => (mnemonic ? navigation.navigate(verifyMnemonicScreen, {mnemonic}) : undefined)}>
          Next
        </Button>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginTop: standardPadding,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
});
