import React from 'react';
import {SectionList, StyleSheet, RefreshControl, Linking, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {TreasuryProposal, useTreasury} from 'src/api/hooks/useTreasury';
import globalStyles, {standardPadding} from '@ui/styles';
import TipsScreen from './Tips/TipsScreen';
import {useTheme, Card, Subheading, Button, List, Headline, Divider, Caption} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {EmptyStateTeaser} from '@ui/components/EmptyStateTeaser';
import {useNetwork} from '@atoms/network';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {ItemRowBlock} from '@ui/components/ItemRowBlock';

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
  const {currentNetwork} = useNetwork();
  const {loading, data: treasuryInfo, refetch, refetching} = useTreasury();
  const {colors} = useTheme();

  const groupedData = [
    {title: 'Proposals', data: treasuryInfo?.proposals ?? []},
    {title: 'Approved', data: treasuryInfo?.approvals ?? []},
  ];

  const openInPolkassembly = (proposal: TreasuryProposal) => () => {
    const url = `https://${currentNetwork.key}.polkassembly.io/treasury/${proposal.index}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

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
            keyExtractor={(item) => item.proposal.index}
            renderItem={({item}) => (
              <TreasuryProposalTeaser proposal={item.proposal}>
                <Button icon="open-in-new" onPress={openInPolkassembly(item.proposal)}>{`Polkassembly`}</Button>
              </TreasuryProposalTeaser>
            )}
            ItemSeparatorComponent={Padder}
            renderSectionHeader={({section: {title, data}}) => (
              <>
                {title === 'Approved' && <Padder scale={1} />}
                <Subheading>{`${title} (${data.length})`}</Subheading>
                <Padder scale={0.5} />
              </>
            )}
            renderSectionFooter={({section: {title, data}}) => {
              return (
                <>
                  {title === 'Proposals' && data.length < 1 ? (
                    <Card style={globalStyles.paddedContainer}>
                      <EmptyStateTeaser
                        subheading="There are no active proposals"
                        caption="Please check back for updates"
                      />
                    </Card>
                  ) : data.length < 1 ? (
                    <Card style={globalStyles.paddedContainer}>
                      <EmptyStateTeaser
                        subheading="There are no approved proposals"
                        caption="Please check back for updates"
                      />
                    </Card>
                  ) : null}
                </>
              );
            }}
          />
        )}
      </SafeView>
    </Layout>
  );
}

type TreasuryProposalTeaserProps = {
  proposal: TreasuryProposal;
  children?: React.ReactNode;
};

function TreasuryProposalTeaser({proposal, children}: TreasuryProposalTeaserProps) {
  const ProposalHeadline = React.useCallback(() => <Headline>{`#${proposal.index}`}</Headline>, [proposal.index]);

  return (
    <Card>
      <Card.Content>
        <List.Item title={''} left={ProposalHeadline} />
        <ItemRowBlock label="Proposer">
          <AccountTeaser account={proposal.proposer.account} />
        </ItemRowBlock>
        <ItemRowBlock label="Payout">
          <Caption>{proposal.value}</Caption>
        </ItemRowBlock>
        <ItemRowBlock label="Beneficiary">
          <AccountTeaser account={proposal.beneficiary.account} />
        </ItemRowBlock>
        <ItemRowBlock label="Bond">
          <Caption>{proposal.bond}</Caption>
        </ItemRowBlock>
      </Card.Content>
      <Divider />
      <View style={styles.button}>{children}</View>
    </Card>
  );
}

const styles = StyleSheet.create({
  sectionList: {
    padding: standardPadding * 2,
  },
  button: {
    paddingVertical: standardPadding,
  },
});
