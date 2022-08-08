import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedProps, useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated';
import Svg, {G, Circle} from 'react-native-svg';
import {ReText} from 'react-native-redash';
import globalStyles from '@ui/styles';
import {useTheme} from '@ui/library';

interface ChartProps {
  width: number;
  percent: number;
  strokeWidth?: number;
  textHidden?: boolean;
}

const DEFAULT_STROKE_WIDTH = 12;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function ProgressChart({width, percent, strokeWidth = DEFAULT_STROKE_WIDTH, textHidden = false}: ChartProps) {
  const {colors} = useTheme();
  const progress = useSharedValue(0);
  const circumference = width * Math.PI;
  const r = width / 2;
  const halfCircle = r + strokeWidth;

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });
  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  React.useEffect(() => {
    progress.value = withTiming(percent, {duration: 1500});
  }, [progress, percent]);

  return (
    <View style={{width, height: width}}>
      {!textHidden ? (
        <ReText
          text={progressText}
          style={[
            StyleSheet.absoluteFillObject,
            {fontSize: width / 5, color: colors.secondary},
            globalStyles.textCenter,
          ]}
        />
      ) : null}
      <Svg height={width} width={width} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={r}
            stroke={colors.secondary}
            strokeOpacity={0.2}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={r}
            stroke={colors.secondary}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
    </View>
  );
}
