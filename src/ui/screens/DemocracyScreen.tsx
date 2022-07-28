import React from 'react';
import {SectionList, StyleSheet, View, RefreshControl, Linking} from 'react-native';
import {Layout} from '@ui/components/Layout';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SubmitProposal} from '@ui/components/SubmitProposal';
import {democracyProposalScreen, referendumScreen} from '@ui/navigation/routeKeys';
import {Card, useTheme, Button, List, Text, Divider} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {useDemocracy, DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';
import {EmptyStateTeaser} from '@ui/components/EmptyStateTeaser';
import {useNetwork} from '@atoms/network';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {ProposalCall} from '@ui/components/ProposalCall';
import {ItemRowBlock} from '@ui/components/ItemRowBlock';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {getProposalTitle} from 'src/utils/proposal';

type Proposal = DemocracyProposal | DemocracyReferendum;

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

function Footer() {
  return (
    <View style={styles.footer}>
      <Padder scale={1} />
      <SubmitProposal />
    </View>
  );
}

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
            ItemSeparatorComponent={Padder}
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
                <Padder scale={1} />
                <Divider />
                <View style={styles.polkaLink}>
                  <Button icon="open-in-new" onPress={() => openInPolkassembly(item)}>{`Polkassembly`}</Button>
                </View>
              </DemocracyProposalTeaser>
            )}
            renderSectionHeader={({section: {title}}) => {
              return (
                <>
                  {title === 'Proposals' && <Padder scale={1} />}
                  <Text variant="titleMedium" style={styles.header}>
                    {title}
                  </Text>
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
            ListFooterComponent={Footer}
          />
        )}
      </SafeView>
    </Layout>
  );
}

type ProposalTeaserProps = {
  proposal: Proposal;
  children?: React.ReactNode;
  navigation: NavigationProp<DashboardStackParamList>;
};

function DemocracyProposalTeaser({proposal, children, navigation}: ProposalTeaserProps) {
  const ItemLeft = React.useCallback(
    () => <Text variant="headlineSmall">{`#${proposal.index}`}</Text>,
    [proposal.index],
  );

  if (proposal.__typename === 'SubstrateChainDemocracyReferendum') {
    return (
      <Card onPress={() => navigation.navigate(referendumScreen, {referendum: proposal})}>
        <Card.Content>
          <List.Item
            title={<Text variant="bodySmall">{getProposalTitle(proposal)}</Text>}
            left={ItemLeft}
            description={proposal.endPeriod ? proposal.endPeriod.slice(0, 2).join(' ') : ''}
          />
          <ProposalCall proposal={proposal} />
        </Card.Content>
        {children}
      </Card>
    );
  } else if (proposal.__typename === 'SubstrateChainDemocracyProposal') {
    return (
      <Card onPress={() => navigation.navigate(democracyProposalScreen, {proposal})}>
        <Card.Content>
          <List.Item title={<Text variant="bodySmall">{getProposalTitle(proposal)}</Text>} left={ItemLeft} />
          <ItemRowBlock label="Balance">
            <Text variant="bodySmall">{proposal.formattedBalance}</Text>
          </ItemRowBlock>
          <ItemRowBlock label="Proposer">
            <AccountTeaser account={proposal.proposer.account} />
          </ItemRowBlock>
          <ProposalCall proposal={proposal} />
        </Card.Content>
        {children}
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
    marginVertical: standardPadding,
  },
});
