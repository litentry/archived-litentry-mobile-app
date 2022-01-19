import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import {Account, useAccounts} from 'context/AccountsContext';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import globalStyles, {standardPadding} from '@ui/styles';
import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from './AccountInfoInlineTeaser';
import {Padder} from '@ui/components/Padder';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';

type AccountData = {
  identity: IdentityInfo;
  account: Account;
};

type Props = {
  onSelect: (account: Account) => void;
};

export function SelectAccount({onSelect}: Props) {
  const {colors} = useTheme();
  const {networkAccounts, accounts} = useAccounts();
  const {data} = useAccountsIdentityInfo(networkAccounts.map((account) => account.address));
  const accountsData = data?.reduce<AccountData[]>((acc, current) => {
    const account = accounts[String(current.accountId)];
    if (!account) {
      return acc;
    }
    return [...acc, {identity: current, account}];
  }, []);
  const [account, setAccount] = React.useState<Account>();
  const [visible, setVisible] = React.useState(false);
  const {data: identity} = useAccountIdentityInfo(account?.address);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectAccount = (selectedAccount: Account) => {
    setAccount(selectedAccount);
    onSelect(selectedAccount);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <View style={[styles.anchor, {borderColor: colors.onSurface}]}>
          <List.Item
            title={
              account ? (
                identity ? (
                  <AccountInfoInlineTeaser identity={identity} accountName={account.meta.name} />
                ) : null
              ) : (
                <Caption>{'Select account'}</Caption>
              )
            }
            onPress={openMenu}
            right={() => <Icon name="chevron-down" />}
          />
        </View>
      }>
      {accountsData ? (
        <FlatList
          style={styles.items}
          ItemSeparatorComponent={Divider}
          data={accountsData}
          keyExtractor={(item) => item.account.address}
          renderItem={({item}) => <AccountItem onSelect={selectAccount} accountData={item} />}
        />
      ) : null}
    </Menu>
  );
}

type AccountItemProps = {
  onSelect: (account: Account) => void;
  accountData: AccountData;
};

function AccountItem({onSelect, accountData}: AccountItemProps) {
  const {
    account: {
      isExternal,
      meta: {name},
    },
    identity,
  } = accountData;
  return (
    <Menu.Item
      style={styles.menuItem}
      onPress={() => onSelect(accountData.account)}
      title={
        <View style={globalStyles.rowAlignCenter}>
          <Identicon value={String(identity.accountId)} size={25} />
          <Padder scale={0.5} />
          <View style={globalStyles.justifyCenter}>
            <AccountInfoInlineTeaser identity={identity} accountName={name} />
            {isExternal && <Caption style={styles.caption}>{`External`}</Caption>}
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
  },
  items: {
    maxHeight: 250,
  },
  menuItem: {
    marginVertical: standardPadding,
  },
  caption: {
    lineHeight: 0,
  },
});
