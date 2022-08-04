import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import networkError from 'image/network/networkError.png';
import {Modal} from '@ui/library';
import {standardPadding} from '@ui/styles';
import {useNetInfo} from 'src/hooks/useNetInfo';

export function NetworkConnectionError() {
  const networkStatus = useNetInfo();

  return (
    <Modal visible={!networkStatus}>
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
