import React from 'react';
import {Linking, Platform, Text, View, StyleSheet, Image} from 'react-native';
import EmptyState from 'image/EmptyState.png';
import {Button, Modal} from '@ui/library';
import {standardPadding} from '@ui/styles';

export function NetworkConnectionError() {
  const redirectToSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
    }
  };

  return (
    <Modal visible>
      <View>
        <Image source={EmptyState} style={{height: 250}} resizeMode="contain" />
      </View>
      <View style={styles.modelContainer}>
        <Text style={styles.modelTitle}>OOPS!!</Text>
        <Text>There is no Internet connection.</Text>
        <Text>Please check your Internet connection</Text>
      </View>
      <View>
        <Button mode="outlined" onPress={redirectToSettings}>
          {' '}
          Network Settings
        </Button>
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
});
