import React, {useContext} from 'react';
import {SectionList, StyleSheet, View, Linking, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {useTreasury} from 'src/api/hooks/useTreasury';
import globalStyles, {standardPadding} from '@ui/styles';
import TipsScreen from './Tips/TipsScreen';
import {useTheme, Card, Caption, Subheading, Text, Button, Divider} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {NetworkType} from 'src/types';
import {NetworkContext} from 'context/NetworkContext';

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
  const {loading, data: treasuryInfo, refetch, refetching} = useTreasury();
  const {colors} = useTheme();

  const groupedData = [
    {title: 'Proposals', data: treasuryInfo?.proposals ?? []},
    {title: 'Approved', data: treasuryInfo?.approvals ?? []},
  ];

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {loading && !treasuryInfo ? (
          <LoadingView />
        ) : (
          <SectionList
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.sectionList}
            refreshControl={
              <RefreshControl
                refreshing={refetching}
                onRefresh={refetch}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            sections={groupedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
              const proposer = item.proposal.proposer;
              const beneficiary = item.proposal.beneficiary;

              return (
                <Card style={styles.item}>
                  <Card.Content>
                    <View style={styles.row}>
                      <View style={styles.proposerContainer}>
                        <Caption>Proposer</Caption>
                        <AccountTeaser account={proposer.account} identiconSize={30} />
                      </View>
                      <Caption style={styles.proposalId}>{`# ${item.id}`}</Caption>
                    </View>
                    <Padder scale={0.5} />
                    <View>
                      <Caption>Beneficiary</Caption>
                      <AccountTeaser account={beneficiary.account} identiconSize={30} />
                    </View>
                    <Padder scale={0.5} />
                    <View style={styles.row}>
                      <View style={styles.balancesRow}>
                        <Caption>Payment:</Caption>
                        <Padder scale={0.5} />
                        <Text>{item.proposal.value}</Text>
                      </View>
                      <View style={styles.balancesRow}>
                        <Caption>Bond: </Caption>
                        <Padder scale={0.5} />
                        <Text>{item.proposal.bond}</Text>
                      </View>
                    </View>
                    <Padder scale={0.5} />
                    <Divider />
                    <Padder scale={0.5} />
                    <PolkassemblyProposal proposalId={item.id} />
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

function PolkassemblyProposal({proposalId}: {proposalId: string}) {
  const {currentNetwork} = useContext(NetworkContext);

  return (
    <Button onPress={() => openPolkassemblyProposal(currentNetwork, proposalId)} icon="open-in-new">
      Polkassembly
    </Button>
  );
}

function openPolkassemblyProposal(currentNetwork: NetworkType, proposalId: string) {
  const network = currentNetwork.key === 'kusama' ? 'kusama' : 'polkadot';
  const url = `https://${network}.polkassembly.io/treasury/${proposalId}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
}

const styles = StyleSheet.create({
  proposerContainer: {
    flex: 1,
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
    justifyContent: 'space-between',
  },
  balancesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginBottom: standardPadding,
  },
  proposalId: {
    fontSize: 14,
  },
});
