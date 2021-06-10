import React from 'react';
import BN from 'bn.js';
import {StyleSheet, View} from 'react-native';
import AddressInlineTeaser from './AddressInlineTeaser';
import {Text} from '@ui-kitten/components';
import {formatBalance} from '@polkadot/util';
import {Balance} from '@polkadot/types/interfaces';
import {standardPadding} from 'src/styles';

type PropTypes = {
  address: string;
  fee: Balance | BN;
  index: number;
};

function RegistrarTeaser(props: PropTypes) {
  const {address, fee, index} = props;

  return (
    <View style={styles.container}>
      <Text category="s1">{`#${index}`}</Text>
      <AddressInlineTeaser address={address} />
      <Text category="s1">{formatBalance(fee)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: standardPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RegistrarTeaser;
