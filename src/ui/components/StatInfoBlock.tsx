import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isString} from 'lodash';
import {Caption} from '@ui/library';
import {monofontFamily, standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  children: string | React.ReactNode;
};

function StatInfoBlock(props: PropTypes) {
  const {children, title} = props;

  return (
    <View>
      <Caption>{title}</Caption>
      {isString(children) ? (
        <Caption numberOfLines={1} style={styles.stat}>
          {children}
        </Caption>
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
