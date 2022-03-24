import React from 'react';
import {List} from '@ui/library';
import {View} from 'react-native';
import type {Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import globalStyles from '@ui/styles';
import Identicon from '@polkadot/reactnative-identicon';
import {Account} from './Account';

type Props = {
  account: SubstrateChainAccount;
  onPress?: () => void;
};

export function AccountListItem({account, onPress}: Props) {
  return (
    <List.Item
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={account.address} size={25} />
        </View>
      )}
      title={() => (
        <View style={globalStyles.justifyCenter}>
          <Account account={account} onPress={onPress} />
        </View>
      )}
    />
  );
}
