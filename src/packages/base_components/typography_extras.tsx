import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export function ErrorText(props: {children: React.ReactNode}) {
  return <Text style={styles.errorText}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
