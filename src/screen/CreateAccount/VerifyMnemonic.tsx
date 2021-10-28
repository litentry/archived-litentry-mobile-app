import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet} from 'react-native';
import {Input, Icon, Button} from '@ui-kitten/components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import FormLabel from 'presentational/FormLabel';
import Padder from 'presentational/Padder';
import {verifyMnemonicScreen, createAccountScreen} from 'src/navigation/routeKeys';
import {shuffle} from 'lodash';

type Word = {
  text: string;
  isSelected: boolean;
};

export function VerifyMnemonicScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof verifyMnemonicScreen>;
}) {
  const {mnemonic} = route.params;

  const [isMnemonicVerified, setIsMnemonicVerified] = React.useState(false);
  const [selectedMnemonic, setSelectedMnemonic] = React.useState('');

  const [words, setWords] = React.useState<Word[]>(() => {
    return shuffle(mnemonic.split(' ')).map((word) => ({
      text: word,
      isSelected: false,
    }));
  });

  React.useEffect(() => {
    const isMnemonicVerified = mnemonic === selectedMnemonic;
    setIsMnemonicVerified(isMnemonicVerified);
  }, [selectedMnemonic, mnemonic]);

  const onSelect = (selectedWord: Word) => {
    const wordsSelected = words.map((word) =>
      word.text === selectedWord.text ? {...word, isSelected: !word.isSelected} : word,
    );
    setWords(wordsSelected);

    const mnemonicSelected = !selectedWord.isSelected
      ? `${selectedMnemonic} ${selectedWord.text}`
      : selectedMnemonic
          .split(' ')
          .filter((word) => word !== selectedWord.text)
          .join(' ');

    setSelectedMnemonic(mnemonicSelected.trim());
  };

  const onReset = () => {
    setWords(words.map((word) => ({...word, isSelected: false})));
    setSelectedMnemonic('');
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <Input
          label={() => <FormLabel text="Mnemonic seed" />}
          style={styles.input}
          textStyle={{height: 50}}
          value={selectedMnemonic}
          disabled
          multiline
        />
        <Padder scale={2} />
        <WordSelector words={words} onSelect={onSelect} />
        <Padder scale={2} />
        <View style={styles.buttons}>
          <Button status="basic" accessoryLeft={(p) => <Icon {...p} name="repeat-outline" />} onPress={onReset}>
            Reset
          </Button>
          <Button
            // disabled={!isMnemonicVerified}
            status="basic"
            accessoryLeft={(p) => <Icon {...p} name="arrow-circle-right-outline" />}
            onPress={() => navigation.navigate(createAccountScreen, {mnemonic})}>
            Next
          </Button>
        </View>
      </View>
    </SafeView>
  );
}

type WordSelectorProps = {
  words: Word[];
  onSelect: (word: Word) => void;
};

function WordSelector({words, onSelect}: WordSelectorProps) {
  return (
    <View style={styles.words}>
      {words.map((word) => (
        <View style={styles.wordButton} key={word.text}>
          <Button
            status={`${word.isSelected ? 'success' : 'primary'}`}
            onPress={() => onSelect(word)}
            size="small"
            appearance="outline">
            {word.text}
          </Button>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginTop: standardPadding,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
    height: 70,
  },
  words: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wordButton: {
    margin: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
