import React from 'react';
import {FlatList} from 'react-native';
import {Divider} from '@ui/library';
import type {Account} from 'src/api/hooks/useAccount';
import {AccountListItem} from './AccountListItem';

type Props = {
  accounts: Account[];
  header?: React.ReactElement;
};

export function AccountsList({accounts, header}: Props) {
  return (
    <FlatList
      data={accounts}
      renderItem={({item}) => <AccountListItem account={item} />}
      keyExtractor={(item) => item.address}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={header}
    />
  );
}
