import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {NetworkType} from 'src/types';
import {standardPadding} from 'src/styles';

type PropTypes = {item: NetworkType; isConnected: boolean};

function NetworkItem(props: PropTypes) {
  const {item, isConnected} = props;
  return (
    <Layout style={styles.container}>
      <View style={[styles.dot, {backgroundColor: item.color}]} />
      <Text category="label">{item.name}</Text>
      <View
        style={[
          styles.connectionIndicator,
          isConnected ? styles.connected : styles.notConnected,
        ]}
      />
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
  connectionIndicator: {
    marginLeft: standardPadding / 2,
    width: 4,
    height: 4,
    borderRadius: 10,
  },
  connected: {
    backgroundColor: 'green',
  },
  notConnected: {
    backgroundColor: 'red',
  },
});

export default NetworkItem;
