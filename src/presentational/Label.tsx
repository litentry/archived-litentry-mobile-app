import {Text} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export function Label({text}: {text: string}) {
  return (
    <View style={styles.container}>
      <Text category="label" appearance="alternative" style={styles.text}>
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
  text: {},
});
