import React from 'react';
import {StyleSheet} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {standardPadding} from 'src/styles';
import {View, Caption, useTheme} from 'src/packages/base_components';

type PropTypes = {
  title: string;
  detail: string;
  data: number[];
};

function ProgressChartWidget(props: PropTypes) {
  const {colors} = useTheme();
  const {title, detail, data} = props;

  return (
    <>
      <Caption style={styles.title}>{title}</Caption>
      <View style={styles.chartContainer}>
        <Caption style={styles.chartText}>{detail}</Caption>
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
            color: (opacity = 1) => `rgba(27, 197, 117, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          hideLegend
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: standardPadding * 2,
  },
  chartText: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    left: '39%',
    top: '42%',
  },
});

export default ProgressChartWidget;
