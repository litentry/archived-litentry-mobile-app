import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export function ErrorText(props: {children: React.ReactNode}) {
  const theme = useTheme();
  return <Text style={[styles.errorText, {color: theme.colors.error}]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
  },
});
