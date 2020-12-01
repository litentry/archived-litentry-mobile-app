import React from 'react';
import {StyleSheet} from 'react-native';
import {standardPadding, monofontFamily} from 'src/styles';
import {Text} from '@ui-kitten/components';

type PropTypes = {title: string; subtitle: string};

function ModalTitle(props: PropTypes) {
  const {title, subtitle} = props;
  return (
    <Text category="s1" style={[styles.title, {fontFamily: monofontFamily}]}>
      {title}
      {subtitle && (
        <Text appearance="hint" category="c2">
          {subtitle}
        </Text>
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    paddingBottom: standardPadding * 3,
  },
});

export default ModalTitle;
