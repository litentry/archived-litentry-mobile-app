import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNetwork} from '@atoms/network';
import {Icon, Text, useTheme} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {useApi} from 'context/ChainApiContext';
import {standardPadding} from '@ui/styles';

type Props = {
  onPress: () => void;
};

export function NetworkSwitch({onPress}: Props) {
  const {status} = useApi();
  const {currentNetwork} = useNetwork();
  const {colors} = useTheme();

  const isConnected = status === 'connected' || status === 'ready';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.networkSwitch, {backgroundColor: colors.background}]}>
      <View style={styles.container}>
        <Icon name={isConnected ? 'web' : 'earth-off'} size={16} color={colors.accent} />
        <Padder scale={0.3} />
        <Text style={{color: colors.accent}}>{currentNetwork.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  networkSwitch: {
    position: 'absolute',
    right: standardPadding * 1.5,
    bottom: 0,
    paddingHorizontal: standardPadding,
    paddingVertical: standardPadding / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
});
