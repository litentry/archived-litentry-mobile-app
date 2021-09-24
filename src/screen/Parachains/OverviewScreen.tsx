import React from 'react';
import {View, Text} from 'react-native';
import SafeView, {noTopEdges} from 'presentational/SafeView';

export function ParachainsOverviewScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <View>
        <Text>Parachains Overview</Text>
      </View>
    </SafeView>
  );
}
