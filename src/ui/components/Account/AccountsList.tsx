import React from 'react';
import {FlatList} from 'react-native';
import {Divider} from '@ui/library';
import type {Account} from 'src/api/hooks/useAccount';
import {AccountListItem} from './AccountListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {memberDetailsScreen} from '@ui/navigation/routeKeys';

type Props = {
  accounts: Account[];
  header?: React.ReactElement;
};

export function AccountsList({accounts, header}: Props) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <FlatList
      data={accounts}
      renderItem={({item}) => (
        <AccountListItem
          account={item}
          onPress={() => navigation.navigate(memberDetailsScreen, {address: item.address})}
        />
      )}
      keyExtractor={(item) => item.address}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={header}
    />
  );
}
