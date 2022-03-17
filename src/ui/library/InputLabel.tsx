import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from '@ui/library';
import {Icon} from './Icon';
import {Popover} from './Popover';

export type InputLabelProps = {
  label: string;
  helperText?: string;
};

export function InputLabel({label, helperText}: InputLabelProps) {
  return (
    <View style={styles.rowAlignCenter}>
      <Caption>{label}</Caption>
      {helperText && <Popover popableText={helperText} popableContent={<Icon name={`help-circle`} size={20} />} />}
    </View>
  );
}

const styles = StyleSheet.create({
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});