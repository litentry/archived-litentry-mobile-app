import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {standardPadding, monofontFamily} from 'src/styles';

const styles = StyleSheet.create({
  text: {
    fontFamily: monofontFamily,
    paddingBottom: standardPadding,
  },
});

function FormLabel({text}: {text: string}) {
  return (
    <Text category="label" appearance="hint" style={styles.text}>
      {text}
    </Text>
  );
}

export default FormLabel;
