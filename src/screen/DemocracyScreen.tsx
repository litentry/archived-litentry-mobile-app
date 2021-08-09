import type {DeriveReferendumExt, DeriveProposal} from '@polkadot/api-derive/types';
import {BN_ONE} from '@polkadot/util';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card, Icon, Layout, ListItem, Text} from '@ui-kitten/components';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import {ProposalInfo} from 'presentational/ProposalInfo';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {SubmitProposalButton} from 'presentational/SubmitProposalButton';
import * as React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

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
                  <Text category={'s1'} style={styles.header}>
                    {title}
                  </Text>
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
    <Card style={referendumStyle.container} onPress={goToRefrenda}>
      <ListItem
        style={referendumStyle.item}
        title={title}
        disabled
        accessoryLeft={() => <Text category={'h4'}>{item.index.toString()}</Text>}
        accessoryRight={() => (
          <View style={referendumStyle.row}>
            <Text category={'p1'} adjustsFontSizeToFit={true} numberOfLines={1}>
              {timeStringParts.slice(0, 2).join(' ')}
            </Text>
            <Icon name="chevron-right-outline" fill="grey" style={globalStyles.icon25} />
          </View>
        )}
      />
      {proposal ? (
        <ProposalInfo proposal={proposal} />
      ) : (
        <Text numberOfLines={1} ellipsizeMode="middle" category={'c1'}>
          {String(item.imageHash)}
        </Text>
      )}
    </Card>
  );
}

const referendumStyle = StyleSheet.create({
  container: {marginBottom: standardPadding},
  row: {flexDirection: 'row', alignItems: 'center'},
  item: {backgroundColor: 'transparent'},
});

function ProposalListItem({item}: {item: DeriveProposal}) {
  const {image: {proposal} = {proposal: undefined}} = item;
  const {method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};
  const title = proposal ? `${method}.${section}` : `preimage`;

  return (
    <Card style={proposalStyle.container}>
      <View style={proposalStyle.item}>
        <Text category={'h4'} style={proposalStyle.index}>
          {item.index.toString()}
        </Text>
        <View style={proposalStyle.desc}>
          <Text>{title}</Text>
          {proposal ? (
            <ProposalInfo proposal={proposal} />
          ) : (
            <Text numberOfLines={1} ellipsizeMode="middle" category={'c1'}>
              {String(item.imageHash)}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const proposalStyle = StyleSheet.create({
  container: {marginBottom: standardPadding},
  item: {
    flexDirection: 'row',
  },
  index: {
    paddingRight: standardPadding,
  },
  desc: {
    flex: 1,
  },
});
