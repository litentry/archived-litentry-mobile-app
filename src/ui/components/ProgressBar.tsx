import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui/library';
import {useTheme} from '@ui/library';

interface Props {
  percentage: number;
  requiredAmount?: number;
}

export function ProgressBar({percentage, requiredAmount = 0}: Props) {
  const [barW, setBarW] = useState<number>();
  const [requiredTextW, setRequiredTextW] = useState<number>();
  const {colors} = useTheme();

  const left = barW && requiredTextW ? (requiredAmount * barW) / 100 - requiredTextW / 2 : 0;

  return (
    <>
      <View
        style={[styles.barBG, {backgroundColor: colors.secondaryContainer}]}
        onLayout={(e) => setBarW(e.nativeEvent.layout.width)}>
        <View style={[styles.progressed, {width: `${percentage}%`, backgroundColor: colors.secondary}]} />
      </View>
      {requiredAmount ? (
        <View style={[styles.requiredContainer, {left}]} onLayout={(e) => setRequiredTextW(e.nativeEvent.layout.width)}>
          <Text style={{color: colors.primary}}>{`${requiredAmount}% required`}</Text>
          <View style={[styles.requiredLine, {backgroundColor: colors.primary}]} />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
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
    bottom: -4,
  },
  requiredLine: {
    height: 20,
    width: 3,
    borderRadius: 10,
  },
});
