import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {NetworkType} from 'src/types';
import {standardPadding} from 'src/styles';

type PropTypes = {item: NetworkType};

function NetworkItem(props: PropTypes) {
  const {item} = props;
  return (
    <Layout style={styles.container}>
      <View style={[styles.dot, {backgroundColor: item.color}]} />
      <Text category="label">{item.name}</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: standardPadding / 2,
  },
});

export default NetworkItem;
