import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import {Account, useAccounts} from 'context/AccountsContext';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {useAccountsIdentityInfo} from 'src/api/hooks/useAccountsIdentityInfo';
import globalStyles from '@ui/styles';
import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from './AccountInfoInlineTeaser';

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
            title={<Caption>{account ? account.address : 'Select account'}</Caption>}
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
          renderItem={({item}) => <AccountItem onSelect={selectAccount} accountData={item} selected={account} />}
        />
      ) : null}
    </Menu>
  );
}

type AccountItemProps = {
  onSelect: (account: Account) => void;
  accountData: AccountData;
  selected?: Account;
};

function AccountItem({onSelect, accountData, selected}: AccountItemProps) {
  const {
    account: {
      address,
      isExternal,
      meta: {name},
    },
    identity,
  } = accountData;
  return (
    <List.Item
      disabled={selected && selected.address === address}
      style={styles.item}
      onPress={() => onSelect(accountData.account)}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={String(identity.accountId)} size={25} />
        </View>
      )}
      title={() => (
        <View style={globalStyles.justifyCenter}>
          <AccountInfoInlineTeaser identity={identity} accountName={name} />
          {isExternal && <Caption>{`External`}</Caption>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
  items: {
    height: 250,
  },
  item: {
    width: 300,
  },
});
