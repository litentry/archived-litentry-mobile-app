import React from 'react';
import {StyleSheet} from 'react-native';
import {monofontFamily, standardPadding} from 'src/styles';
import {isString} from 'lodash';
import {Caption, View} from 'src/packages/base_components';

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
