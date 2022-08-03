import React from 'react';
import {Linking, Text, View, StyleSheet, Image, Platform} from 'react-native';
import networkError from 'image/network/networkError.png';
import {Button, Modal} from '@ui/library';
import {standardPadding} from '@ui/styles';
import {useNetInfo} from '@react-native-community/netinfo';

export function NetworkConnectionError() {
  const networkStatus = useNetInfo();

  return (
    <Modal visible={!networkStatus.isConnected}>
      <View style={styles.modelContainer}>
        <Image source={networkError} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.modelContainer}>
        <Text style={styles.modelTitle}>OOPS!!</Text>
        <Text>There is no Internet connection.</Text>
        <Text>Please check your Internet connection</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    padding: standardPadding * 2,
    alignItems: 'center',
  },
  modelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: standardPadding * 2,
  },
  image: {
    height: 200,
  },
});
