import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useAccount, Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import {Menu, Divider, TextInput, Text, Icon} from '@ui/library';
import globalStyles from '@ui/styles';
import {AccountTeaser} from './Account/AccountTeaser';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import type {KeyringAccount} from 'polkadot-api';

type Props = {
  onSelect: (account: SelectedAccount) => void;
  accounts?: KeyringAccount[];
};

type SelectedAccount = {
  account: KeyringAccount;
  accountInfo?: SubstrateChainAccount;
};

export function SelectAccount({onSelect, accounts}: Props) {
  const {networkAccounts} = useAppAccounts();
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
      style={styles.menu}
      anchor={
        <TextInput
          mode="outlined"
          dense
          render={(_props) => {
            return (
              <TouchableOpacity style={styles.anchorContent} onPress={openMenu}>
                {selectedAccount?.accountInfo ? (
                  <AccountTeaser account={selectedAccount.accountInfo} />
                ) : (
                  <Text style={styles.placeholder}>{`Select account`}</Text>
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
        ListEmptyComponent={<EmptyAccounts />}
      />
    </Menu>
  );
}

function EmptyAccounts() {
  return (
    <View style={globalStyles.paddedContainer}>
      <Text>There are no accounts registered.</Text>
    </View>
  );
}

type AccountProps = {
  onSelect: (account: SelectedAccount) => void;
  account: KeyringAccount;
};

export function Account({onSelect, account}: AccountProps) {
  const {
    meta: {name, isExternal},
  } = account;
  const {data: accountInfo} = useAccount(account.address);

  if (!accountInfo) {
    return null;
  }

  return (
    <View style={globalStyles.paddedContainer}>
      <AccountTeaser account={accountInfo} onPress={() => onSelect({account, accountInfo})} name={name}>
        {isExternal && <Text variant="bodySmall" style={styles.caption}>{`External`}</Text>}
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
