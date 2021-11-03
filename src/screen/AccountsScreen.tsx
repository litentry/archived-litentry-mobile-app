import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Button, Divider, Icon, ListItem, MenuItem, OverflowMenu, Text, useTheme} from '@ui-kitten/components';
import {Account, useAccounts} from 'context/AccountsContext';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {CompleteNavigatorParamList} from 'src/navigation/navigation';
import {addAccountScreen, importAccountScreen, myAccountScreen, mnemonicScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';
import {keyring} from '@polkadot/ui-keyring';
import {NetworkContext} from 'context/NetworkContext';

type CombinedData = {
  identity: IdentityInfo;
  account: Account;
};

export function AccountsScreen({navigation}: {navigation: NavigationProp<CompleteNavigatorParamList>}) {
  const {accounts, setAccountFavorite} = useAccounts();
  const {currentNetwork} = React.useContext(NetworkContext);
  const {data, isLoading} = useAccountsIdentityInfo(accounts.map(({address}) => address));
  const combinedData = data?.reduce<CombinedData[]>((acc, current) => {
    const account = accounts.find((a) => a.address === String(current.accountId));
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
              toggleFavorite={() => setAccountFavorite(item.account.address, !item.account.meta.isFavorite)}
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
              <Text style={styles.emptyText} status="basic" category="h4">
                No accounts added
              </Text>
              <Padder scale={1.5} />
              <Text category="c1">Please add an account to take further actions</Text>
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
              <Padder scale={1} />
              <Button
                status="basic"
                accessoryLeft={(p) => <Icon {...p} name="plus-circle-outline" />}
                onPress={() => navigation.navigate(mnemonicScreen)}>
                Create Account
              </Button>
              <Padder scale={1} />
              <Button
                status="basic"
                onPress={() => navigation.navigate(importAccountScreen)}
                accessoryLeft={(p) => <Icon {...p} name="download-outline" />}>
                Import account
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
    <ListItem
      onPress={onPress}
      accessoryLeft={(p) => (
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
