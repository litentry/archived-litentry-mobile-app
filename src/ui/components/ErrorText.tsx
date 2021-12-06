import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from '@ui/library';

export function ErrorText(props: {children: React.ReactNode}) {
  const theme = useTheme();
  return <Text style={[styles.errorText, {color: theme.colors.error}]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
  },
});
