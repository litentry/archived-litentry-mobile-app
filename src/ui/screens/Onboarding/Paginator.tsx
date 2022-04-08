import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut, SharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Padder} from '@ui/components/Padder';
import {Button, useTheme} from '@ui/library';

type PaginatorProps = {
  items: Array<unknown>;
  onNextPress: () => void;
  onSkipPress: () => void;
  activeIndex: SharedValue<number>;
};

export function Paginator({items, onNextPress, onSkipPress, activeIndex}: PaginatorProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={paginatorStyles.container}>
      <Button onPress={onSkipPress} compact>
        Skip
      </Button>
      <Padder scale={1.5} />
      {items.map((_, index) => {
        return <Dot key={index.toString()} index={index} activeIndex={activeIndex} />;
      })}
      <Padder scale={1.5} />
      <Button onPress={onNextPress} compact>
        Next
      </Button>
    </Animated.View>
  );
}

const paginatorStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

type DotProps = {
  index: number;
  activeIndex: SharedValue<number>;
};

function Dot({index, activeIndex}: DotProps) {
  const {colors} = useTheme();
  const rStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index;
    return {
      backgroundColor: withTiming(isActive ? colors.primary : colors.background, {duration: 150}),
    };
  });

  return <Animated.View style={[dotStyles.dot, {borderColor: colors.primary}, rStyle]} />;
}

const dotStyles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});
