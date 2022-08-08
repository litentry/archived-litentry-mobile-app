import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@ui/library';
import {standardPadding} from '@ui/styles';

export function ItemRowBlock({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Text variant="bodySmall" style={styles.rowLabel}>
        {label}:
      </Text>
      <View style={styles.value}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding,
  },
  rowLabel: {
    width: '28%',
  },
  value: {
    flex: 1,
  },
});
