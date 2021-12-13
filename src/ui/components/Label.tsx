import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from '@ui-kitten/components';

export function Label({text}: {text: string}) {
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme['color-basic-transparent-500']}]}>
      <Text category="label" appearance="alternative" style={{color: theme['text-basic-color']}}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    paddingHorizontal: 5,
    paddingBottom: 3,
    paddingTop: 2,
    borderRadius: 5,
  },
});
