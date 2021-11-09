import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Icon, Button} from '@ui-kitten/components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import FormLabel from 'presentational/FormLabel';
import Padder from 'presentational/Padder';
import {verifyMnemonicScreen} from 'src/navigation/routeKeys';
import SubstrateSign from 'react-native-substrate-sign';

export function MnemonicScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const [mnemonic, setMnemonic] = React.useState<string>();

  React.useEffect(() => {
    SubstrateSign.randomPhrase(12).then(setMnemonic);
  }, []);

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <Input
          label={() => <FormLabel text="Generated mnemonic seed" />}
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
        <Button
          status="basic"
          accessoryLeft={(p) => <Icon {...p} name="arrow-circle-right-outline" />}
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
