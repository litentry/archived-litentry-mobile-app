import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {u8aToString} from '@polkadot/util';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Account} from '@ui/components/Account';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useTreasuryInfo} from 'src/api/hooks/useTreasuryInfo';
import globalStyles, {standardPadding} from '@ui/styles';
import TipsScreen from './Tips/TipsScreen';
import {useTheme, Card, Caption, Subheading} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {stringShorten} from '@polkadot/util';

const Tab = createMaterialTopTabNavigator();

export function TreasuryScreen() {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {color: colors.text},
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
        {isLoading ? (
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
                : accountInfo?.accountId
                ? stringShorten(accountInfo.accountId.toString())
                : 'unknown';

              return (
                <Card style={styles.item}>
                  <Card.Content>
                    <View style={styles.row}>
                      <Identicon value={item.proposal.proposer} size={30} />
                      <Padder scale={0.5} />
                      <Caption>{proposer}</Caption>
                      <View style={styles.itemRight}>
                        <Caption>{formatBalance(item.proposal.value)}</Caption>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <Caption>Beneficiary: </Caption>
                      <Account id={item.proposal.beneficiary.toString()}>
                        {(identity) =>
                          identity ? (
                            <View style={[styles.row, styles.accountsRow]}>
                              <Identicon value={identity.accountId} size={20} />
                              <Padder scale={0.3} />
                              <Caption numberOfLines={1} ellipsizeMode="middle">
                                {identity.display}
                              </Caption>
                            </View>
                          ) : (
                            <Caption numberOfLines={1}>{stringShorten(item.proposal.beneficiary.toString())}</Caption>
                          )
                        }
                      </Account>
                    </View>
                    <View style={styles.row}>
                      <Caption>Bond: </Caption>
                      <Caption numberOfLines={1} ellipsizeMode="middle">
                        {formatBalance(item.proposal.bond)}
                      </Caption>
                    </View>
                  </Card.Content>
                </Card>
              );
            }}
            renderSectionHeader={({section: {title, data}}) => {
              return (
                <View style={styles.header}>
                  <Subheading>{title}</Subheading>
                  <Caption>{`${data.length}`}</Caption>
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
  accountsRow: {
    flex: 1,
    marginRight: 20,
  },
  sectionList: {
    padding: standardPadding * 2,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: standardPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginBottom: standardPadding,
  },
  itemRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: standardPadding,
  },
});
