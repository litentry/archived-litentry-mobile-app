import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import {Account as AccountType} from 'context/AccountsContext';
import globalStyles from '@ui/styles';
import Identicon from '@polkadot/reactnative-identicon';
import {Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import {Account} from './Account/Account';
import {useCouncilAccounts} from 'src/hooks/useCouncilAccounts';
import {AccountItem} from './SelectAccount';

type Props = {
  onSelect: (account: SelectedAccount) => void;
};

type SelectedAccount = {
  account: AccountType;
  accountInfo?: SubstrateChainAccount;
};

export function SelectCouncilAccount({onSelect}: Props) {
  const {colors} = useTheme();
  const {councilAccounts} = useCouncilAccounts();
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
            left={() =>
              selectedAccount?.accountInfo ? (
                <View style={globalStyles.justifyCenter}>
                  <Identicon value={selectedAccount?.account.address} size={25} />
                </View>
              ) : null
            }
          />
        </View>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={councilAccounts}
        keyExtractor={(item) => item.address}
        renderItem={({item}) => <AccountItem onSelect={selectAccount} account={item} />}
      />
    </Menu>
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
});
