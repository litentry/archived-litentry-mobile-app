import React from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';
import {Text} from '@ui-kitten/components';

type PropTypes = {title: string; subtitle?: string};

function ModalTitle(props: PropTypes) {
  const {title, subtitle = ''} = props;

  return (
    <View style={[globalStyles.rowContainer, globalStyles.centeredContainer, styles.container]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="middle"
        selectable
        category="s1"
        style={[styles.title, {fontFamily: monofontFamily}]}>
        {title}
      </Text>
      {subtitle ? (
        <Text appearance="hint" category="c2">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    maxWidth: '50%',
    alignSelf: 'center',
    fontSize: 18,
  },
  container: {
    paddingBottom: standardPadding * 2,
  },
});

export default ModalTitle;
