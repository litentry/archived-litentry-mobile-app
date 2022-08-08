import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Icon, Text, useTheme} from '@ui/library';
import {standardPadding} from '@ui/styles';

export function HashBlock({title, text}: {title: string; text: string}): React.ReactElement {
  const [numOfLines, setNumOfLines] = useState<undefined | number>(1);
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {borderColor: colors.onSurface}]}>
      <TouchableOpacity onPress={() => setNumOfLines(numOfLines ? undefined : 1)} style={styles.textContainer}>
        <Text>{title}</Text>
        <Text variant="bodySmall" numberOfLines={numOfLines}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Clipboard.setString(text)}>
        <Icon name="content-copy" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'dashed',
    borderWidth: 1,
    paddingHorizontal: standardPadding * 2,
    paddingVertical: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  textContainer: {flex: 1},
});
