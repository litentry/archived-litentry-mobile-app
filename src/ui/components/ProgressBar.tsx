import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui/library';
import {useTheme} from '@ui/library';

interface Props {
  percentage: number;
  requiredAmount: number;
}

export function ProgressBar(props: Props) {
  const [barW, setBarW] = useState<number>();
  const [requiredTextW, setRequiredTextW] = useState<number>();
  const {colors} = useTheme();

  const {percentage, requiredAmount} = props;

  const left = barW && requiredTextW ? (requiredAmount * barW) / 100 - requiredTextW / 2 : 0;

  return (
    <View style={styles.container}>
      <View
        style={[styles.barBG, {backgroundColor: colors.secondaryContainer}]}
        onLayout={(e) => setBarW(e.nativeEvent.layout.width)}>
        <View style={[styles.progressed, {width: `${percentage}%`, backgroundColor: colors.secondary}]} />
      </View>
      <View style={[styles.requiredContainer, {left}]} onLayout={(e) => setRequiredTextW(e.nativeEvent.layout.width)}>
        <Text style={{color: colors.primary}}>{`${requiredAmount}% required`}</Text>
        <View style={[styles.requiredLine, {backgroundColor: colors.primary}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    paddingTop: 23,
  },
  barBG: {
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressed: {
    height: '100%',
  },
  requiredContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  requiredLine: {
    height: 20,
    width: 3,
    borderRadius: 10,
  },
});
