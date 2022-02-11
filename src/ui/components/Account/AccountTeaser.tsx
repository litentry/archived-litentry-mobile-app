import type {ProxyAccount} from 'src/generated/litentryGraphQLTypes';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {Padder} from '@ui/components/Padder';
import {Account} from './Account';

type Props = {
  account: ProxyAccount;
  identiconSize?: number;
};

export function AccountTeaser({account, identiconSize = 20}: Props) {
  return (
    <View style={styles.container}>
      <Identicon value={account.address} size={identiconSize} />
      <Padder scale={0.5} />
      <Account account={account} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
