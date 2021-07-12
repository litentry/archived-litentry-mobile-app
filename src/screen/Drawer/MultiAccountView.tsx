import Identicon from '@polkadot/reactnative-identicon';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Layout, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {BalanceContext} from 'context/BalanceContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import AddressInfoBadge from 'presentational/AddressInfoBadge';
import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAccounts} from 'src/context/AccountsContext';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';

export function MultiAccountView() {
  const navigation = useNavigation();
  const {show} = useContext(BalanceContext);
  const {api} = useContext(ChainApiContext);
  const {accounts, removeAccount} = useAccounts();
  const {currentNetwork} = useContext(NetworkContext);
  const [visible, setVisible] = useState(false);

  // TODO: change this logic when adding multi account support
  const account = accounts.length > 0 ? accounts[0] : null;

  const handleMenuItemSelect = ({row}: {row: number}) => {
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
      show();
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
    <Layout>
      {account ? (
        <Layout style={styles.accountLogo}>
          <Identicon value={account.address} size={25} />
          <Layout style={styles.account}>
            <AddressInfoBadge network={currentNetwork} address={account.address} api={api} />
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
            </OverflowMenu>
          </Layout>
        </Layout>
      ) : null}
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
  account: {
    padding: standardPadding,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountLogo: {
    padding: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAccountBtn: {
    flexDirection: 'row',
  },
  address: {fontFamily: monofontFamily},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overflowMenu: {
    minWidth: 200,
  },
});
