import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {standardPadding, colorGreen} from 'src/styles';

type PropTypes = {text: string; color?: string};

function Badge(props: PropTypes) {
  const {text, color = colorGreen} = props;
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding,
    opacity: 0.75,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
