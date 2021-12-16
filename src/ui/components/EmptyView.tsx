import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import EmptyState from 'image/EmptyState.png';
import {standardPadding} from '@ui/styles';

export function EmptyView() {
  return (
    <View style={styles.container}>
      <Image source={EmptyState} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: standardPadding * 3,
  },
});
