import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp} from '@react-navigation/native';
import {Button, Divider, Icon, ListItem, useTheme} from '@ui-kitten/components';
import {Account, useAccounts} from 'context/AccountsContext';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import SafeView from 'presentational/SafeView';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {CompleteNavigatorParamList} from 'src/navigation/navigation';
import {addAccountScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

export function AccountsScreen({navigation}: {navigation: NavigationProp<CompleteNavigatorParamList>}) {
  const {accounts, toggleFavorite} = useAccounts();

  return (
    <SafeView>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={accounts}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.address}
        renderItem={({item: account}) => (
          <AccountItem key={account.address} account={account} toggleFavorite={() => toggleFavorite(account)} />
        )}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Button
              status="basic"
              accessoryLeft={(p) => <Icon {...p} name="plus-circle-outline" />}
              onPress={() => navigation.navigate(addAccountScreen)}>
              Add Account
            </Button>
          </View>
        )}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: standardPadding * 2,
  },
  footer: {
    marginTop: standardPadding * 4,
  },
});

function AccountItem({account, toggleFavorite}: {account: Account; toggleFavorite: () => void}) {
  const {data: identityInfoData} = useAccountIdentityInfo(account.address);
  const theme = useTheme();

  if (!identityInfoData) {
    return null;
  }

  return (
    <ListItem
      accessoryLeft={(p) => (
        <View {...p}>
          <Identicon value={account.address} size={25} />
        </View>
      )}
      title={(p) => (
        <View {...p}>
          <AccountInfoInlineTeaser identity={identityInfoData} />
        </View>
      )}
      accessoryRight={(p) => (
        <TouchableOpacity {...p} onPress={toggleFavorite}>
          <Icon
            style={globalStyles.icon25}
            fill={account.isFavorite ? 'yellow' : theme['color-basic-500']}
            name="star-outline"
          />
        </TouchableOpacity>
      )}
    />
  );
}
