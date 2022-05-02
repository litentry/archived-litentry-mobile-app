import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export function SuccessAnimation() {
  return (
    <LottieView
      autoPlay
      style={styles.view}
      source={require('../../../assets/lottieFiles/success_animation.json')}
      loop={false}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    width: '50%',
  },
});
