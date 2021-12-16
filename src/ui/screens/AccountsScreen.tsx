import React from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Account, useAccounts} from 'context/index';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import LoadingView from '@ui/components/LoadingView';
import {useTheme, Divider, IconButton, List, FAB, Caption, Menu, Subheading, Icon} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {
  accountsScreen,
  addAccountScreen,
  importAccountScreen,
  mnemonicScreen,
  myAccountScreen,
} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';

type CombinedData = {
  identity: IdentityInfo;
  account: Account;
};

type Props = {
  navigation: NavigationProp<CompleteNavigatorParamList, typeof accountsScreen>;
};

type SortBy = 'name' | 'favorites';

export function AccountsScreen({navigation}: Props) {
  const {accounts, networkAccounts, toggleFavorite} = useAccounts();
  const {data, isLoading} = useAccountsIdentityInfo(networkAccounts.map((account) => account.address));
  const combinedData = data?.reduce<CombinedData[]>((acc, current) => {
    const account = accounts[String(current.accountId)];
    if (!account) {
      return acc;
    }
    return [...acc, {identity: current, account}];
  }, []);

  const [sortBy, setSortBy] = React.useState<SortBy>('name');
  const sortByFunction = sortBy === 'name' ? sortByDisplayName : sortByIsFavorite;
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);

  const toAccountDetail = (address: string) => {
    navigation.navigate(myAccountScreen, {address});
  };

  const sortAccounts = (sort: SortBy) => {
    setSortBy(sort);
    setSortMenuVisible(false);
  };

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
            <AccountItem accountData={item} toggleFavorite={toggleFavorite} onPress={toAccountDetail} />
          )}
          ListHeaderComponent={
            <View style={styles.sortBy}>
              <Menu
                visible={sortMenuVisible}
                onDismiss={() => {
                  setSortMenuVisible(false);
                }}
                anchor={
                  <TouchableOpacity
                    onPress={() => {
                      setSortMenuVisible(true);
                    }}
                    style={globalStyles.rowAlignCenter}>
                    <Subheading>Sort by</Subheading>
                    <Icon name="chevron-down" size={25} />
                  </TouchableOpacity>
                }>
                <Menu.Item
                  disabled={sortBy === 'name'}
                  onPress={() => {
                    sortAccounts('name');
                  }}
                  title="Name"
                />
                <Divider />
                <Menu.Item
                  disabled={sortBy === 'favorites'}
                  onPress={() => {
                    sortAccounts('favorites');
                  }}
                  title="Favorite"
                />
              </Menu>
            </View>
          }
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={EmptyView}
        />
      )}
      <Buttons navigation={navigation} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: standardPadding * 2,
  },
  sortBy: {
    padding: standardPadding * 2,
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
  accountData,
  toggleFavorite,
  onPress,
}: {
  accountData: CombinedData;
  toggleFavorite: (address: string) => void;
  onPress: (address: string) => void;
}) {
  const theme = useTheme();
  const {
    account: {
      isExternal,
      address,
      meta: {isFavorite, name},
    },
    identity,
  } = accountData;
  return (
    <List.Item
      onPress={() => onPress(address)}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={String(identity.accountId)} size={25} />
        </View>
      )}
      title={() => (
        <View style={globalStyles.justifyCenter}>
          <AccountInfoInlineTeaser identity={identity} accountName={name} />
          {isExternal && <Caption>External</Caption>}
        </View>
      )}
      right={() => (
        <IconButton
          onPress={() => toggleFavorite(address)}
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
    <FAB.Group
      visible={true}
      open={open}
      icon={open ? 'minus' : 'plus'}
      actions={[
        {
          icon: 'import',
          label: 'Import account',
          onPress: () => navigation.navigate(importAccountScreen),
        },
        {
          icon: 'plus',
          label: 'Add External Account',
          onPress: () => navigation.navigate(addAccountScreen),
        },
        {
          icon: 'key-plus',
          label: 'Create new account',
          onPress: () => navigation.navigate(mnemonicScreen),
          small: false,
        },
      ]}
      onStateChange={onStateChange}
    />
  );
};
