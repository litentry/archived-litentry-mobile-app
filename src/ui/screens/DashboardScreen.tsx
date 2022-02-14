import React from 'react';
import {StyleSheet} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BountySummaryTeaser} from '@ui/components/BountySummaryTeaser';
import {CouncilSummaryTeaser} from '@ui/components/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from '@ui/components/DemocracySummaryTeaser';
import {TreasurySummaryTeaser} from '@ui/components/TreasurySummaryTeaser';
import {DashboardStackParamList, DrawerParamList} from '@ui/navigation/navigation';
import {bountiesScreen, councilScreen, democracyScreen, treasuryScreen} from '@ui/navigation/routeKeys';
import {standardPadding} from '@ui/styles';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {ScrollView} from '@ui/components/ScrollView';
import {DEMOCRACY_SUMMARY_QUERY} from 'src/api/hooks/useDemocracySummary';
import {COUNCIL_SUMMARY_QUERY} from 'src/api/hooks/useCouncilSummary';
import {BOUNTIES_SUMMARY_QUERY} from 'src/api/hooks/useBountiesSummary';

// TODO: add treasury summary query when merged
const refetchQueries = [DEMOCRACY_SUMMARY_QUERY, COUNCIL_SUMMARY_QUERY, BOUNTIES_SUMMARY_QUERY];

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DashboardStackParamList>,
    DrawerNavigationProp<DrawerParamList>
  >;
};

function DashboardScreen({navigation}: PropTypes) {
  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} refetchQueries={refetchQueries}>
        <DemocracySummaryTeaser onPress={() => navigation.navigate(democracyScreen)} />
        <Padder scale={1} />
        <CouncilSummaryTeaser onPress={() => navigation.navigate(councilScreen)} />
        <Padder scale={1} />
        <TreasurySummaryTeaser onPress={() => navigation.navigate(treasuryScreen)} />
        <Padder scale={1} />
        <BountySummaryTeaser onPress={() => navigation.navigate(bountiesScreen)} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: standardPadding * 2,
    paddingBottom: standardPadding * 6,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  divider: {height: 2},
});

export default DashboardScreen;
