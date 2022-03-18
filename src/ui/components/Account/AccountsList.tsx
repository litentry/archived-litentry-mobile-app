import React from 'react';
import {FlatList} from 'react-native';
import {Divider} from '@ui/library';
import type {NestedAccount} from 'src/api/hooks/useAccount';
import {AccountListItem} from './AccountListItem';

type Props = {
  accounts: NestedAccount[];
  header?: React.ReactElement;
};

export function AccountsList({accounts, header}: Props) {
  return (
    <FlatList
      data={accounts}
      renderItem={({item}) => <AccountListItem account={item.account} />}
      keyExtractor={(item) => item.address}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={header}
    />
  );
}
