import React from 'react';
import {SectionList, StyleSheet, View, RefreshControl, SectionListData} from 'react-native';
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
import {ProposalCallInfo} from '@ui/components/ProposalCallInfo';
import {useDemocracy, DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';
import {EmptyState} from '@ui/components/EmptyState';

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
  const groupedDataEmpty = ({section}: {section: SectionListData<DemocracyProposal | DemocracyReferendum>}) => {
    if (section.data.length < 1) {
      return (
        <Card style={globalStyles.paddedContainer}>
          <EmptyState subheading="There are no items to display" caption="Please check back for updates" />
        </Card>
      );
    }
    return null;
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
            renderSectionFooter={groupedDataEmpty}
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
