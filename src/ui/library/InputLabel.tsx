import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption, useTheme} from '@ui/library';
import {Icon} from './Icon';
import {Popover} from './Popover';
import {Padder} from '@ui/components/Padder';

export type InputLabelProps = {
  label: string;
  helperText?: string;
};

export function InputLabel({label, helperText}: InputLabelProps) {
  const {colors} = useTheme();
  return (
    <View style={styles.rowAlignCenter}>
      <Caption>{label}</Caption>
      {helperText ? (
        <>
          <Padder scale={0.2} />
          <Popover content={helperText}>
            <Icon name={`help-circle`} size={15} color={colors.disabled} />
          </Popover>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
