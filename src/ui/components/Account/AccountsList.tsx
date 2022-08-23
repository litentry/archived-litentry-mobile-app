import React from 'react';
import {View} from 'react-native';
import {Divider, FlatList} from '@ui/library';
import type {AccountInfo} from 'src/api/hooks/useAccount';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {accountScreen} from '@ui/navigation/routeKeys';
import {AccountTeaser} from './AccountTeaser';
import globalStyles from '@ui/styles';

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
        <View style={globalStyles.paddedContainer}>
          <AccountTeaser
            identiconSize={25}
            account={item.account}
            onPress={() => navigation.navigate(accountScreen, {address: item.account.address})}
          />
        </View>
      )}
      keyExtractor={(item) => item.account.address}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={header}
    />
  );
}
