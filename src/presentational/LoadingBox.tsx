import {useTheme} from '@ui-kitten/components';
import Padder from 'presentational/Padder';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Animated} from 'react-native';

export function LoadingBox() {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {toValue: 1, duration: 1500, useNativeDriver: true}),
        Animated.timing(fadeAnim, {toValue: 0, duration: 1500, useNativeDriver: true}),
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
      <View style={[styles.textSubstitue, {backgroundColor: theme['text-basic-color'], width: '90%'}]} />
      <Padder scale={0.5} />
      <View style={[styles.textSubstitue, {backgroundColor: theme['text-basic-color'], width: '30%'}]} />
      <Padder scale={0.5} />
      <View style={[styles.textSubstitue, {backgroundColor: theme['text-basic-color'], width: '50%'}]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    // backgroundColor: '#fff',
    opacity: 0.3,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  textSubstitue: {
    height: 20,
    opacity: 0.3,
  },
});
