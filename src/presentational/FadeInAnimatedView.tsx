import React from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

type PropTypes = {children: React.ReactNode};

function FadeInAnimatedView(props: PropTypes) {
  const {children} = props;

  return (
    <Animatable.View
      useNativeDriver
      duration={800}
      animation="fadeIn"
      iterationCount={1}
      style={styles.container}>
      {children}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({container: {flex: 1}});

export default FadeInAnimatedView;
