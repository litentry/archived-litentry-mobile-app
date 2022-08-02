import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption, useTheme} from '@ui/library';
import {Popable} from 'react-native-popable';

export type PopoverProps = {
  content: string;
  children?: React.ReactNode;
};

export function Popover({content, children}: PopoverProps) {
  const {colors} = useTheme();
  return (
    <Popable
      content={
        <View style={styles.container}>
          <Caption style={styles.text}>{content}</Caption>
        </View>
      }
      backgroundColor={colors.accent}>
      {children}
    </Popable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    textAlign: 'center',
    color: '#171414',
  },
});
