import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BountySummaryTeaser} from '@ui/components/BountySummaryTeaser';
import {CouncilSummaryTeaser} from '@ui/components/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from '@ui/components/DemocracySummaryTeaser';
import {TreasurySummaryTeaser} from '@ui/components/TreasurySummaryTeaser';
import FadeInAnimatedView from '@ui/components/FadeInAnimatedView';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useCustomBackHandler} from '@hooks/useCustomBackHandler';
import {ApiLoadingStackParamList, DashboardStackParamList, DrawerParamList} from '@ui/navigation/navigation';
import {bountiesScreen, councilScreen, democracyScreen, treasuryScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Layout} from '@ui/components/Layout';

type PropTypes = {
  navigation: CompositeNavigationProp<
    CompositeNavigationProp<
      StackNavigationProp<DashboardStackParamList>,
      StackNavigationProp<ApiLoadingStackParamList>
    >,
    DrawerNavigationProp<DrawerParamList>
  >;
};

function DashboardScreen({navigation}: PropTypes) {
  useCustomBackHandler();

  return (
    <Layout style={styles.container}>
      <FadeInAnimatedView>
        <View style={globalStyles.flex}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <DemocracySummaryTeaser onPress={() => navigation.navigate(democracyScreen)} />
            <CouncilSummaryTeaser onPress={() => navigation.navigate(councilScreen)} />
            <TreasurySummaryTeaser onPress={() => navigation.navigate(treasuryScreen)} />
            <BountySummaryTeaser onPress={() => navigation.navigate(bountiesScreen)} />
          </ScrollView>
        </View>
      </FadeInAnimatedView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: standardPadding * 3,
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
