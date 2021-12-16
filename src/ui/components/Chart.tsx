import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProgressChart} from '@ui/library';

export function Chart({percent}: {percent: number}) {
  return (
    <View>
      <ProgressChart
        data={[percent]}
        width={50}
        height={50}
        strokeWidth={5}
        radius={21}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(254, 163, 79, ${opacity})`,
        }}
        hideLegend
      />
      <View style={styles.chartOverlay}>
        <Text adjustsFontSizeToFit numberOfLines={1}>
          {(percent * 100).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
