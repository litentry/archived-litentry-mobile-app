import React from 'react';
import {Linking, Platform} from 'react-native';
import {Banner} from 'react-native-paper';

export function NetworkConnectionError() {
  const redirectToSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
    }
  };

  return (
    <Banner
      visible={true}
      actions={[
        {
          label: 'Settings',
          onPress: () => redirectToSettings(),
        },
      ]}>
      There is an issue in the network connection. Please check your network connection settings
    </Banner>
  );
}
