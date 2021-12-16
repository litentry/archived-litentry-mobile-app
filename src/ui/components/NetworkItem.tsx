import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NetworkType} from 'src/types';
import {Icon, Text} from '@ui/library';
import {useTheme} from 'context/ThemeContext';
import {Padder} from '@ui/components/Padder';

type PropTypes = {item: NetworkType; isConnected: boolean};

function NetworkItem(props: PropTypes) {
  const {colors} = useTheme();
  const {item, isConnected} = props;

  return (
    <View style={styles.container}>
      <Icon name={isConnected ? 'web' : 'earth-off'} size={16} color={colors.accent} />
      <Padder scale={0.3} />
      <Text style={{color: colors.accent}}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default NetworkItem;
