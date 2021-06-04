import React, {useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {flowRight as compose} from 'lodash';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {Button, Divider, Icon, IconProps, Layout, Text, TopNavigationAction, useTheme} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import {BalanceContext} from 'context/BalanceContext';
import {AccountContext} from 'context/AccountContextProvider';
import FadeInAnimatedView from 'presentational/FadeInAnimatedView';
import withAddAccount, {InjectedPropTypes as AddAccountInjectedPropTypes} from 'src/hoc/withAddAccount';
import AccountTeaser from 'layout/AccountTeaser';
import globalStyles from 'src/styles';
import CouncilSummaryTeaser from 'layout/CouncilSummaryTeaser';
import TreasurySummaryTeaser from 'layout/TreasurySummaryTeaser';
import TipsSummaryTeaser from 'layout/tips/TipsSummaryTeaser';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {councilScreen, tips, treasuryScreen} from 'src/navigation/routeKeys';
import {NetworkContext} from 'context/NetworkContext';

type PropTypes = {
  navigation: CompositeNavigationProp<StackNavigationProp<AppStackParamList>, DrawerNavigationProp<DrawerParamList>>;
};

const AddIcon = (props: IconProps) => <Icon {...props} name="person-add-outline" />;

function DashboardScreen({navigation, accountAddProps}: PropTypes & AddAccountInjectedPropTypes) {
  const {show} = useContext(BalanceContext);
  const {accounts} = useContext(AccountContext);
  const {currentNetwork} = useContext(NetworkContext);

  const {status} = useContext(ChainApiContext);
  const account = accounts?.[0];
  const theme = useTheme();

  const renderTitle = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('NetworkSelectScreen')}>
        <Layout style={styles.titleContainer}>
          <Text category="s1">Litentry</Text>
          {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={status === 'ready'} /> : null}
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[globalStyles.flex]}>
      <ScreenNavigation
        accessoryLeft={
          <TopNavigationAction onPress={navigation.openDrawer} icon={(p) => <Icon {...p} name={'menu-2-outline'} />} />
        }
        accessoryRight={
          <TopNavigationAction onPress={show} icon={(p) => <Icon {...p} name={'credit-card-outline'} />} />
        }
        renderTitle={renderTitle}
      />
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
            <View style={[globalStyles.flex, styles.main, {backgroundColor: theme['background-basic-color-1']}]}>
              <ScrollView style={styles.scrollView}>
                <CouncilSummaryTeaser onMorePress={() => navigation.navigate(councilScreen)} />
                <TreasurySummaryTeaser onMorePress={() => navigation.navigate(treasuryScreen)} />
                <TipsSummaryTeaser onMorePress={() => navigation.navigate(tips)} />
              </ScrollView>
            </View>
          </>
        )}
      </FadeInAnimatedView>
    </View>
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
    alignItems: 'flex-start',
  },
  divider: {height: 2},
});

export default compose(withAddAccount)(DashboardScreen);
