import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Button, Divider, Icon, IconProps, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import {BalanceContext} from 'context/BalanceContext';
import {useAccounts} from 'context/AccountsContext';
import FadeInAnimatedView from 'presentational/FadeInAnimatedView';
import withAddAccount, {InjectedPropTypes as AddAccountInjectedPropTypes} from 'src/hoc/withAddAccount';
import AccountTeaser from 'layout/AccountTeaser';
import globalStyles from 'src/styles';
import CouncilSummaryTeaser from 'layout/CouncilSummaryTeaser';
import TreasurySummaryTeaser from 'layout/TreasurySummaryTeaser';
import TipsSummaryTeaser from 'layout/tips/TipsSummaryTeaser';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {councilScreen, tipsScreen, treasuryScreen} from 'src/navigation/routeKeys';
import LoadingView from 'src/presentational/LoadingView';
import NetworkSelect from 'src/layout/NetworkSelect';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {NetworkContext} from 'context/NetworkContext';
import {DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DashboardStackParamList>,
    DrawerNavigationProp<DrawerParamList>
  >;
};

const AddIcon = (props: IconProps) => <Icon {...props} name="person-add-outline" />;

function DashboardScreen({navigation, accountAddProps}: PropTypes & AddAccountInjectedPropTypes) {
  const {accounts, isLoading} = useAccounts();
  const [networkSelectOpen, setNetworkSelectOpen] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: DashboardHeaderLeft,
      headerRight: DashboardHeaderRight,
      headerTitle: () => <DashboardTitle setNetworkSelectOpen={setNetworkSelectOpen} />,
    });
  }, [navigation, setNetworkSelectOpen]);

  if (isLoading) {
    return <LoadingView />;
  }

  const account = accounts[0]; // TODO: change this when adding multi account support

  return (
    <SafeView edges={noTopEdges}>
      <Divider style={styles.divider} />
      <FadeInAnimatedView>
        {!account ? (
          <Layout style={styles.container} level="1">
            <Button size="large" appearance="ghost" onPress={accountAddProps.open} accessoryLeft={AddIcon}>
              Add Account
            </Button>
          </Layout>
        ) : (
          <>
            <AccountTeaser level="2" address={account.address} />
            <Divider />
            <View style={[globalStyles.flex, styles.main]}>
              <ScrollView style={styles.scrollView}>
                <CouncilSummaryTeaser onMorePress={() => navigation.navigate(councilScreen)} />
                <TreasurySummaryTeaser onMorePress={() => navigation.navigate(treasuryScreen)} />
                <TipsSummaryTeaser onMorePress={() => navigation.navigate(tipsScreen)} />
              </ScrollView>
            </View>
          </>
        )}
      </FadeInAnimatedView>
      <NetworkSelect open={networkSelectOpen} onClose={() => setNetworkSelectOpen(false)} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  main: {},
  scrollView: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  divider: {height: 2},
});

export default withAddAccount(DashboardScreen);

function DashboardHeaderRight() {
  const {show} = useContext(BalanceContext);
  return <TopNavigationAction onPress={show} icon={(p) => <Icon {...p} name={'credit-card-outline'} />} />;
}

export function DashboardHeaderLeft() {
  const navigation: PropTypes['navigation'] = useNavigation();
  return <TopNavigationAction onPress={navigation.openDrawer} icon={(p) => <Icon {...p} name={'menu-2-outline'} />} />;
}

function DashboardTitle({setNetworkSelectOpen}: {setNetworkSelectOpen: (v: boolean) => void}) {
  const {currentNetwork} = useContext(NetworkContext);
  const {status} = useContext(ChainApiContext);

  return (
    <TouchableOpacity style={styles.titleContainer} onPress={() => setNetworkSelectOpen(true)}>
      <Text category="s1">Litentry</Text>
      {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={status === 'ready'} /> : null}
    </TouchableOpacity>
  );
}
