import React from 'react';
import {useWindowDimensions, View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDemocracyReferendums, DemocracyReferendum} from 'src/api/hooks/useDemocracyReferendums';
import {useDemocracyProposals, DemocracyProposal} from 'src/api/hooks/useDemocracyProposals';
import {Padder} from '@ui/components/Padder';
import {ActivityIndicator, useTheme, Card, Caption, Title, Subheading} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {fromNow} from 'src/utils/date';
import LoadingView from '@ui/components/LoadingView';
import {EmptyView} from '@ui/components/EmptyView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {ProgressChart} from '@ui/components/ProgressChart';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {democracyReferendumDetailScreen, democracyProposalDetailScreen} from '@ui/navigation/routeKeys';
import {FlashList} from '@shopify/flash-list';

const Tab = createMaterialTopTabNavigator();

export function DemocracyScreen() {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialLayout={{width}}
      screenOptions={{
        tabBarLabelStyle: {color: colors.text},
        tabBarItemStyle: {width: 200},
        tabBarStyle: {backgroundColor: colors.background},
      }}>
      <Tab.Screen name="Referendums" component={Referendums} />
      <Tab.Screen name="Proposals" component={Proposals} />
    </Tab.Navigator>
  );
}

type ProposalTeaserHeaderProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export function ProposalTeaserHeader({index, title, subtitle}: ProposalTeaserHeaderProps) {
  return (
    <View style={globalStyles.rowContainer}>
      <Title>{index}</Title>
      <View style={styles.marginHorizontal}>
        <Subheading>{title}</Subheading>
        {subtitle ? <Caption>{subtitle}</Caption> : null}
      </View>
    </View>
  );
}

type ReferendumTeaserProps = {
  referendum: DemocracyReferendum;
  onPress: (id: string) => void;
};

function ReferendumTeaser({referendum, onPress}: ReferendumTeaserProps) {
  const referendumIndex = referendum.id.split(':')[1] as string;

  return (
    <Card style={styles.standardPadding} onPress={() => onPress(referendum.id)}>
      <View style={styles.teaserContent}>
        <ProposalTeaserHeader
          index={referendumIndex}
          title={referendum.title}
          subtitle={`${fromNow(referendum.date)} | ${referendum.status}`}
        />

        <Padder />
        <Row label={'Aye'}>
          <Caption>{referendum.formattedAye}</Caption>
        </Row>
        <Row label={'Nay'}>
          <Caption>{referendum.formattedNay}</Caption>
        </Row>
        <Row label={'Support'}>
          <View style={globalStyles.rowAlignCenter}>
            <ProgressChart percent={referendum.ayePercent / 100} width={50} strokeWidth={7} />
            <Padder scale={0.5} />
            <Caption>{referendum.voteThreshold}</Caption>
          </View>
        </Row>
      </View>
    </Card>
  );
}

export function Referendums({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {colors} = useTheme();
  const {data: referendums, loading, fetchMore, fetchingMore, refetch, refetching} = useDemocracyReferendums();

  const toReferendumDetails = React.useCallback(
    (id: string) => {
      navigation.navigate(democracyReferendumDetailScreen, {id});
    },
    [navigation],
  );

  const ListFooter = React.useCallback(() => {
    if (fetchingMore) {
      return (
        <>
          <Padder />
          <ActivityIndicator />
        </>
      );
    }

    return null;
  }, [fetchingMore]);

  return (
    <SafeView edges={noTopEdges}>
      {loading && !referendums ? (
        <LoadingView />
      ) : (
        <FlashList
          contentContainerStyle={styles.listContainer}
          data={referendums}
          renderItem={({item}) => <ReferendumTeaser referendum={item} onPress={toReferendumDetails} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyView}
          ItemSeparatorComponent={Padder}
          refreshControl={
            <RefreshControl
              onRefresh={refetch}
              refreshing={refetching}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          onEndReached={() => {
            fetchMore({
              variables: {
                offset: referendums?.length,
              },
            });
          }}
          ListFooterComponent={ListFooter}
          estimatedItemSize={referendums?.length}
        />
      )}
    </SafeView>
  );
}

type ProposalTeaserProps = {
  proposal: DemocracyProposal;
  onPress: (id: string) => void;
};

function ProposalTeaser({proposal, onPress}: ProposalTeaserProps) {
  return (
    <Card style={styles.standardPadding} onPress={() => onPress(proposal.id)}>
      <View style={styles.teaserContent}>
        <ProposalTeaserHeader
          index={proposal.proposalIndex.toString()}
          title={proposal.title}
          subtitle={`${fromNow(proposal.date)} | ${proposal.status}`}
        />

        <Padder />
        <Row label={'Deposit'}>
          <Caption>{proposal.formattedDepositAmount}</Caption>
        </Row>
        <Row label={'Proposer'}>
          <AccountTeaser account={proposal.proposer} />
        </Row>
      </View>
    </Card>
  );
}

export function Proposals({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {colors} = useTheme();
  const {data: proposals, loading, fetchMore, fetchingMore, refetch, refetching} = useDemocracyProposals();

  const toProposalDetails = React.useCallback(
    (id: string) => {
      navigation.navigate(democracyProposalDetailScreen, {id});
    },
    [navigation],
  );

  const ListFooter = React.useCallback(() => {
    if (fetchingMore) {
      return (
        <>
          <Padder />
          <ActivityIndicator />
        </>
      );
    }

    return null;
  }, [fetchingMore]);

  return (
    <SafeView edges={noTopEdges}>
      {loading && !proposals ? (
        <LoadingView />
      ) : (
        <FlashList
          contentContainerStyle={styles.listContainer}
          data={proposals}
          renderItem={({item}) => <ProposalTeaser proposal={item} onPress={toProposalDetails} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyView}
          ItemSeparatorComponent={Padder}
          refreshControl={
            <RefreshControl
              onRefresh={refetch}
              refreshing={refetching}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          onEndReached={() => {
            fetchMore({
              variables: {
                offset: proposals?.length,
              },
            });
          }}
          ListFooterComponent={ListFooter}
          estimatedItemSize={proposals?.length}
        />
      )}
    </SafeView>
  );
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Caption style={styles.rowLabel}>{label}:</Caption>
      <View style={globalStyles.flex}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: standardPadding * 2,
  },
  teaserContent: {
    marginLeft: standardPadding,
    marginRight: standardPadding * 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding,
  },
  rowLabel: {
    width: '25%',
  },
  standardPadding: {
    padding: standardPadding,
    marginHorizontal: standardPadding,
  },
  marginHorizontal: {
    flexShrink: 1,
    marginHorizontal: standardPadding,
  },
});
