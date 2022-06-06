import React from 'react';
import {View, StyleSheet, Animated, Easing, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  width: number;
  height?: number;
  circle?: boolean;
};

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

export function Skeleton({width, height, circle = false}: Props) {
  const widthValue = !circle && !height ? `${width}%` : width;
  const heightValue = height ? height : !circle && !height ? 25 : width;
  const borderRadius = circle ? Math.floor(width / 2) : 4;

  const animatedValue = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: (150 - width) * 25,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue, width]);

  const interpolateWidth = Dimensions.get('window').width - (250 - width);
  const translateX = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-interpolateWidth, interpolateWidth],
  });

  return (
    <View style={[{width: widthValue, height: heightValue, borderRadius}, styles.container]}>
      <AnimatedLG
        colors={['#a0a0a0', '#a0a0a0', '#b0b0b0', '#b0b0b0', '#b0b0b0', '#b0b0b0', '#a0a0a0', '#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          {
            transform: [{translateX}],
          },
          StyleSheet.absoluteFill,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
    overflow: 'hidden',
  },
});
