import React, {useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import {flowRight as compose} from 'lodash';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {
  Text,
  Layout,
  Divider,
  Button,
  Icon,
  IconProps,
  useTheme,
} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import {BalanceContext} from 'context/BalanceContext';
import {AccountContext} from 'context/AccountContextProvider';
import FadeInAnimatedView from 'presentational/FadeInAnimatedView';
import withAddAccount, {
  InjectedPropTypes as AddAccountInjectedPropTypes,
} from 'src/hoc/withAddAccount';
import AccountTeaser from 'layout/AccountTeaser';
import globalStyles from 'src/styles';
import CouncilSummaryTeaser from 'layout/CouncilSummaryTeaser';
import TreasurySummaryTeaser from 'layout/TreasurySummaryTeaser';
import withNetworkSelect, {
  InjectedPropTypes as NetworkSelectInjectedPropTypes,
} from 'src/hoc/withNetworkSelect';
import TipsSummaryTeaser from 'layout/tips/TipsSummaryTeaser';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {tips} from 'src/navigation/routeKeys';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DashboardStackParamList>,
    DrawerNavigationProp<DrawerParamList>
  >;
};

const AddIcon = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);

function DashboardScreen({
  navigation,
  accountAddProps,
  networkSelection,
}: PropTypes & AddAccountInjectedPropTypes & NetworkSelectInjectedPropTypes) {
  const {show} = useContext(BalanceContext);
  const {accounts} = useContext(AccountContext);

  const {status} = useContext(ChainApiContext);
  const account = accounts?.[0];
  const theme = useTheme();

  const renderTitle = () => {
    return (
      <TouchableOpacity onPress={networkSelection.selectNetwork}>
        <Layout style={styles.titleContainer}>
          <Text category="s1">Litentry</Text>
          {networkSelection.currentNetwork ? (
            <NetworkItem
              item={networkSelection.currentNetwork}
              isConnected={status === 'ready'}
            />
          ) : null}
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[globalStyles.flex]}>
      <ScreenNavigation
        onMenuPress={() => navigation.openDrawer()}
        onBalancePress={show}
        renderTitle={renderTitle}
      />
      <Divider style={{height: 2}} />
      <FadeInAnimatedView>
        {!account ? (
          <Layout style={styles.container} level="1">
            <Button
              size="large"
              appearance="ghost"
              onPress={accountAddProps.open}
              accessoryLeft={AddIcon}>
              Add Account
            </Button>
          </Layout>
        ) : (
          <>
            <AccountTeaser level="2" address={account.address} />
            <Divider />
            <View
              style={[
                globalStyles.flex,
                styles.main,
                {backgroundColor: theme['background-basic-color-1']},
              ]}>
              <ScrollView style={styles.scrollView}>
                <CouncilSummaryTeaser
                  onMorePress={() => Alert.alert('Navigate to Council Screen')}
                />
                <TreasurySummaryTeaser
                  onMorePress={() => Alert.alert('Navigate to Treasury Screen')}
                />
                <TipsSummaryTeaser
                  onMorePress={() => navigation.navigate(tips)}
                />
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
});

export default compose(withAddAccount, withNetworkSelect)(DashboardScreen);
