import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text, useTheme} from '@ui-kitten/components';

export function EmptyView() {
  const themeVars = useTheme();

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} fill={themeVars['color-basic-600']} name="close-square-outline" />
      <Text>There are no items</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    flexDirection: 'row',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
});
