import React from 'react';
import {SectionList, StyleSheet, View, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui/components/Layout';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SubmitProposal} from '@ui/components/SubmitProposal';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {democracyProposalScreen, referendumScreen} from '@ui/navigation/routeKeys';
import {Card, Headline, List, Subheading, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {useDemocracyProposals, DemocracyProposal, DEMOCRACY_PROPOSALS_QUERY} from 'src/api/hooks/useDemocracyProposals';
import {
  useDemocracyReferendums,
  DemocracyReferendum,
  DEMOCRACY_REFERENDUMS_QUERY,
} from 'src/api/hooks/useDemocracyReferendum';
import {useRefetch} from 'src/api/hooks/useRefetch';
import {ProposalCallInfo} from '@ui/components/ProposalCallInfo';

export function DemocracyScreen() {
  const {data: proposals, loading: proposalsLoading} = useDemocracyProposals();
  const {data: referendums, loading: referendumsLoading} = useDemocracyReferendums();

  const {refetch, refreshing} = useRefetch([DEMOCRACY_PROPOSALS_QUERY, DEMOCRACY_REFERENDUMS_QUERY]);

  const {colors} = useTheme();

  const groupedData: {title: string; data: Array<DemocracyProposal | DemocracyReferendum>}[] = React.useMemo(
    () => [
      {title: 'Referenda', data: referendums ?? []},
      {title: 'Proposals', data: proposals ?? []},
    ],
    [proposals, referendums],
  );

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {(proposalsLoading || referendumsLoading) && !refreshing ? (
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
            renderItem={({item}) => {
              if ('endPeriod' in item) {
                return <ReferendumListItem referendum={item} />;
              } else {
                return <ProposalListItem proposal={item} />;
              }
            }}
            renderSectionHeader={({section: {title}}) => {
              return (
                <>
                  {title === 'Proposals' && <Padder scale={1.5} />}
                  <Subheading style={styles.header}>{title}</Subheading>
                </>
              );
            }}
            keyExtractor={(item) => item.index.toString()}
            ListEmptyComponent={EmptyView}
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
});

function ReferendumListItem({referendum}: {referendum: DemocracyReferendum}) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const title = `${referendum.method}.${referendum.section}`;

  return (
    <Card onPress={() => navigation.navigate(referendumScreen, {referendum})}>
      <Card.Content>
        <List.Item
          title={title}
          left={() => <Headline>{referendum.index}</Headline>}
          description={referendum.endPeriod.slice(0, 2).join(' ')}
        />
        <ProposalCallInfo proposal={referendum} />
      </Card.Content>
    </Card>
  );
}

function ProposalListItem({proposal}: {proposal: DemocracyProposal}) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const title = `${proposal.method}.${proposal.section}`;

  return (
    <Card onPress={() => navigation.navigate(democracyProposalScreen, {proposal})}>
      <Card.Content>
        <List.Item left={() => <Headline>{proposal.index}</Headline>} title={title} />
        <ProposalCallInfo proposal={proposal} />
      </Card.Content>
    </Card>
  );
}
