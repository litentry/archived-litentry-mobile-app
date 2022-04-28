import React from 'react';
import {StyleSheet, View, TextStyle, StyleProp} from 'react-native';
import {ProgressChart, Caption, useTheme} from '@ui/library';
import {standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  detail: string;
  data: number[];
  chartTextStyle?: StyleProp<TextStyle>;
};

function ProgressChartWidget(props: PropTypes) {
  const {colors} = useTheme();
  const {title, detail, data, chartTextStyle} = props;

  return (
    <View style={styles.container} testID="progress_chart_id">
      <Caption style={styles.title}>{title}</Caption>
      <View style={styles.chartContainer}>
        <Caption style={[styles.chartText, chartTextStyle]}>{detail}</Caption>
        <ProgressChart
          data={data}
          width={100}
          height={100}
          strokeWidth={12}
          radius={44}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            color: (opacity = 1) => `rgba(254, 163, 79, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          hideLegend
        />
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

export default ProgressChartWidget;
