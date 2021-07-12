import Identicon from '@polkadot/reactnative-identicon';
import {CompositeNavigationProp, NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, Layout, ListItem, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import AddressInfoBadge from 'presentational/AddressInfoBadge';
import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAccounts, Account} from 'src/context/AccountsContext';
import {AppStackParamList, DashboardStackParamList} from 'src/navigation/navigation';
import {balanceScreen, myIdentityScreen} from 'src/navigation/routeKeys';
import globalStyles from 'src/styles';
import {SupportedNetworkType} from 'src/types';

export function MultiAccountView() {
  const navigation = useNavigation();
  const {accounts, removeAccount} = useAccounts();

  return (
    <Layout>
      {accounts.map((account) => (
        <AccountItem key={account.address} account={account} removeAccount={removeAccount} />
      ))}
      <View style={styles.addAccountBtn}>
        <Button
          onPress={() => navigation.navigate('AddAccountScreen')}
          accessoryLeft={(p) => <Icon {...p} name="plus-outline" />}
          appearance="ghost"
          size="small">
          Add Account
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  addAccountBtn: {
    flexDirection: 'row',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overflowMenu: {
    minWidth: 200,
  },
});

function AccountItem({
  account,
  removeAccount,
}: {
  account: Account;
  removeAccount: (network: SupportedNetworkType, acc: Account) => void;
}) {
  const {api} = useContext(ChainApiContext);
  const {currentNetwork} = useContext(NetworkContext);
  const [visible, setVisible] = useState(false);
  const navigation =
    useNavigation<
      CompositeNavigationProp<NavigationProp<AppStackParamList>, NavigationProp<DashboardStackParamList>>
    >();

  const handleMenuItemSelect = ({row}: {row: number}) => {
    setVisible(false);
    if (row === 0) {
      Alert.alert(
        'Confirm Account deletion',
        `Sure to delete account ${account?.address}`,
        [
          {
            text: 'Yes',
            onPress: () => {
              setVisible(false);
              if (account) {
                removeAccount(currentNetwork.key, account);
              }
            },
          },
          {
            text: 'Cancel',
            onPress: () => setVisible(false),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }

    if (row === 1) {
      navigation.navigate(balanceScreen, {address: account.address});
    }
    if (row === 2) {
      navigation.navigate(myIdentityScreen, {address: account.address});
    }
  };

  const renderOptions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <Icon name="md-options" pack="ionic" style={[globalStyles.inlineIconDimension, globalStyles.iconColor]} />
      </TouchableOpacity>
    );
  };

  return (
    <ListItem
      accessoryLeft={() => <Identicon value={account.address} size={25} />}
      accessoryRight={() => (
        <OverflowMenu
          anchor={renderOptions}
          placement="bottom end"
          backdropStyle={styles.backdrop}
          style={styles.overflowMenu}
          visible={visible}
          onSelect={handleMenuItemSelect}
          onBackdropPress={() => setVisible(false)}>
          <MenuItem
            title="Remove Account"
            accessoryLeft={(iconProps) => <Icon name="trash-2-outline" {...iconProps} />}
          />
          <MenuItem
            title="Show balance"
            accessoryLeft={(iconProps) => <Icon {...iconProps} name="credit-card-outline" />}
          />
          <MenuItem
            title="Set identity"
            accessoryLeft={(iconProps) => <Icon {...iconProps} name="person-add-outline" />}
          />
        </OverflowMenu>
      )}
      title={() => <AddressInfoBadge network={currentNetwork} address={account.address} api={api} />}
    />
  );
}
