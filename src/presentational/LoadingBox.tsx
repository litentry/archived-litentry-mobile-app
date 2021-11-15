import {useTheme} from '@ui-kitten/components';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Animated} from 'react-native';

export function LoadingBox() {
  const theme = useTheme();
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
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          borderColor: theme['border-basic-color-2'],
          backgroundColor: theme['background-basic-color-2'],
        },
      ]}>
      <LoadingItem width={50} />
      <LoadingItem width={70} />
      <LoadingItem width={60} />
      <LoadingItem width={80} />
    </Animated.View>
  );
}

export function LoadingItem({width = 70}: {width?: number}) {
  const theme = useTheme();
  const textBackground = theme['text-basic-color'];

  return <View style={[styles.loadingItem, {backgroundColor: textBackground, width: `${width}%`}]} />;
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    opacity: 0.3,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  loadingItem: {
    height: 20,
    opacity: 0.2,
    marginVertical: 2,
  },
});
