import Identicon from '@polkadot/reactnative-identicon';
import {u8aToString} from '@polkadot/util';
import {Card, Layout, Spinner, Text, Tab, TabBar} from '@ui-kitten/components';
import {Account} from 'layout/Account';
import {EmptyView} from 'presentational/EmptyView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useTreasuryInfo} from 'src/api/hooks/useTreasuryInfo';
import globalStyles, {standardPadding} from 'src/styles';

import TipsScreen from './tips/TipsScreen';
import {createMaterialTopTabNavigator, MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const TopTabBar = ({navigation, state}: MaterialTopTabBarProps) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => {
      const route = state.routeNames[index];
      if (route) {
        navigation.navigate(route);
      }
    }}>
    <Tab title="Overview" />
    <Tab title="Tips" />
  </TabBar>
);

export const TreasuryScreen = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="TreasuryOverviewScreen" component={TreasuryOverviewScreen} />
    <Screen name="TipsScreen" component={TipsScreen} />
  </Navigator>
);

export function TreasuryOverviewScreen() {
  const {isLoading, data, refetch} = useTreasuryInfo();

  const groupedData = [
    {title: 'Proposals', data: data?.proposals ?? []},
    {title: 'Approved', data: data?.approvals ?? []},
  ];

  const formatBalance = useFormatBalance();

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {!data ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : (
          <SectionList
            contentContainerStyle={styles.sectionList}
            refreshing={isLoading}
            onRefresh={refetch}
            sections={groupedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
              const accountInfo = data?.accountInfos.find(
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
