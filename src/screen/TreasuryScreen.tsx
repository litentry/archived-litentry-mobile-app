import React, {useContext} from 'react';
import {Divider, Icon, Layout, ListItem, Spinner, Text, TopNavigationAction} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {ChainApiContext} from 'context/ChainApiContext';
import {SectionList, StyleSheet, View} from 'react-native';
import {u8aToString} from '@polkadot/util';
import {ApiPromise} from '@polkadot/api';
import {AccountId} from '@polkadot/types/interfaces';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAccountsIdentityInfo} from 'service/api/account';
import {EmptyView} from 'presentational/EmptyView';

export function TreasuryScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);

  const {loading, value: treasuryData} = useAsyncRetry(async () => {
    try {
      if (!api) {
        return;
      }
      return await getTreasuryInfo(api);
    } catch (e) {
      console.warn(e);
    }
  }, [api]);

  const groupedData = [
    {title: 'Proposals', data: treasuryData?.proposals.proposals ?? []},
    {title: 'Approved', data: treasuryData?.proposals.approvals ?? []},
  ];

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
        ) : (
          <SectionList
            sections={groupedData}
            keyExtractor={(item, index) => item.proposal.proposer.toString() ?? index.toString()}
            renderItem={({item}) => {
              const accountInfo = treasuryData?.accountInfos.find((i) => i.accountId.eq(item.proposal.proposer));
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
            renderSectionHeader={({section: {title, data}}) => {
              return (
                <View style={styles.header}>
                  <Text category={'s1'}>{title}</Text>
                  <Text category={'p2'}>{`${data.length}`}</Text>
                </View>
              );
            }}
            ItemSeparatorComponent={Divider}
            ListEmptyComponent={EmptyView}
          />
        )}
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {justifyContent: 'space-between', flexDirection: 'row', padding: standardPadding * 2},
});

async function getTreasuryInfo(api: ApiPromise) {
  const proposals = await api.derive.treasury.proposals();
  const accountIds: AccountId[] = [];
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
