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
      <Text category="label">{item.name}</Text>
      <View style={[styles.connectionIndicator, isConnected ? styles.connected : styles.notConnected]} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionIndicator: {
    marginLeft: standardPadding / 2,
    marginTop: 2,
    width: 4,
    height: 4,
    borderRadius: 10,
  },
  connectedText: {
    color: 'green',
  },
  notConnectedText: {
    color: 'red',
  },
  connected: {
    backgroundColor: 'green',
  },
  notConnected: {
    backgroundColor: 'red',
  },
});

export default NetworkItem;
