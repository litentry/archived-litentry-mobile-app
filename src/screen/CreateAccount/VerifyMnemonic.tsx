import {NavigationProp, RouteProp} from '@react-navigation/native';
import {shuffle} from 'lodash';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {createAccountScreen, verifyMnemonicScreen} from 'src/navigation/routeKeys';
import {Button, ErrorText, Padder, Text, TextInput, useTheme} from 'src/packages/base_components';
import globalStyles from 'src/styles';

type Word = {
  id: number;
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
  const [selectedMnemonic, setSelectedMnemonic] = React.useState(' ');

  const invalidMnemonic = selectedMnemonic.length === mnemonic.length && selectedMnemonic !== mnemonic;

  const [words, setWords] = React.useState<Word[]>(() => {
    return shuffle(mnemonic.split(' ')).map((word, index) => ({
      id: index,
      text: word,
      isSelected: false,
    }));
  });

  React.useEffect(() => {
    const _isMnemonicVerified = mnemonic === selectedMnemonic;
    setIsMnemonicVerified(_isMnemonicVerified);
  }, [selectedMnemonic, mnemonic]);

  const onSelect = (selectedWord: Word) => {
    const wordsSelected = words.map((word) =>
      word.id === selectedWord.id ? {...word, isSelected: !word.isSelected} : word,
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
    setSelectedMnemonic(' ');
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={[globalStyles.paddedContainer, globalStyles.flex]}>
        <Text>Verify your mnemonic by selecting the words in the correct order.</Text>
        <Padder scale={1} />
        <TextInput
          label={'Mnemonic seed'}
          numberOfLines={3}
          value={selectedMnemonic}
          disabled
          multiline
          autoComplete={false}
          mode={'outlined'}
          style={styles.mnemonic}
        />
        <Padder scale={2} />
        <WordSelector words={words} onSelect={onSelect} />
        <Padder scale={2} />
        {invalidMnemonic && (
          <>
            <ErrorText>The mnemonic seed you entered is invalid. Please try again.</ErrorText>
            <Padder scale={2} />
          </>
        )}
        <View style={globalStyles.flex} />
        <View style={styles.buttons}>
          <Button mode="outlined" icon={'repeat'} onPress={onReset}>
            Reset
          </Button>
          <Button
            mode="outlined"
            disabled={!isMnemonicVerified}
            icon="arrow-right-circle"
            onPress={() => navigation.navigate(createAccountScreen, {mnemonic})}>
            Next
          </Button>
        </View>
        <Padder scale={2} />
      </View>
    </SafeView>
  );
}

type WordSelectorProps = {
  words: Word[];
  onSelect: (word: Word) => void;
};

function WordSelector({words, onSelect}: WordSelectorProps) {
  const theme = useTheme();

  return (
    <View style={styles.words}>
      {words.map((word) => (
        <View style={styles.wordButton} key={word.id}>
          <Button
            color={`${word.isSelected ? theme.colors.success : theme.colors.primary}`}
            onPress={() => onSelect(word)}
            mode="contained">
            {word.text}
          </Button>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  mnemonic: {
    height: 100,
  },
});
