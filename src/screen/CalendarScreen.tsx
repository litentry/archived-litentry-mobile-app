import React from 'react';
import {View, Text, StyleSheet} from 'src/packages/base_components';

export function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
