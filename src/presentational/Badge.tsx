import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {standardPadding, colorGreen, monofontFamily} from 'src/styles';

type PropTypes = {text: string; color?: string};

function Badge(props: PropTypes) {
  const {text, color = colorGreen} = props;
  return (
    <View>
      <Text style={[styles.text, {color}]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding,
    opacity: 0.8,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: monofontFamily,
  },
});

export default Badge;
