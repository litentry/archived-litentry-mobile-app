import React from 'react';
import {FlatList} from 'react-native';
import {Divider} from '@ui/library';
import type {AccountInfo} from 'src/api/hooks/useAccount';
import {AccountListItem} from './AccountListItem';

type Props = {
  accounts: AccountInfo[];
  header?: React.ReactElement;
};

export function AccountsList({accounts, header}: Props) {
  return (
    <FlatList
      data={accounts}
      renderItem={({item}) => <AccountListItem account={item.account} />}
      keyExtractor={(item) => item.account.address}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={header}
    />
  );
}
