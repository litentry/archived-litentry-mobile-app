import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from '@ui/library';
import {useNetInfo} from 'src/hooks/useNetInfo';

export function NetworkConnectionError() {
  const theme = useTheme();
  const {isConnected} = useNetInfo();

  return !isConnected ? (
    <View>
      <Text variant="bodySmall" style={[{color: theme.colors.error}, styles.banner]}>
        No internet connectivity
      </Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    marginBottom: 2,
  },
});
