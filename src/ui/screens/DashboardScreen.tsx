import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BountySummaryTeaser} from '@ui/components/BountySummaryTeaser';
import {CouncilSummaryTeaser} from '@ui/components/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from '@ui/components/DemocracySummaryTeaser';
import {TreasurySummaryTeaser} from '@ui/components/TreasurySummaryTeaser';
import {ScrollView, StyleSheet} from 'react-native';
import {DashboardStackParamList, DrawerParamList} from '@ui/navigation/navigation';
import {bountiesScreen, councilScreen, democracyScreen, treasuryScreen} from '@ui/navigation/routeKeys';
import {standardPadding} from '@ui/styles';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DashboardStackParamList>,
    DrawerNavigationProp<DrawerParamList>
  >;
};

function DashboardScreen({navigation}: PropTypes) {
  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <DemocracySummaryTeaser onPress={() => navigation.navigate(democracyScreen)} />
        <Padder scale={0.6} />
        <CouncilSummaryTeaser onPress={() => navigation.navigate(councilScreen)} />
        <Padder scale={0.6} />
        <TreasurySummaryTeaser onPress={() => navigation.navigate(treasuryScreen)} />
        <Padder scale={0.6} />
        <BountySummaryTeaser onPress={() => navigation.navigate(bountiesScreen)} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: standardPadding * 1.5,
    paddingHorizontal: standardPadding * 1.5,
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
