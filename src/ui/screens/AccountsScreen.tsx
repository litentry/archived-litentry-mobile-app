import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
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
import type {AccountMeta, KeyringAccount} from 'polkadot-api';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import {useKeyring} from '@polkadotApi/useKeyring';
import {Identicon} from '@ui/components/Identicon';

type Props = {
  navigation: NavigationProp<CompleteNavigatorParamList, typeof accountsScreen>;
};

type SortBy = 'name' | 'favorites';

export function AccountsScreen({navigation}: Props) {
  const {networkAccounts} = useAppAccounts();
  const [sortBy, setSortBy] = React.useState<SortBy>('name');
  const sortByFunction = sortBy === 'name' ? sortByDisplayName : sortByIsFavorite;
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);

  const {updateAccountMeta} = useKeyring();

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

  const HeaderRight = React.useCallback(
    () => <IconButton icon="information" onPress={openAccountGuide} />,
    [openAccountGuide],
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
    // TODO: https://github.com/gorhom/react-native-bottom-sheet/issues/972
    closeExternalAccount();
  }, [navigation, HeaderRight, closeExternalAccount]);

  return (
    <SafeView edges={noTopEdges}>
      <Padder scale={1} />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={sortByFunction(networkAccounts)}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.address}
        renderItem={({item}) => (
          <AccountItem account={item} toggleFavorite={updateAccountMeta} onPress={toAccountDetail} />
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

      <ExternalAccountBottomSheet>
        <AddExternalAccount onClose={closeExternalAccount} />
      </ExternalAccountBottomSheet>
    </SafeView>
  );
}

function sortByDisplayName(accounts: KeyringAccount[]) {
  return [...accounts].sort((a, b) => a.meta.name.localeCompare(b.meta.name));
}

function sortByIsFavorite(accounts: KeyringAccount[]) {
  return [...accounts].sort((a, b) => Number(b.meta.isFavorite) - Number(a.meta.isFavorite));
}

type AccountItemProps = {
  account: KeyringAccount;
  toggleFavorite: (account: {address: string; meta: AccountMeta}) => void;
  onPress: (address: string) => void;
};

function AccountItem({account, toggleFavorite, onPress}: AccountItemProps) {
  const {colors} = useTheme();
  const {address, meta} = account;
  const {data: accountInfo} = useAccount(address);

  const ItemLeft = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Identicon value={address} size={25} />
      </View>
    ),
    [address],
  );

  const ItemRight = React.useCallback(() => {
    return (
      <IconButton
        onPress={() => toggleFavorite({address, meta: {...meta, isFavorite: !meta.isFavorite}})}
        color={meta.isFavorite ? colors.accent : colors.disabled}
        icon={meta.isFavorite ? 'star' : 'star-outline'}
      />
    );
  }, [address, meta, colors, toggleFavorite]);

  return (
    <List.Item
      onPress={() => onPress(address)}
      left={ItemLeft}
      title={
        <View style={globalStyles.justifyCenter}>
          {accountInfo && <Account account={accountInfo} name={meta.name} />}
          {meta.isExternal && <Caption>External</Caption>}
        </View>
      }
      right={ItemRight}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: standardPadding * 2,
  },
  emptyText: {
    fontWeight: 'normal',
  },
});
