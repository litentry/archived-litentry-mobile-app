import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Divider, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {Account, useAccounts} from 'context/index';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import LoadingView from 'presentational/LoadingView';
import {
  Padder,
  Button,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  IconButton,
  List,
  useTheme,
} from 'src/packages/base_components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {CompleteNavigatorParamList} from 'src/navigation/navigation';
import {addAccountScreen, importAccountScreen, mnemonicScreen, myAccountScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

type CombinedData = {
  identity: IdentityInfo;
  account: Account;
};

export function AccountsScreen({navigation}: {navigation: NavigationProp<CompleteNavigatorParamList>}) {
  const {accounts, networkAccounts, toggleFavorite} = useAccounts();
  const {data, isLoading} = useAccountsIdentityInfo(networkAccounts.map((account) => account.address));
  const combinedData = data?.reduce<CombinedData[]>((acc, current) => {
    const account = accounts[String(current.accountId)];
    if (!account) {
      return acc;
    }
    return [...acc, {identity: current, account}];
  }, []);

  const [sortBy, setSortBy] = React.useState<'name' | 'favorites'>('name');
  const sortByFunction = sortBy === 'name' ? sortByDisplayName : sortByIsFavorite;
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);

  return (
    <SafeView edges={noTopEdges}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          data={combinedData?.sort(sortByFunction)}
          showsVerticalScrollIndicator
          keyExtractor={(item) => item.account.address}
          renderItem={({item}) => (
            <AccountItem
              isExternal={item.account.isExternal}
              identity={item.identity}
              isFavorite={item.account.meta.isFavorite}
              toggleFavorite={() => toggleFavorite(item.account.address)}
              onPress={() => {
                navigation.navigate(myAccountScreen, {address: item.account.address});
              }}
            />
          )}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Image source={require('src/image/no_accounts.png')} style={styles.emptyImage} />
              <Padder scale={1} />
              <Text style={styles.emptyText}>No accounts added</Text>
              <Padder scale={1.5} />
              <Text>Please add an account to take further actions</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <OverflowMenu
                anchor={() => (
                  <TouchableOpacity
                    onPress={() => {
                      setSortMenuVisible(true);
                    }}
                    style={globalStyles.rowAlignCenter}>
                    <Text>Sort by</Text>
                    <Padder scale={0.5} />
                    <IconButton icon="chevron-down" style={globalStyles.icon} color={globalStyles.iconColor.color} />
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
              <Button icon="plus" mode="outlined" onPress={() => navigation.navigate(addAccountScreen)}>
                Add External Account
              </Button>
              <Padder scale={1} />
              <Button icon="key-plus" mode="outlined" onPress={() => navigation.navigate(mnemonicScreen)}>
                Generate New Seed
              </Button>
              <Padder scale={1} />
              <Button icon="import" mode="outlined" onPress={() => navigation.navigate(importAccountScreen)}>
                Import Seed
              </Button>
            </View>
          )}
        />
      )}
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
  emptyContainer: {alignItems: 'center', justifyContent: 'center', padding: standardPadding * 2},
  emptyText: {fontWeight: 'normal'},
  emptyImage: {width: 200, height: 200},
});

function sortByDisplayName(a: CombinedData, b: CombinedData) {
  return a.identity.display.localeCompare(b.identity.display);
}

function sortByIsFavorite(a: CombinedData, b: CombinedData) {
  return a.account.meta.isFavorite ? -1 : b.account.meta.isFavorite ? 1 : 0;
}

function AccountItem({
  isExternal,
  identity,
  isFavorite,
  toggleFavorite,
  onPress,
}: {
  identity: IdentityInfo;
  isFavorite: boolean;
  isExternal: boolean;
  toggleFavorite: () => void;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <List.Item
      onPress={onPress}
      left={(p) => (
        <View {...p}>
          <Identicon value={String(identity.accountId)} size={25} />
        </View>
      )}
      description={`${isExternal ? 'External' : ''}`}
      title={(p) => (
        <View {...p}>
          <AccountInfoInlineTeaser identity={identity} />
        </View>
      )}
      right={(p) => (
        <TouchableOpacity {...p} onPress={toggleFavorite}>
          <IconButton
            style={globalStyles.icon25}
            color={isFavorite ? theme.colors.accent : theme.colors.backdrop}
            icon={isFavorite ? 'star' : 'star-outline'}
          />
        </TouchableOpacity>
      )}
    />
  );
}
