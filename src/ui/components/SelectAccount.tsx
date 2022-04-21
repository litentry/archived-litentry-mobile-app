import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Menu, Caption, useTheme, Divider} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import type {Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import type {Registrar} from 'src/api/hooks/useRegistrarsSummary';
import {AccountTeaser} from './Account/AccountTeaser';

type Account = SubstrateChainAccount | Registrar;

type Props = {
  onSelect: (account: Account) => void;
  accounts: Account[];
  renderItem?: (item: Registrar, onPress: () => void) => JSX.Element;
  placeholder?: string;
};

export function SelectAccount({onSelect, accounts, renderItem, placeholder = 'Select account'}: Props) {
  const {colors} = useTheme();
  const [selectedAccount, setSelectedAccount] = React.useState<Account>();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectAccount = (account: Account) => {
    setSelectedAccount(account);
    onSelect(account);
    closeMenu();
  };

  const renderSelectedAccount = React.useCallback(() => {
    switch (selectedAccount?.__typename) {
      case 'SubstrateChainAccount':
        return <AccountTeaser account={selectedAccount} />;

      case 'SubstrateChainRegistrar':
        return <AccountTeaser account={selectedAccount.account} />;

      default:
        return <Caption>{placeholder}</Caption>;
    }
  }, [selectedAccount, placeholder]);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity style={[styles.anchor, {borderColor: colors.onSurface}]} onPress={openMenu}>
          {renderSelectedAccount()}
        </TouchableOpacity>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={accounts}
        keyExtractor={(item) => item.address}
        renderItem={({item}) => {
          if (item.__typename === 'SubstrateChainAccount') {
            return (
              <View style={globalStyles.paddedContainer}>
                <AccountTeaser account={item} onPress={() => selectAccount(item)} />
              </View>
            );
          } else if (renderItem && item.__typename === 'SubstrateChainRegistrar') {
            return renderItem(item, () => selectAccount(item.account));
          }

          return null;
        }}
      />
    </Menu>
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
