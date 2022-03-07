import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import {Account as AccountType, useAccounts} from 'context/AccountsContext';
import globalStyles, {standardPadding} from '@ui/styles';
import Identicon from '@polkadot/reactnative-identicon';
import {Padder} from '@ui/components/Padder';
import {useAccount, Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import {Account} from './Account/Account';

type Props = {
  onSelect: (account: AccountType) => void;
};

type SelectedAccount = {
  account: AccountType;
  accountInfo?: SubstrateChainAccount;
};

export function SelectAccount({onSelect}: Props) {
  const {colors} = useTheme();
  const {networkAccounts} = useAccounts();
  const [selectedAccount, setSelectedAccount] = React.useState<SelectedAccount>();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectAccount = (accountSelected: SelectedAccount) => {
    setSelectedAccount(accountSelected);
    onSelect(accountSelected.account);
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
              selectedAccount?.accountInfo ? (
                <Account account={selectedAccount.accountInfo} name={selectedAccount.account.meta.name} />
              ) : (
                <Caption>{`Select account`}</Caption>
              )
            }
            onPress={openMenu}
            right={() => <Icon name="chevron-down" />}
          />
        </View>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={networkAccounts}
        keyExtractor={(item) => item.address}
        renderItem={({item}) => <AccountItem onSelect={selectAccount} account={item} />}
      />
    </Menu>
  );
}

type AccountItemProps = {
  onSelect: (account: SelectedAccount) => void;
  account: AccountType;
};

function AccountItem({onSelect, account}: AccountItemProps) {
  const {
    isExternal,
    meta: {name},
  } = account;
  const {data: accountInfo} = useAccount(account.address);

  return (
    <Menu.Item
      style={styles.menuItem}
      onPress={() => onSelect({account, accountInfo})}
      title={
        <View style={globalStyles.rowAlignCenter}>
          <Identicon value={account.address} size={25} />
          <Padder scale={0.5} />
          <View style={globalStyles.justifyCenter}>
            {accountInfo && <Account account={accountInfo} name={name} />}
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
