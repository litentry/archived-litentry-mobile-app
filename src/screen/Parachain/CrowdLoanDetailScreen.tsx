import {Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export function CrowdLoanDetailScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text>CrowdLoan detail</Text>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
