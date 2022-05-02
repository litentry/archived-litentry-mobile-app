import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Account as AppAccount, useAccounts} from 'context/AccountsContext';
import {useAccount, Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import {Menu, Caption, Divider, TextInput, Text, Icon, useTheme} from '@ui/library';
import globalStyles from '@ui/styles';
import {AccountTeaser} from './Account/AccountTeaser';

type Props = {
  onSelect: (account: SelectedAccount) => void;
  accounts?: AppAccount[];
};

type SelectedAccount = {
  account: AppAccount;
  accountInfo?: SubstrateChainAccount;
};

export function SelectAccount({onSelect, accounts}: Props) {
  const {networkAccounts} = useAccounts();
  const [selectedAccount, setSelectedAccount] = React.useState<SelectedAccount>();
  const [visible, setVisible] = React.useState(false);
  const {colors} = useTheme();

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
      style={styles.menu}
      anchor={
        <TextInput
          mode="outlined"
          render={(_props) => {
            return (
              <TouchableOpacity style={styles.anchorContent} onPress={openMenu}>
                {selectedAccount?.accountInfo ? (
                  <AccountTeaser account={selectedAccount.accountInfo} />
                ) : (
                  <Text style={[styles.placeholder, {color: colors.placeholder}]}>{`Select account`}</Text>
                )}
                <Icon name="chevron-down" />
              </TouchableOpacity>
            );
          }}
        />
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
  menu: {
    width: '80%',
  },
  anchorContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  items: {
    maxHeight: 250,
  },
  placeholder: {fontSize: 16},
  caption: {
    lineHeight: 0,
  },
});
