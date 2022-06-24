import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {useTheme, Divider, IconButton, List, FAB, Caption, Menu, Subheading, Icon, useBottomSheet} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {accountsScreen, importAccountScreen, mnemonicScreen, myAccountScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';
import {useAccount} from 'src/api/hooks/useAccount';
import {Account} from '@ui/components/Account/Account';
import {Padder} from '@ui/components/Padder';
import {AccountsGuide} from '@ui/components/Account/AccountsGuide';
import {AddExternalAccount} from '@ui/components/Account/AddExternalAccount';
import type {Account as AppAccount} from '@polkadotApi/types';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import {useKeyring} from '@polkadotApi/useKeyring';

type Props = {
  navigation: NavigationProp<CompleteNavigatorParamList, typeof accountsScreen>;
};

type SortBy = 'name' | 'favorites';

export function AccountsScreen({navigation}: Props) {
  const {networkAccounts} = useAppAccounts();
  const [sortBy, setSortBy] = React.useState<SortBy>('name');
  const sortByFunction = sortBy === 'name' ? sortByDisplayName : sortByIsFavorite;
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);

  const {updateMeta} = useKeyring();

  const toAccountDetail = (address: string) => {
    navigation.navigate(myAccountScreen, {address});
  };

  const sortAccounts = (sort: SortBy) => {
    setSortBy(sort);
    setSortMenuVisible(false);
  };

  const {openBottomSheet: openAccountGuide, BottomSheet: AccountGuideBottomSheet} = useBottomSheet();
  const {
    closeBottomSheet: closeExternalAccount,
    openBottomSheet: openExternalAccount,
    BottomSheet: ExternalAccountBottomSheet,
  } = useBottomSheet();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton icon="information" onPress={openAccountGuide} />,
    });
  }, [navigation, openAccountGuide]);

  return (
    <SafeView edges={noTopEdges}>
      <Padder scale={1} />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={sortByFunction(networkAccounts)}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.address}
        renderItem={({item}) => <AccountItem account={item} toggleFavorite={updateMeta} onPress={toAccountDetail} />}
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
            <Padder scale={0.5} />
          </View>
        }
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={EmptyView}
      />
      <Buttons navigation={navigation} onAddAccount={openExternalAccount} />

      <AccountGuideBottomSheet>
        <AccountsGuide />
      </AccountGuideBottomSheet>

      <ExternalAccountBottomSheet onClose={Keyboard.dismiss}>
        <AddExternalAccount onClose={closeExternalAccount} />
      </ExternalAccountBottomSheet>
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
    paddingLeft: standardPadding * 2,
  },
  emptyContainer: {alignItems: 'center', justifyContent: 'center', padding: standardPadding * 2},
  emptyText: {fontWeight: 'normal'},
});

function sortByDisplayName(accounts: AppAccount[]) {
  return [...accounts].sort((a, b) => a.meta.name.localeCompare(b.meta.name));
}

function sortByIsFavorite(accounts: AppAccount[]) {
  return [...accounts].sort((a, b) => Number(b.meta.isFavorite) - Number(a.meta.isFavorite));
}

function AccountItem({
  account,
  toggleFavorite,
  onPress,
}: {
  account: AppAccount;
  toggleFavorite: (address: string, meta: Record<string, unknown>) => void;
  onPress: (address: string) => void;
}) {
  const theme = useTheme();
  const {
    address,
    meta: {isFavorite, name, isExternal},
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
          onPress={() => toggleFavorite(address, {isFavorite: !account.meta.isFavorite})}
          color={isFavorite ? theme.colors.accent : theme.colors.disabled}
          icon={isFavorite ? 'star' : 'star-outline'}
        />
      )}
    />
  );
}

type FabProps = {
  navigation: Props['navigation'];
  onAddAccount: () => void;
};

const Buttons = ({navigation, onAddAccount}: FabProps) => {
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
          onPress: onAddAccount,
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
