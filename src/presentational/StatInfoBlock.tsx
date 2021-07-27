import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {monofontFamily, standardPadding} from 'src/styles';
import {isString} from 'lodash';

type PropTypes = {
  title: string;
  children: string | React.ReactNode;
};

function StatInfoBlock(props: PropTypes) {
  const {children, title} = props;

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
  },
  stat: {
    textAlign: 'left',
    paddingVertical: standardPadding,
    fontSize: 16,
    color: '#ccc',
    fontFamily: monofontFamily,
  },
});

export default StatInfoBlock;
