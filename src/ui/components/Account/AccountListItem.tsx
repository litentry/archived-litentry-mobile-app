import React from 'react';
import {List} from '@ui/library';
import {View} from 'react-native';
import type {Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import globalStyles from '@ui/styles';
import Identicon from '@polkadot/reactnative-identicon';
import {Account} from './Account';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {memberDetailsScreen} from '@ui/navigation/routeKeys';

type Props = {
  account: SubstrateChainAccount;
};

export function AccountListItem({account}: Props) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <List.Item
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={account.address} size={25} />
        </View>
      )}
      title={() => (
        <View style={globalStyles.justifyCenter}>
          <Account
            account={account}
            onPress={() => navigation.navigate(memberDetailsScreen, {address: account?.address})}
          />
        </View>
      )}
    />
  );
}
