import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {isString} from 'lodash';
import {monofontFamily, standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  children: string | React.ReactNode;
};

function StatInfoBlock(props: PropTypes) {
  const {children, title} = props;

  return (
    <View>
      <Text category="c1">{title}</Text>
      {isString(children) ? (
        <Text numberOfLines={1} style={styles.stat}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    textAlign: 'left',
    paddingVertical: standardPadding,
    fontSize: 16,
    color: '#ccc',
    fontFamily: monofontFamily,
  },
});

export default StatInfoBlock;
