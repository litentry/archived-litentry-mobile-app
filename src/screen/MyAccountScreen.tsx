import {BN_ZERO} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Text, useTheme} from '@ui-kitten/components';
import {useAccounts} from 'context/AccountsContext';
import {Button, Padder} from 'src/packages/base_components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {AccountsStackParamList, CompleteNavigatorParamList} from 'src/navigation/navigation';
import {
  accountsScreen,
  balanceScreen,
  exportAccountWithJsonFileScreen,
  identityGuideScreen,
  manageIdentityScreen,
  receiveFundScreen,
} from 'src/navigation/routeKeys';
import {standardPadding} from 'src/styles';

export function MyAccountScreen({
  navigation,
  route: {
    params: {address},
  },
}: {
  navigation: NavigationProp<CompleteNavigatorParamList>;
  route: RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;
}) {
  const {data} = useAccountIdentityInfo(address);
  const formatBalance = useFormatBalance();
  const {data: accountInfo} = useAccountInfo(address);
  const theme = useTheme();
  const {accounts, removeAccount} = useAccounts();
  const account = accounts[address];

  if (!account) {
    return null;
  }

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <View style={[styles.box, {backgroundColor: theme['background-basic-color-2']}]}>
          <Row title="Display Name" value={data?.display} />
          <Padder scale={1} />
          <Row title="Address" value={address} />
          <Padder scale={1} />
          <Row title="Balance" value={formatBalance(accountInfo?.data.free ?? BN_ZERO)} />
          <Padder scale={1} />
          <Row
            title="identity"
            value={
              <View>
                <Text category="c1">{data?.hasIdentity ? 'Identity Data Found' : 'No Identity Data Found'}</Text>
                {data?.hasIdentity && data.hasJudgements ? (
                  <Text category="c1">{`${data.registration.judgements.length} Judgements`}</Text>
                ) : null}
              </View>
            }
          />
        </View>
        <Padder scale={1} />
        <Button
          onPress={() => {
            navigation.navigate(balanceScreen, {address});
          }}
          icon="credit-card"
          mode="outlined">
          Show Balance details
        </Button>
        <Padder scale={1} />
        <Button
          onPress={() => {
            navigation.navigate(manageIdentityScreen, {address});
            navigation.navigate(identityGuideScreen);
          }}
          icon="cog"
          mode="outlined">
          Manage Identity
        </Button>
        <Padder scale={1} />
        <Button
          mode="outlined"
          onPress={() => {
            Alert.alert('Delete Account!', 'Are you sure you want to delete this account?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Delete',
                onPress: () => {
                  removeAccount(address);
                  navigation.navigate(accountsScreen);
                },
                style: 'destructive',
              },
            ]);
          }}
          icon="close-circle">
          Remove Account
        </Button>
        <Padder scale={1} />
        {account.isExternal ? (
          <>
            <Button
              onPress={() => navigation.navigate(exportAccountWithJsonFileScreen, {address})}
              icon="export"
              mode="outlined">
              Export Account
            </Button>
            <Padder scale={1} />
          </>
        ) : null}
        <Button onPress={() => navigation.navigate(receiveFundScreen, {address})} icon="download" mode="outlined">
          Recieve Fund
        </Button>
      </ScrollView>
    </SafeView>
  );
}

function Row({title, value}: {title: string; value?: string | React.ReactChild}) {
  return (
    <View style={styles.row}>
      <Text category="c2">{title}: </Text>
      {typeof value === 'string' ? (
        <Text category="c1" numberOfLines={1} ellipsizeMode="middle" style={styles.rowValue}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  box: {
    padding: standardPadding * 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  iconContainer: {
    borderRadius: 100,
    padding: 15,
  },
  icon: {
    width: 40,
    height: 40,
  },
  row: {flexDirection: 'row', alignItems: 'flex-start'},
  rowValue: {
    flexShrink: 1,
  },
});
