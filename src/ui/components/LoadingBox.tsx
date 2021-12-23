import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {useTheme} from '@ui/library';

export function LoadingBox() {
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {toValue: 1, duration: 1200, useNativeDriver: true}),
        Animated.timing(fadeAnim, {toValue: 0.2, duration: 1200, useNativeDriver: true}),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <LoadingItem width={50} />
      <LoadingItem width={70} />
      <LoadingItem width={60} />
      <LoadingItem width={80} />
    </Animated.View>
  );
}

export function LoadingItem({width = 70}: {width?: number}) {
  const {colors} = useTheme();
  return <View style={[styles.loadingItem, {backgroundColor: colors.onSurface, width: `${width}%`}]} />;
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    opacity: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  loadingItem: {
    height: 20,
    opacity: 0.2,
    marginVertical: 2,
  },
});
