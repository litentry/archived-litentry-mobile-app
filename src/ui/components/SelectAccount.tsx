import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Menu, Caption, useTheme, Divider} from '@ui/library';
import {Account as AppAccount, useAccounts} from 'context/AccountsContext';
import globalStyles, {standardPadding} from '@ui/styles';
import {useAccount, Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import {AccountTeaser} from './Account/AccountTeaser';
import {} from 'react-native-gesture-handler';

type Props = {
  onSelect: (account: SelectedAccount) => void;
  accounts?: AppAccount[];
};

type SelectedAccount = {
  account: AppAccount;
  accountInfo?: SubstrateChainAccount;
};

export function SelectAccount({onSelect, accounts}: Props) {
  const {colors} = useTheme();
  const {networkAccounts} = useAccounts();
  const [selectedAccount, setSelectedAccount] = React.useState<SelectedAccount>();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectAccount = (accountSelected: SelectedAccount) => {
    setSelectedAccount(accountSelected);
    onSelect(accountSelected);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity style={[styles.anchor, {borderColor: colors.onSurface}]} onPress={openMenu}>
          {selectedAccount?.accountInfo ? (
            <AccountTeaser account={selectedAccount.accountInfo} />
          ) : (
            <Caption>{`Select account`}</Caption>
          )}
        </TouchableOpacity>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={accounts ?? networkAccounts}
        keyExtractor={(item) => item.address}
        renderItem={({item}) => <Account onSelect={selectAccount} account={item} />}
      />
    </Menu>
  );
}

type AccountProps = {
  onSelect: (account: SelectedAccount) => void;
  account: AppAccount;
};

export function Account({onSelect, account}: AccountProps) {
  const {
    isExternal,
    meta: {name},
  } = account;
  const {data: accountInfo} = useAccount(account.address);

  if (!accountInfo) {
    return null;
  }

  return (
    <View style={globalStyles.paddedContainer}>
      <AccountTeaser account={accountInfo} onPress={() => onSelect({account, accountInfo})} name={name}>
        {isExternal && <Caption style={styles.caption}>{`External`}</Caption>}
      </AccountTeaser>
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    paddingLeft: standardPadding * 1.5,
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
