import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Account as AccountType, useAccounts} from 'context/index';
import {useTheme, Divider, IconButton, List, FAB, Caption} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
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
import {useAccount} from 'src/api/hooks/useAccount';
import {Account} from '@ui/components/Account/Account';
import {Padder} from '@ui/components/Padder';

type Props = {
  navigation: NavigationProp<CompleteNavigatorParamList, typeof accountsScreen>;
};

// @TODO: Add sorting options
// https://github.com/litentry/litentry-app/issues/942

// type SortBy = 'name' | 'favorites';

export function AccountsScreen({navigation}: Props) {
  const {networkAccounts, toggleFavorite} = useAccounts();

  // const [sortBy, setSortBy] = React.useState<SortBy>('name');
  // const sortByFunction = sortBy === 'name' ? sortByDisplayName : sortByIsFavorite;
  // const [sortMenuVisible, setSortMenuVisible] = React.useState(false);

  const toAccountDetail = (address: string) => {
    navigation.navigate(myAccountScreen, {address});
  };

  // const sortAccounts = (sort: SortBy) => {
  //   setSortBy(sort);
  //   setSortMenuVisible(false);
  // };

  return (
    <SafeView edges={noTopEdges}>
      <Padder scale={1} />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={networkAccounts}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.address}
        renderItem={({item}) => (
          <AccountItem account={item} toggleFavorite={toggleFavorite} onPress={toAccountDetail} />
        )}
        // ListHeaderComponent={
        //   <View style={styles.sortBy}>
        //     <Menu
        //       visible={sortMenuVisible}
        //       onDismiss={() => {
        //         setSortMenuVisible(false);
        //       }}
        //       anchor={
        //         <TouchableOpacity
        //           onPress={() => {
        //             setSortMenuVisible(true);
        //           }}
        //           style={globalStyles.rowAlignCenter}>
        //           <Subheading>Sort by</Subheading>
        //           <Icon name="chevron-down" size={25} />
        //         </TouchableOpacity>
        //       }>
        //       <Menu.Item
        //         disabled={sortBy === 'name'}
        //         onPress={() => {
        //           sortAccounts('name');
        //         }}
        //         title="Name"
        //       />
        //       <Divider />
        //       <Menu.Item
        //         disabled={sortBy === 'favorites'}
        //         onPress={() => {
        //           sortAccounts('favorites');
        //         }}
        //         title="Favorite"
        //       />
        //     </Menu>
        //   </View>
        // }
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={EmptyView}
      />
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

// function sortByDisplayName(a: Account, b: Account) {
//   return a.identity.display.localeCompare(b.identity.display);
// }

// function sortByIsFavorite(a: CombinedData, b: CombinedData) {
//   return a.account.meta.isFavorite ? -1 : b.account.meta.isFavorite ? 1 : 0;
// }

function AccountItem({
  account,
  toggleFavorite,
  onPress,
}: {
  account: AccountType;
  toggleFavorite: (address: string) => void;
  onPress: (address: string) => void;
}) {
  const theme = useTheme();
  const {
    address,
    isExternal,
    meta: {isFavorite, name},
  } = account;
  const {data: accountInfo} = useAccount(address);

  return (
    <List.Item
      onPress={() => onPress(address)}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={address} size={25} />
        </View>
      )}
      title={() => (
        <View style={globalStyles.justifyCenter}>
          {accountInfo && <Account account={accountInfo} name={name} />}
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
