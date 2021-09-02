import React, {useContext, useState} from 'react';
import {Alert, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {CompositeNavigationProp, NavigationProp, useNavigation} from '@react-navigation/native';
import {Icon, Layout, ListItem, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import AddressInfoBadge from 'presentational/AddressInfoBadge';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {Account, useAccounts} from 'src/context/AccountsContext';
import {AppStackParamList, DashboardStackParamList} from 'src/navigation/navigation';
import {addAccountScreen, balanceScreen, myIdentityScreen, registerSubIdentitiesScreen} from 'src/navigation/routeKeys';
import globalStyles, {colorGray} from 'src/styles';
import {SupportedNetworkType} from 'src/types';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useQueryClient} from 'react-query';

export function MultiAccountView() {
  const navigation = useNavigation();
  const {accounts, removeAccount} = useAccounts();

  return (
    <Layout level="2" style={styles.container}>
      <FlatList
        data={accounts}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.address}
        renderItem={({item: account}) => (
          <AccountItem key={account.address} account={account} removeAccount={removeAccount} />
        )}
      />
      <ListItem
        style={styles.transparentBG}
        onPress={() => navigation.navigate(addAccountScreen)}
        title="Add Account"
        accessoryLeft={() => <Icon style={globalStyles.icon25} name="plus-circle-outline" fill={colorGray} />}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 8, flex: 1},
  transparentBG: {backgroundColor: 'transparent'},
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

type NavigationProps = CompositeNavigationProp<
  NavigationProp<AppStackParamList>,
  NavigationProp<DashboardStackParamList>
>;

function AccountItem({
  account,
  removeAccount,
}: {
  account: Account;
  removeAccount: (network: SupportedNetworkType, acc: Account) => void;
}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [visible, setVisible] = useState(false);
  const {data: identityInfoData} = useAccountIdentityInfo(account.address);
  const navigation = useNavigation<NavigationProps>();
  const startTx = useApiTx();
  const queryClient = useQueryClient();

  const hasIdentity = identityInfoData !== undefined && identityInfoData.hasIdentity;

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
    if (row === 3) {
      navigation.navigate(registerSubIdentitiesScreen, {address: account.address});
    }
    if (row === 4) {
      Alert.alert('Clear Identity', `Clear identity of account: \n ${account.address}`, [
        {
          text: 'Yes',
          onPress: () => {
            startTx({
              address: account.address,
              txMethod: 'identity.clearIdentity',
              params: [],
            }).then(() => {
              queryClient.invalidateQueries(['account_identity', account.address]);
            });
          },
          style: 'destructive',
        },
        {text: 'Cancel', style: 'cancel'},
      ]);
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
      style={styles.transparentBG}
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
          {hasIdentity ? (
            <MenuItem
              title="Set Sub-identities"
              accessoryLeft={(iconProps) => <Icon {...iconProps} name="people-outline" />}
            />
          ) : (
            <View />
          )}
          {hasIdentity ? (
            <MenuItem
              title="Clear Identity"
              accessoryLeft={(iconProps) => <Icon {...iconProps} name="person-remove-outline" />}
            />
          ) : (
            <View />
          )}
        </OverflowMenu>
      )}
      title={() => <AddressInfoBadge network={currentNetwork} address={account.address} />}
    />
  );
}
