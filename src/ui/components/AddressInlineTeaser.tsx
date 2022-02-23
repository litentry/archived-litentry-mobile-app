/** @deprecated use @ui/components/Account/AccountTeaser instead */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {Padder} from '@ui/components/Padder';
import type {SubstrateChainAccount} from 'src/generated/litentryGraphQLTypes';

type PropTypes = {
  proposer: SubstrateChainAccount;
};

function AddressInlineTeaser(props: PropTypes) {
  const {proposer} = props;
  return (
    <View style={styles.container}>
      <Identicon value={proposer.address} size={20} />
      <Padder scale={0.2} />
      {proposer && <AccountInfoInlineTeaser proposer={proposer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default AddressInlineTeaser;
