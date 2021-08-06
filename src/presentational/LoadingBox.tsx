import {useTheme} from '@ui-kitten/components';
import Padder from 'presentational/Padder';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Animated} from 'react-native';

// get random width between 15% and 85%
function getRandomWidth() {
  return `${Math.floor(Math.random() * (85 - 15 + 1)) + 15}%`;
}

export function LoadingBox() {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0.2)).current;
  const [textWidths] = useState([getRandomWidth(), getRandomWidth(), getRandomWidth(), getRandomWidth()]);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {toValue: 1, duration: 1200, useNativeDriver: true}),
        Animated.timing(fadeAnim, {toValue: 0.2, duration: 1200, useNativeDriver: true}),
      ]),
    ).start();
  }, [fadeAnim]);

  const textBackground = theme['text-basic-color'];

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
      {textWidths.map((textWidth, key) => (
        <View key={key} style={[styles.textSubstitue, {backgroundColor: textBackground, width: textWidth}]} />
      ))}
    </Animated.View>
  );
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
  textSubstitue: {
    height: 20,
    opacity: 0.3,
    marginTop: 5,
    marginBottom: 5,
  },
});
