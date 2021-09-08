import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Button, Divider, Icon, ListItem, MenuItem, OverflowMenu, Text, useTheme} from '@ui-kitten/components';
import {Account, useAccounts} from 'context/AccountsContext';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {CompleteNavigatorParamList} from 'src/navigation/navigation';
import {addAccountScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

type CombinedData = {
  identity: IdentityInfo;
  account: Account;
};

export function AccountsScreen({navigation}: {navigation: NavigationProp<CompleteNavigatorParamList>}) {
  const {accounts, toggleFavorite} = useAccounts();
  const {data} = useAccountsIdentityInfo(accounts.map(({address}) => address));
  const combinedData = data?.reduce<CombinedData[]>((acc, current) => {
    const account = accounts.find((a) => a.address === String(current.accountId));
    if (!account) {
      return acc;
    }
    return [
      ...acc,
      {
        identity: current,
        account,
      },
    ];
  }, []);

  const [sortBy, setSortBy] = React.useState<'name' | 'favorites'>('name');
  const sortByFunction = sortBy === 'name' ? sortByDisplayName : sortByIsFavorite;
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={combinedData?.sort(sortByFunction)}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.account.address}
        renderItem={({item}) => (
          <AccountItem
            identity={item.identity}
            isFavorite={item.account.isFavorite}
            toggleFavorite={() => toggleFavorite(item.account.address)}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <OverflowMenu
              anchor={() => (
                <TouchableOpacity
                  onPress={() => {
                    setSortMenuVisible(true);
                  }}
                  style={globalStyles.rowAlignCenter}>
                  <Text category="c1">Sort by</Text>
                  <Padder scale={0.5} />
                  <Icon
                    name="arrow-ios-downward-outline"
                    style={globalStyles.icon}
                    fill={globalStyles.iconColor.color}
                  />
                </TouchableOpacity>
              )}
              placement="bottom end"
              style={styles.overflowMenu}
              visible={sortMenuVisible}
              onSelect={({row}: {row: number}) => {
                setSortMenuVisible(false);
                switch (row) {
                  case 0:
                    setSortBy('name');
                    break;
                  case 1:
                    setSortBy('favorites');
                    break;
                }
              }}
              onBackdropPress={() => setSortMenuVisible(false)}>
              <MenuItem title="Name" style={sortBy === 'name' && styles.selectedItem} />
              <MenuItem title="Favorite" style={sortBy === 'favorites' && styles.selectedItem} />
            </OverflowMenu>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Button
              status="basic"
              accessoryLeft={(p) => <Icon {...p} name="plus-circle-outline" />}
              onPress={() => navigation.navigate(addAccountScreen)}>
              Add Account
            </Button>
          </View>
        )}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: standardPadding * 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  footer: {
    marginTop: standardPadding * 4,
  },
  selectedItem: {
    backgroundColor: '#dde',
  },
  overflowMenu: {
    minWidth: 200,
  },
});

function sortByDisplayName(a: CombinedData, b: CombinedData) {
  return a.identity.display.localeCompare(b.identity.display);
}

function sortByIsFavorite(a: CombinedData, b: CombinedData) {
  return a.account.isFavorite ? -1 : b.account.isFavorite ? 1 : 0;
}

function AccountItem({
  identity,
  isFavorite,
  toggleFavorite,
}: {
  identity: IdentityInfo;
  isFavorite: boolean;
  toggleFavorite: () => void;
}) {
  const theme = useTheme();

  return (
    <ListItem
      accessoryLeft={(p) => (
        <View {...p}>
          <Identicon value={String(identity.accountId)} size={25} />
        </View>
      )}
      title={(p) => (
        <View {...p}>
          <AccountInfoInlineTeaser identity={identity} />
        </View>
      )}
      accessoryRight={(p) => (
        <TouchableOpacity {...p} onPress={toggleFavorite}>
          <Icon
            style={globalStyles.icon25}
            fill={isFavorite ? theme['color-warning-500'] : theme['color-basic-500']}
            name={isFavorite ? 'star' : 'star-outline'}
          />
        </TouchableOpacity>
      )}
    />
  );
}
