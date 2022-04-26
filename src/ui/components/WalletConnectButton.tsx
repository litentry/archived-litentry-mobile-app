import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Subheading} from '@ui/library';
import {standardPadding} from '@ui/styles';

export function WalletConnectButton({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Subheading style={styles.title}>{title}</Subheading>
      <Image source={require('../../image/walletconnect-logo.png')} resizeMode="contain" style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3182CE',
    borderRadius: 8,
    height: 45,
  },
  title: {
    color: '#3182CE',
  },
  image: {
    height: 25,
    width: 25,
    marginLeft: standardPadding,
  },
});
