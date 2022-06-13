import React from 'react';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {View, StyleSheet} from 'react-native';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {Button, Caption, TextInput} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {verifyMnemonicScreen} from '@ui/navigation/routeKeys';
// import SubstrateSign from 'react-native-substrate-sign';
import {useCryptoUtil} from '@polkadotApi/useCryptoUtil';

function consoleLogMnemonic(mnemonic: string) {
  if (__DEV__) {
    console.log('Mnemonic seed ::: ', mnemonic);
  }
}

export function MnemonicScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const [mnemonic, setMnemonic] = React.useState<string>();
  const {generateMnemonic} = useCryptoUtil();

  // React.useEffect(() => {
  //   SubstrateSign.randomPhrase(12).then((_mnemonic) => {
  //     consoleLogMnemonic(_mnemonic);
  //     setMnemonic(_mnemonic);
  //   });
  // }, []);

  React.useEffect(() => {
    generateMnemonic().then((_mnemonic) => {
      consoleLogMnemonic(_mnemonic);
      setMnemonic(_mnemonic);
    });
  }, [generateMnemonic]);

  return (
    <SafeView edges={noTopEdges}>
      <View style={[globalStyles.paddedContainer, globalStyles.flex]}>
        <TextInput
          autoComplete="off"
          label={'Mnemonic seed'}
          style={styles.input}
          value={mnemonic}
          disabled
          multiline
        />
        <Padder scale={1} />
        <Caption>
          {`Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.`}
        </Caption>
        <View style={globalStyles.flex} />
        <Button
          mode="outlined"
          icon={'arrow-right-circle'}
          onPress={() => (mnemonic ? navigation.navigate(verifyMnemonicScreen, {mnemonic}) : undefined)}>
          Next
        </Button>
        <Padder scale={2} />
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
