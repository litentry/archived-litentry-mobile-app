import React from 'react';
import {FlatList} from 'react-native';
import {Divider} from '@ui/library';
import type {AccountInfo} from 'src/api/hooks/useAccount';
import {AccountListItem} from './AccountListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {memberDetailsScreen} from '@ui/navigation/routeKeys';

type Props = {
  accounts: AccountInfo[];
  header?: React.ReactElement;
};

export function AccountsList({accounts, header}: Props) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <FlatList
      data={accounts}
      renderItem={({item}) => (
        <AccountListItem
          account={item.account}
          onPress={() => navigation.navigate(memberDetailsScreen, {address: item.address})}
        />
      )}
      keyExtractor={(item) => item.account.address}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={header}
    />
  );
}
