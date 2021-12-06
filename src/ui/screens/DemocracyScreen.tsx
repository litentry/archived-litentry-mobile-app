import type {DeriveProposal, DeriveReferendumExt} from '@polkadot/api-derive/types';
import {BN_ONE} from '@polkadot/util';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import {ProposalInfo} from '@ui/components/ProposalInfo';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SubmitProposalButton} from '@ui/components/SubmitProposalButton';
import * as React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {democracyProposalScreen, referendumScreen} from '@ui/navigation/routeKeys';
import {Card, Headline, List, Text} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';

export function DemocracyScreen() {
  const {data, isLoading, refetch, isFetching} = useDemocracy();

  const groupedData: {title: string; data: Array<DeriveReferendumExt | DeriveProposal>}[] = React.useMemo(
    () => [
      {title: 'Referenda', data: data?.referendums ?? []},
      {title: 'Proposals', data: data?.activeProposals ?? []},
    ],
    [data],
  );

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <SectionList
            contentContainerStyle={styles.content}
            stickySectionHeadersEnabled={false}
            refreshing={isFetching}
            onRefresh={refetch}
            sections={groupedData}
            renderItem={({item}) => {
              if ('votes' in item) {
                return <ReferendumListItem item={item} />;
              } else {
                return <ProposalListItem item={item} />;
              }
            }}
            renderSectionHeader={({section: {title}}) => {
              return (
                <>
                  {title === 'Proposals' && <Padder scale={1.5} />}
                  <Text style={styles.header}>{title}</Text>
                </>
              );
            }}
            keyExtractor={(item) => item.index.toString()}
            ListEmptyComponent={EmptyView}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                <SubmitProposalButton />
              </View>
            )}
          />
        )}
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {paddingVertical: standardPadding, paddingHorizontal: standardPadding * 2},
  header: {padding: standardPadding},
  footer: {paddingVertical: standardPadding},
});

function ReferendumListItem({item}: {item: DeriveReferendumExt}) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const {image: {proposal} = {proposal: undefined}} = item;
  const bestNumber = useBestNumber();

  const remainBlock = bestNumber ? item.status.end.sub(bestNumber).isub(BN_ONE) : undefined;
  const {timeStringParts} = useBlockTime(remainBlock);

  const {method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};
  const title = proposal ? `${method}.${section}` : `preimage`;

  const goToRefrenda = () => {
    navigation.navigate(referendumScreen, {index: item.index.toString()});
  };

  return (
    <Card onPress={goToRefrenda}>
      <Card.Content>
        <List.Item
          style={referendumStyle.item}
          title={title}
          disabled
          left={() => <Headline>{item.index.toString()}</Headline>}
          right={() => (
            <View style={referendumStyle.row}>
              <Text adjustsFontSizeToFit={true} numberOfLines={1}>
                {timeStringParts.slice(0, 2).join(' ')}
              </Text>
            </View>
          )}
        />
        {proposal ? (
          <ProposalInfo proposal={proposal} />
        ) : (
          <Text numberOfLines={1} ellipsizeMode="middle">
            {String(item.imageHash)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const referendumStyle = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  item: {backgroundColor: 'transparent'},
});

function ProposalListItem({item}: {item: DeriveProposal}) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const {image: {proposal} = {proposal: undefined}} = item;
  const {method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};
  const title = proposal ? `${method}.${section}` : `preimage`;

  return (
    <Card
      style={proposalStyle.container}
      onPress={() => navigation.navigate(democracyProposalScreen, {index: String(item.index)})}>
      <Card.Content>
        <List.Item left={() => <Headline>{item.index.toString()}</Headline>} title={title} />
        {proposal ? (
          <ProposalInfo proposal={proposal} />
        ) : (
          <Text numberOfLines={1} ellipsizeMode="middle">
            {String(item.imageHash)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const proposalStyle = StyleSheet.create({
  container: {marginBottom: standardPadding},
});
