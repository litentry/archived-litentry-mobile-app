import React, {useContext} from 'react';
import {Divider, Icon, Layout, ListItem, Spinner, Text, TopNavigationAction} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {ChainApiContext} from 'context/ChainApiContext';
import {FlatList, StyleSheet, View} from 'react-native';
import {u8aToString} from '@polkadot/util';
import {ApiPromise} from '@polkadot/api';
import {AccountId} from '@polkadot/types/interfaces';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAccountsIdentityInfo} from 'service/api/account';

export function TreasuryScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);

  const {loading, value: data} = useAsyncRetry(async () => {
    try {
      if (!api) {
        return;
      }
      return await getTreasuryInfo(api);
    } catch (e) {
      console.warn(e);
    }
  }, [api]);

  return (
    <Layout style={globalStyles.flex}>
      <ScreenNavigation
        renderTitle={() => (
          <Text category={'s1'} style={globalStyles.monoFont}>
            Treasury
          </Text>
        )}
        accessoryLeft={
          <TopNavigationAction onPress={navigation.goBack} icon={(p) => <Icon {...p} name={'arrow-back-outline'} />} />
        }
      />
      <SafeAreaView edges={['bottom']} style={globalStyles.flex}>
        {loading ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : null}
        <View style={styles.header}>
          <Text category={'s1'}>Proposals</Text>
          <Text category={'p2'}>{`${data?.proposals.proposals.length} / ${data?.proposals.proposalCount}`}</Text>
        </View>
        <FlatList
          data={data?.proposals.proposals}
          renderItem={({item}) => {
            const accountInfo = data?.accountInfos.find(
              (i) => i.accountId.toString() === item.proposal.proposer.toString(),
            );
            const text = accountInfo ? u8aToString(accountInfo.info.display.asRaw) : 'unknown';
            return (
              <ListItem
                title={text}
                accessoryRight={() => (
                  <Text>{Math.floor(item.proposal.value.toNumber() / 100000000).toLocaleString()} KSM</Text>
                )}
                accessoryLeft={() => <Identicon value={item.proposal.proposer} size={30} />}
              />
            );
          }}
          keyExtractor={(item, index) => item.proposal.proposer.toString() ?? index.toString()}
          ItemSeparatorComponent={Divider}
        />
        <View style={styles.header}>
          <Text category={'s1'}>Approved</Text>
          <Text category={'p2'}>{`${data?.proposals.approvals.length}`}</Text>
        </View>
        <FlatList
          data={data?.proposals.approvals}
          renderItem={({item}) => {
            const accountInfo = data?.accountInfos.find(
              (i) => i.accountId.toString() === item.proposal.proposer.toString(),
            );
            const text = accountInfo ? u8aToString(accountInfo.info.display.asRaw) : 'unknown';

            return (
              <ListItem
                title={text}
                accessoryRight={() => (
                  <Text>{Math.floor(item.proposal.value.toNumber() / 100000000).toLocaleString()} KSM</Text>
                )}
                accessoryLeft={() => <Identicon value={item.proposal.proposer} size={30} />}
              />
            );
          }}
          keyExtractor={(item, index) => item.proposal.proposer.toString() ?? index.toString()}
          ItemSeparatorComponent={Divider}
        />
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {justifyContent: 'space-between', flexDirection: 'row', padding: standardPadding * 2},
});

async function getTreasuryInfo(api: ApiPromise) {
  let proposals = await api.derive.treasury.proposals();
  let accountIds: AccountId[] = [];
  for (const p of proposals.proposals) {
    if (!accountIds.includes(p.proposal.proposer)) {
      accountIds.push(p.proposal.proposer);
    }
  }
  for (const p of proposals.approvals) {
    if (!accountIds.includes(p.proposal.proposer)) {
      accountIds.push(p.proposal.proposer);
    }
  }
  const accountInfos = await getAccountsIdentityInfo(accountIds, api);

  return {proposals: proposals, accountInfos: accountInfos};
}
