import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {RouteProp} from '@react-navigation/native';
import {ParachainsStackParamList} from 'src/navigation/navigation';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'parachainDetails'>;
};

export function ParachainDetailsScreen({route}: ScreenProps) {
  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text>parachain details</Text>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
