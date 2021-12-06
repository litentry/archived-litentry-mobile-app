import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import {standardPadding, monofontFamily} from '@ui/styles';

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
