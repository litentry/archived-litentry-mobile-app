import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Divider, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {Account, useAccounts} from 'context/index';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import LoadingView from 'presentational/LoadingView';
import {
  Padder,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  IconButton,
  List,
  useTheme,
  Portal,
  FAB,
  Provider,
  Caption,
} from 'src/packages/base_components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {CompleteNavigatorParamList} from 'src/navigation/navigation';
import {
  accountsScreen,
  addAccountScreen,
  importAccountScreen,
  mnemonicScreen,
  myAccountScreen,
} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

type CombinedData = {
  identity: IdentityInfo;
  account: Account;
};

type Props = {
  navigation: NavigationProp<CompleteNavigatorParamList, typeof accountsScreen>;
};

export function AccountsScreen({navigation}: Props) {
  const theme = useTheme();
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
    <Provider theme={theme}>
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
                <IconButton icon="badge-account-alert-outline" size={100} />
                <Padder scale={1} />
                <Text style={styles.emptyText}>No accounts added!</Text>
                <Padder scale={1.5} />
                <Text>Please add an account to take further actions.</Text>
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
          />
        )}
        <Buttons navigation={navigation} />
      </SafeView>
    </Provider>
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
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={String(identity.accountId)} size={25} />
        </View>
      )}
      title={() => (
        <View style={globalStyles.justifyCenter}>
          <AccountInfoInlineTeaser identity={identity} />
          {isExternal && <Caption>External</Caption>}
        </View>
      )}
      right={() => (
        <IconButton
          onPress={toggleFavorite}
          color={isFavorite ? theme.colors.accent : theme.colors.disabled}
          icon={isFavorite ? 'star' : 'star-outline'}
        />
      )}
    />
  );
}

const Buttons = ({navigation}: {navigation: Props['navigation']}) => {
  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}: {open: boolean}) => setState({open});
  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        visible={true}
        open={open}
        icon={open ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'import',
            label: 'Import seed',
            onPress: () => navigation.navigate(importAccountScreen),
          },
          {
            icon: 'plus',
            label: 'Add External Account',
            onPress: () => navigation.navigate(addAccountScreen),
          },
          {
            icon: 'key-plus',
            label: 'Generate New Seed',
            onPress: () => navigation.navigate(mnemonicScreen),
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
