import React from 'react';
import {StyleSheet, View, TextStyle, StyleProp} from 'react-native';
import {Text} from '@ui/library';
import {ProgressChart} from '@ui/components/ProgressChart';
import {standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  detail: string;
  progress: number;
  chartTextStyle?: StyleProp<TextStyle>;
};

export function ProgressChartWidget(props: PropTypes) {
  const {title, detail, progress, chartTextStyle} = props;

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={styles.title}>
        {title}
      </Text>
      <View style={styles.chartContainer}>
        <Text variant="bodySmall" style={[styles.chartText, chartTextStyle]}>
          {detail}
        </Text>
        <ProgressChart width={100} percent={progress} textHidden />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: standardPadding,
  },
  chartText: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    left: '39%',
    top: '25%',
  },
});
