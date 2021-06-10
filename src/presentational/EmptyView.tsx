import {Icon, Text, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import React from 'react';

export function EmptyView() {
  const themeVars = useTheme();

  return (
    <View style={styles.container}>
      <Icon
        style={{width: 32, height: 32, marginRight: 10}}
        fill={themeVars['color-basic-600']}
        name="close-square-outline"
      />
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
});
