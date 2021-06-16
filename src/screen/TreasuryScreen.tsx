import React, {useContext} from 'react';
import {Divider, Icon, Layout, Spinner, Text, TopNavigationAction, useTheme} from '@ui-kitten/components';
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
import {useFormatBalance} from '../hook/useFormatBalance';

export function TreasuryScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const theme = useTheme();
  const {api} = useContext(ChainApiContext);

  const {loading, value, retry} = useAsyncRetry(async () => {
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
    {title: 'Proposals', data: value?.proposals.proposals ?? []},
    {title: 'Approved', data: value?.proposals.approvals ?? []},
  ];

  const formatBalance = useFormatBalance();

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
        {!value ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : (
          <SectionList
            refreshing={loading}
            onRefresh={retry}
            sections={groupedData}
            keyExtractor={(item, index) => item.proposal.proposer.toString() ?? index.toString()}
            renderItem={({item}) => {
              const accountInfo = value?.accountInfos.find(
                (i) => i.accountId.toString() === item.proposal.proposer.toString(),
              );
              const text = accountInfo ? u8aToString(accountInfo.info.display.asRaw) : 'unknown';
              return (
                <View style={styles.item}>
                  <Identicon value={item.proposal.proposer} size={30} />
                  <Text style={styles.name}>{text}</Text>
                  <View style={styles.itemRight}>
                    <Text category={'c1'}>{formatBalance(item.proposal.value)}</Text>
                    <Icon name={'arrow-right-outline'} style={globalStyles.icon} fill={theme['color-basic-500']} />
                  </View>
                </View>
              );
            }}
            renderSectionHeader={({section: {title, data}}) => {
              return (
                <View style={[styles.header, {backgroundColor: theme['color-basic-100']}]}>
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
  name: {marginLeft: 10, flex: 1},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  itemRight: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
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
