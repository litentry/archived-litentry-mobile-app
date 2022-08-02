import React from 'react';
import {StyleSheet} from 'react-native';

import {Caption, useTheme} from '@ui/library';
import {Popable} from 'react-native-popable';

export type PopoverProps = {
  content: string;
  children?: React.ReactNode;
};

export function Popover({content, children}: PopoverProps) {
  const {colors} = useTheme();
  return (
    <Popable content={<Caption style={styles.text}>{content}</Caption>} backgroundColor={colors.accent}>
      {children}
    </Popable>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#171414',
  },
});
