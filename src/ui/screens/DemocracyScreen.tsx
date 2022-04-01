import React from 'react';
import {SectionList, StyleSheet, View, RefreshControl, Linking} from 'react-native';
import {Layout} from '@ui/components/Layout';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SubmitProposal} from '@ui/components/SubmitProposal';
import {democracyProposalScreen, referendumScreen} from '@ui/navigation/routeKeys';
import {Card, Subheading, useTheme, Button, List, Headline, Caption} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {useDemocracy, DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';
import {EmptyStateTeaser} from '@ui/components/EmptyStateTeaser';
import {useNetwork} from 'context/NetworkContext';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {ProposalCall} from '@ui/components/ProposalCall';
import {ItemRowBlock} from '@ui/components/ItemRowBlock';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

type Proposal = DemocracyProposal | DemocracyReferendum;

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

export function DemocracyScreen({navigation}: ScreenProps) {
  const {currentNetwork} = useNetwork();
  const {data: democracy, loading, refetch, refreshing} = useDemocracy();
  const {colors} = useTheme();
  const groupedData: {title: string; data: Array<Proposal>}[] = React.useMemo(
    () => [
      {title: 'Referenda', data: democracy.referendums ?? []},
      {title: 'Proposals', data: democracy.proposals ?? []},
    ],
    [democracy],
  );

  const isLoading = loading && !refreshing;

  const openInPolkassembly = (proposal: Proposal) => {
    const location = proposal.__typename === 'SubstrateChainDemocracyProposal' ? 'proposal' : 'referendum';
    const url = `https://${currentNetwork.key}.polkassembly.io/${location}/${proposal.index}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <SectionList
            ItemSeparatorComponent={() => <Padder scale={1} />}
            contentContainerStyle={styles.content}
            stickySectionHeadersEnabled={false}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refetch}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            onRefresh={refetch}
            sections={groupedData}
            renderItem={({item}) => (
              <DemocracyProposalTeaser proposal={item} navigation={navigation}>
                <View style={styles.polkaLink}>
                  <Button icon="open-in-new" onPress={() => openInPolkassembly(item)}>{`Polkassembly`}</Button>
                </View>
              </DemocracyProposalTeaser>
            )}
            renderSectionHeader={({section: {title}}) => {
              return (
                <>
                  {title === 'Proposals' && <Padder scale={1} />}
                  <Subheading style={styles.header}>{title}</Subheading>
                  <Padder scale={0.5} />
                </>
              );
            }}
            renderSectionFooter={({section}) => {
              return (
                <>
                  {section.title === 'Proposals' && section.data.length < 1 ? (
                    <Card style={globalStyles.paddedContainer}>
                      <EmptyStateTeaser
                        subheading="There are no active proposals"
                        caption="Please check back for updates"
                      />
                    </Card>
                  ) : section.data.length < 1 ? (
                    <Card style={globalStyles.paddedContainer}>
                      <EmptyStateTeaser
                        subheading="There are no active referendums"
                        caption="Please check back for updates"
                      />
                    </Card>
                  ) : null}
                </>
              );
            }}
            keyExtractor={(item) => item.index}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                <Padder scale={1} />
                <SubmitProposal />
              </View>
            )}
          />
        )}
      </SafeView>
    </Layout>
  );
}

function getTitle(proposal: Proposal) {
  if (proposal.method && proposal.section) {
    return `${proposal.method}.${proposal.section}()`;
  } else if (proposal.__typename === 'SubstrateChainDemocracyReferendum') {
    return `preimage ${proposal.imageHash}`;
  }

  return '';
}

type ProposalTeaserProps = {
  proposal: Proposal;
  children?: React.ReactNode;
  navigation: NavigationProp<DashboardStackParamList>;
};

function DemocracyProposalTeaser({proposal, children, navigation}: ProposalTeaserProps) {
  if (proposal.__typename === 'SubstrateChainDemocracyReferendum') {
    return (
      <Card onPress={() => navigation.navigate(referendumScreen, {referendum: proposal})}>
        <Card.Content>
          <List.Item
            title={getTitle(proposal)}
            left={() => <Headline>{`#${proposal.index}`}</Headline>}
            description={proposal.endPeriod ? proposal.endPeriod.slice(0, 2).join(' ') : ''}
          />
          <ProposalCall proposal={proposal} />
          {children}
        </Card.Content>
      </Card>
    );
  } else if (proposal.__typename === 'SubstrateChainDemocracyProposal') {
    return (
      <Card onPress={() => navigation.navigate(democracyProposalScreen, {proposal})}>
        <Card.Content>
          <List.Item title={getTitle(proposal)} left={() => <Headline>{`#${proposal.index}`}</Headline>} />
          <ItemRowBlock label="Balance">
            <Caption>{proposal.formattedBalance}</Caption>
          </ItemRowBlock>
          <ItemRowBlock label="Proposer">
            <AccountTeaser account={proposal.proposer.account} />
          </ItemRowBlock>
          <ProposalCall proposal={proposal} />
          {children}
        </Card.Content>
      </Card>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  header: {
    padding: standardPadding,
  },
  footer: {
    paddingVertical: standardPadding,
  },
  polkaLink: {
    marginTop: standardPadding,
  },
});
