import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {Padder} from '@ui/components/Padder';
import {Account} from './Account';
import type {Account as AccountType} from 'src/api/hooks/useAccount';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {accountScreen} from '@ui/navigation/routeKeys';

type Props = {
  account: AccountType;
  identiconSize?: number;
};

export function AccountTeaser({account, identiconSize = 20}: Props) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(accountScreen, {address: account.address})}>
      <View style={styles.container}>
        <Identicon value={account.address} size={identiconSize} />
        <Padder scale={0.5} />
        <Account account={account} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
