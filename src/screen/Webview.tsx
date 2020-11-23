import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type PropTypes = {};

function WebviewScreen() {
  return (
    <View style={styles.container}>
      <Text>RegistrarScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WebviewScreen;
