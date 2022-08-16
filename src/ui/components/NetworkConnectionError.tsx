import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption, useTheme} from '@ui/library';
import {useNetInfo} from 'src/hooks/useNetInfo';

export function NetworkConnectionError() {
  const theme = useTheme();
  const {isConnected} = useNetInfo();

  return !isConnected ? (
    <View>
      <Caption style={[{color: theme.colors.error}, styles.banner]}>No internet connectivity</Caption>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  banner: {textAlign: 'center'},
});
