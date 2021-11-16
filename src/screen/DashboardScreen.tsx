import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Divider, Icon, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import {useApi} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import {CouncilSummaryTeaser} from 'layout/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from 'layout/DemocracySummaryTeaser';
import {BountySummaryTeaser} from 'layout/BountySummaryTeaser';
import {TreasurySummaryTeaser} from 'layout/TreasurySummaryTeaser';
import FadeInAnimatedView from 'presentational/FadeInAnimatedView';
import NetworkItem from 'presentational/NetworkItem';
import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ApiLoadingStackParamList, DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';
import {
  councilScreen,
  democracyScreen,
  treasuryScreen,
  bountiesScreen,
  networkSelectionScreen,
} from 'src/navigation/routeKeys';
import globalStyles from 'src/styles';
import {useCustomBackHandler} from 'src/hook/useCustomBackHandler';
import {AppBar} from 'src/packages/base_components';

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
      <DashboardAppBar onNetworkSelect={() => navigation.navigate(networkSelectionScreen)} />
      <Divider style={styles.divider} />
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

export function DashboardHeaderLeft() {
  const navigation: PropTypes['navigation'] = useNavigation();
  return (
    <TopNavigationAction
      onPress={navigation.openDrawer}
      icon={(p) => {
        return <Icon {...p} name={'menu-2-outline'} />;
      }}
    />
  );
}

function DashboardAppBar({onNetworkSelect}: {onNetworkSelect: () => void}) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const {currentNetwork} = useContext(NetworkContext);
  const {status} = useApi();

  return (
    <AppBar.Header>
      <AppBar.Action icon="menu" onPress={navigation.openDrawer} />
      <AppBar.Content
        title="Litentry"
        onPress={onNetworkSelect}
        subtitle={
          currentNetwork ? (
            <NetworkItem item={currentNetwork} isConnected={status === 'connected' || status === 'ready'} />
          ) : null
        }
      />
    </AppBar.Header>
  );
}
