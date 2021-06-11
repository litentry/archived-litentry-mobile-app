import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text, useTheme} from '@ui-kitten/components';
import {standardPadding} from 'src/styles';
import Clipboard from '@react-native-community/clipboard';

export function HashBlock({text}: {text: string}): React.ReactElement {
  const [numOfLines, setNumOfLines] = useState<undefined | number>(1);
  const themeVars = useTheme();

  return (
    <View style={[styles.container, {borderColor: themeVars['color-basic-600']}]}>
      <Text
        category={'c1'}
        numberOfLines={numOfLines}
        style={styles.text}
        onPress={() => setNumOfLines(numOfLines ? undefined : 1)}>
        {text}
      </Text>
      <TouchableOpacity onPress={() => Clipboard.setString(text)}>
        <Icon name={'copy-outline'} fill={themeVars['color-basic-600']} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderStyle: 'dashed',
    borderWidth: 1,
    paddingHorizontal: standardPadding * 2,
    paddingVertical: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {flex: 1},
  icon: {width: 20, height: 20},
});
