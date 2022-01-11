import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isString} from 'lodash';
import {Caption} from '@ui/library';

type PropTypes = {
  title: string;
  children: string | React.ReactNode;
};

function StatInfoBlock(props: PropTypes) {
  const {children, title} = props;

  return (
    <View>
      <Caption>{title}</Caption>
      {isString(children) ? <Caption style={styles.stat}>{children}</Caption> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    textAlign: 'left',
    fontSize: 16,
  },
});

export default StatInfoBlock;
