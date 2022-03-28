import React from 'react';
import {SectionList, StyleSheet, View, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui/components/Layout';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SubmitProposal} from '@ui/components/SubmitProposal';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {democracyProposalScreen, referendumScreen} from '@ui/navigation/routeKeys';
import {Card, Headline, List, Subheading, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {ProposalCall} from '@ui/components/ProposalCall';
import {useDemocracy, DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';
import {EmptyStateTeaser} from '@ui/components/EmptyStateTeaser';

export function DemocracyScreen() {
  const {data: democracy, loading, refetch, refreshing} = useDemocracy();
  const {colors} = useTheme();
  const groupedData: {title: string; data: Array<DemocracyProposal | DemocracyReferendum>}[] = React.useMemo(
    () => [
      {title: 'Referenda', data: democracy.referendums ?? []},
      {title: 'Proposals', data: democracy.proposals ?? []},
    ],
    [democracy],
  );

  const isLoading = loading && !democracy && !refreshing;

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
            keyExtractor={(item) => item.index.toString()}
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
        <ProposalCall proposal={referendum} />
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
        <ProposalCall proposal={proposal} />
      </Card.Content>
    </Card>
  );
}
