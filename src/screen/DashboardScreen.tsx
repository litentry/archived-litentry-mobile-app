import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';
import {BountySummaryTeaser} from 'layout/BountySummaryTeaser';
import {CouncilSummaryTeaser} from 'layout/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from 'layout/DemocracySummaryTeaser';
import {TreasurySummaryTeaser} from 'layout/TreasurySummaryTeaser';
import FadeInAnimatedView from 'presentational/FadeInAnimatedView';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useCustomBackHandler} from 'src/hook/useCustomBackHandler';
import {ApiLoadingStackParamList, DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';
import {bountiesScreen, calendarScreen, councilScreen, democracyScreen, treasuryScreen} from 'src/navigation/routeKeys';
import globalStyles from 'src/styles';
import {Button} from 'src/packages/base_components';

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
            <Button onPress={() => navigation.navigate(calendarScreen)}>Calendar</Button>
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
