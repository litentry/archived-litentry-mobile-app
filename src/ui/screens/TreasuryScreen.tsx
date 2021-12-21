import React from 'react';
import {SectionList, StyleSheet, View, useWindowDimensions} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {u8aToString} from '@polkadot/util';
import {Card, Layout, Text} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Account} from '@ui/components/Account';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useTreasuryInfo} from 'src/api/hooks/useTreasuryInfo';
import globalStyles, {standardPadding} from '@ui/styles';
import TipsScreen from './tips/TipsScreen';
import {useTheme} from '@ui/library';
import {Padder} from '@ui/components/Padder';

const Tab = createMaterialTopTabNavigator();

export function TreasuryScreen() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialLayout={{width: layout.width}}
      screenOptions={{
        tabBarLabelStyle: {color: colors.text},
        tabBarItemStyle: {width: 200},
        tabBarStyle: {backgroundColor: colors.background},
      }}>
      <Tab.Screen name="Overview" component={TreasuryOverviewScreen} />
      <Tab.Screen name="Tips" component={TipsScreen} />
    </Tab.Navigator>
  );
}

function TreasuryOverviewScreen() {
  const {isLoading, data: treasuryInfo, refetch} = useTreasuryInfo();

  const groupedData = [
    {title: 'Proposals', data: treasuryInfo?.proposals ?? []},
    {title: 'Approved', data: treasuryInfo?.approvals ?? []},
  ];

  const formatBalance = useFormatBalance();

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {!treasuryInfo ? (
          <LoadingView />
        ) : (
          <SectionList
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.sectionList}
            refreshing={isLoading}
            onRefresh={refetch}
            sections={groupedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
              const accountInfo = treasuryInfo?.accountInfos.find(
                (i) => i.accountId.toString() === item.proposal.proposer.toString(),
              );
              const proposer = accountInfo?.info
                ? u8aToString(accountInfo.info.display.asRaw)
                : accountInfo?.accountId.toString() ?? 'unknown';

              return (
                <Card style={styles.card} disabled>
                  <View style={styles.row}>
                    <Identicon value={item.proposal.proposer} size={30} />
                    <Text style={styles.name} category={'c1'} numberOfLines={1} ellipsizeMode="middle">
                      {proposer}
                    </Text>
                    <View style={styles.itemRight}>
                      <Text category={'c2'}>{formatBalance(item.proposal.value)}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Text category="c1">beneficiary: </Text>
                    <Account id={item.proposal.beneficiary.toString()}>
                      {(identity) =>
                        identity ? (
                          <View style={[styles.row, styles.accountsRow]}>
                            <Identicon value={identity.accountId} size={20} />
                            <Padder scale={0.3} />
                            <Text numberOfLines={1} category={'c1'} ellipsizeMode="middle">
                              {identity.display}
                            </Text>
                          </View>
                        ) : (
                          <Text>{item.proposal.beneficiary.toString()}</Text>
                        )
                      }
                    </Account>
                  </View>
                  <View style={styles.row}>
                    <Text category="c1">bond: </Text>
                    <Text category={'c1'} numberOfLines={1} ellipsizeMode="middle">
                      {formatBalance(item.proposal.bond)}
                    </Text>
                  </View>
                </Card>
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
            ListEmptyComponent={EmptyView}
          />
        )}
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  accountsRow: {flex: 1, marginRight: 20},
  sectionList: {
    padding: standardPadding * 2,
  },
  card: {
    marginBottom: standardPadding,
  },
  beneficiary: {
    flex: 1,
  },
  header: {justifyContent: 'space-between', flexDirection: 'row', paddingVertical: standardPadding},
  name: {marginLeft: 10, flex: 1},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: standardPadding},
});
