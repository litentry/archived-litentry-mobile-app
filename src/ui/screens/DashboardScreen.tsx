import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {BountySummaryTeaser} from '@ui/components/BountySummaryTeaser';
import {CouncilSummaryTeaser} from '@ui/components/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from '@ui/components/DemocracySummaryTeaser';
import {TreasurySummaryTeaser} from '@ui/components/TreasurySummaryTeaser';
import FadeInAnimatedView from '@ui/components/FadeInAnimatedView';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useCustomBackHandler} from '@hooks/useCustomBackHandler';
import {ApiLoadingStackParamList, DashboardStackParamList, DrawerParamList} from '@ui/navigation/navigation';
import {bountiesScreen, councilScreen, democracyScreen, treasuryScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';

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
        <View style={[globalStyles.flex, styles.main]}>
          <ScrollView style={styles.scrollView}>
            <DemocracySummaryTeaser onPressMore={() => navigation.navigate(democracyScreen)} />
            <CouncilSummaryTeaser onPressMore={() => navigation.navigate(councilScreen)} />
            <TreasurySummaryTeaser onPressMore={() => navigation.navigate(treasuryScreen)} />
            <BountySummaryTeaser onPressMore={() => navigation.navigate(bountiesScreen)} />
          </ScrollView>
        </View>
      </FadeInAnimatedView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  main: {},
  scrollView: {},
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  divider: {height: 2},
});

export default DashboardScreen;
