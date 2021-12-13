import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Icon, Text, useTheme} from '@ui-kitten/components';
import {standardPadding} from '@ui/styles';

export function HashBlock({title, text}: {title: string; text: string}): React.ReactElement {
  const [numOfLines, setNumOfLines] = useState<undefined | number>(1);
  const themeVars = useTheme();

  return (
    <View style={[styles.container, {borderColor: themeVars['color-basic-600']}]}>
      <TouchableOpacity onPress={() => setNumOfLines(numOfLines ? undefined : 1)} style={styles.textContainer}>
        <Text category={'c1'} style={{color: themeVars['color-basic-600']}}>
          {title}
        </Text>
        <Text category={'c1'} numberOfLines={numOfLines}>
          {text}
        </Text>
      </TouchableOpacity>
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
    borderRadius: 5,
  },
  textContainer: {flex: 1},
  icon: {width: 20, height: 20, marginLeft: 10},
});
