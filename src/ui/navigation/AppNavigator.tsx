import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {ChainApiContext} from 'context/ChainApiContext';
import {AccountsScreen} from '@ui/screens/AccountsScreen';
import {AddAccountScreen} from '@ui/screens/AddAccountScreen/AddAccountScreen';
import {ApiLoadingScreen} from '@ui/screens/ApiLoadingScreen';
import {BalanceScreen} from '@ui/screens/BalanceScreen';
import {BountiesScreen} from '@ui/screens/Bounty/BountiesScreen';
import {BountyDetailScreen} from '@ui/screens/Bounty/BountyDetailScreen';
import {ConnectionRetryScreen} from '@ui/screens/ConnectionRetryScreen';
import {CandidateScreen} from '@ui/screens/Council/CandidateScreen';
import {CouncilScreen} from '@ui/screens/Council/CouncilScreen';
import {MotionsScreen} from '@ui/screens/Council/MotionsScreen';
import {CreateAccountScreen} from '@ui/screens/CreateAccount/CreateAccountScreen';
import {MnemonicScreen} from '@ui/screens/CreateAccount/MnemonicScreen';
import {VerifyMnemonicScreen} from '@ui/screens/CreateAccount/VerifyMnemonic';
import DashboardScreen from '@ui/screens/DashboardScreen';
import {DemocracyProposalScreen} from '@ui/screens/DemocracyProposalScreen';
import {DemocracyScreen} from '@ui/screens/DemocracyScreen';
import DevScreen from '@ui/screens/DevScreen';
import DrawerScreen from '@ui/screens/Drawer/DrawerScreen';
import {ExportAccountWithJsonFileScreen} from '@ui/screens/ExportAccountWithJsonFileScreen';
import {ImportAccountScreen, ImportScreenHeaderRight} from '@ui/screens/ImportAccountScreen';
import {ImportAccountWithJsonFileScreen} from '@ui/screens/ImportAccountWithJsonFileScreen';
import {MotionDetailScreen} from '@ui/screens/MotionDetailScreen';
import {MyAccountScreen} from '@ui/screens/MyAccountScreen';
import {IdentityGuideScreen} from '@ui/screens/MyIdentityScreen/IdentityGuideScreen';
import ManageIdentityScreen from '@ui/screens/MyIdentityScreen/ManageIdentity';
import {NetworkSelectionScreen} from '@ui/screens/NetworkSelectionScreen';
import {NotificationSettingsScreen} from '@ui/screens/NotificationSettingsScreen';
import {ParachainsAuctionsScreen} from '@ui/screens/Parachains/ParachainAuctionsScreen';
import {CrowdLoanFundDetailScreen} from '@ui/screens/Parachains/CrowdLoanFundDetailScreen';
import {CrowdLoanScreen} from '@ui/screens/Parachains/CrowdLoanScreen';
import {ParachainsOverviewScreen} from '@ui/screens/Parachains/OverviewScreen';
import {ParachainDetailScreen} from '@ui/screens/Parachains/ParachainDetailScreen';
import {ParathreadsScreen} from '@ui/screens/Parachains/ParathreadsScreen';
import {PermissionGrantingPrompt} from '@ui/screens/PermissionGrantingPrompt';
import {PolkassemblyDiscussionDetail} from '@ui/screens/Polkassembly/PolkassemblyDiscussionDetail';
import {PolkassemblyDiscussions} from '@ui/screens/Polkassembly/PolkassemblyDiscussions';
import {ProposeTipScreen} from '@ui/screens/ProposeTipScreen';
import {ReferendumScreen} from '@ui/screens/ReferendumScreen';
import RegistrarListScreen from '@ui/screens/RegistrarListScreen';
import {RegisterSubIdentitiesScreen} from '@ui/screens/subIdentities/RegisterSubIdentitiesScreen';
import TipDetailScreen from '@ui/screens/tips/TipDetailScreen';
import {TreasuryScreen} from '@ui/screens/TreasuryScreen';
import WebviewScreen from '@ui/screens/WebviewScreen';
import {useAppBackgroundApiReconnect} from 'src/hook/useAppBackgroundApiReconnect';
import {useFirebase} from 'src/hook/useFirebase';
import {usePushAuthorizationStatus} from 'src/hook/usePushNotificationsPermissions';
import {useTurnOnAllNotificationsOnAppStartForAndroid} from 'src/hook/useTurnOnAllNotificationsOnAppStartForAndroid';
import {DashboardAppBar, MainDrawerAppBar, MainStackAppBar} from '@ui/navigation/AppBars';
import {
  AccountsStackParamList,
  ApiLoadingStackParamList,
  AppStackParamList,
  DashboardStackParamList,
  DrawerParamList,
  ParachainsStackParamList,
  PolkassemblyDiscussionStackParamList,
  RootStackParamList,
} from '@ui/navigation/navigation';
import * as routeKeys from '@ui/navigation/routeKeys';
import {AppBar, IconButton} from '@ui/library';
import {AccountsGuideScreen} from '@ui/screens/AccountsGuideScreen';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  useFirebase();

  return (
    <DashboardStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <DashboardStack.Screen
        name={routeKeys.dashboardScreen}
        component={DashboardScreen}
        options={{header: (props) => <DashboardAppBar {...props} />}}
      />
      <DashboardStack.Screen name={routeKeys.motionDetailScreen} component={MotionDetailScreen} />
      <DashboardStack.Screen name={routeKeys.tipDetailScreen} component={TipDetailScreen} />
      <DashboardStack.Screen name={routeKeys.councilScreen} component={CouncilScreen} />
      <DashboardStack.Screen name={routeKeys.candidateScreen} component={CandidateScreen} />
      <DashboardStack.Screen name={routeKeys.treasuryScreen} component={TreasuryScreen} />
      <DashboardStack.Screen name={routeKeys.proposeTipScreen} component={ProposeTipScreen} />
      <DashboardStack.Screen name={routeKeys.motionsScreen} component={MotionsScreen} />
      <DashboardStack.Screen name={routeKeys.democracyScreen} component={DemocracyScreen} />
      <DashboardStack.Screen name={routeKeys.referendumScreen} component={ReferendumScreen} />
      <DashboardStack.Screen
        name={routeKeys.democracyProposalScreen}
        component={DemocracyProposalScreen}
        options={{title: 'Proposal'}}
      />
      <DashboardStack.Screen name={routeKeys.bountiesScreen} component={BountiesScreen} />
      <DashboardStack.Screen name={routeKeys.bountyDetailScreen} component={BountyDetailScreen} />
    </DashboardStack.Navigator>
  );
}

const AccountsStack = createStackNavigator<AccountsStackParamList>();

function AccountsNavigator() {
  return (
    <AccountsStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <AccountsStack.Screen
        name={routeKeys.accountsScreen}
        component={AccountsScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton icon="information" onPress={() => navigation.navigate(routeKeys.accountsGuideScreen)} />
          ),
        })}
      />
      <AccountsStack.Screen name={routeKeys.manageIdentityScreen} component={ManageIdentityScreen} />
      <AccountsStack.Screen name={routeKeys.myAccountScreen} component={MyAccountScreen} />
      <AccountsStack.Screen name={routeKeys.registerSubIdentitiesScreen} component={RegisterSubIdentitiesScreen} />
      <AccountsStack.Screen name={routeKeys.mnemonicScreen} component={MnemonicScreen} />
      <AccountsStack.Screen name={routeKeys.verifyMnemonicScreen} component={VerifyMnemonicScreen} />
      <AccountsStack.Screen name={routeKeys.createAccountScreen} component={CreateAccountScreen} />
      <AccountsStack.Screen
        name={routeKeys.importAccountScreen}
        component={ImportAccountScreen}
        options={{headerRight: () => <ImportScreenHeaderRight />}}
      />
      <AccountsStack.Screen
        name={routeKeys.importAccountWithJsonFileScreen}
        component={ImportAccountWithJsonFileScreen}
      />
      <AccountsStack.Screen
        name={routeKeys.exportAccountWithJsonFileScreen}
        component={ExportAccountWithJsonFileScreen}
      />
    </AccountsStack.Navigator>
  );
}

const DiscussionNavigator = createStackNavigator<PolkassemblyDiscussionStackParamList>();

function PolkassemblyDiscussionsNavigator() {
  return (
    <DiscussionNavigator.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <DiscussionNavigator.Screen
        name={routeKeys.polkassemblyDiscussions}
        component={PolkassemblyDiscussions}
        options={{title: 'Discussions'}}
      />
      <DiscussionNavigator.Screen
        name={routeKeys.polkassemblyDiscussionDetail}
        component={PolkassemblyDiscussionDetail}
        options={{title: 'Discussion'}}
      />
    </DiscussionNavigator.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} />}
      screenOptions={{header: (props) => <MainDrawerAppBar {...props} />}}>
      <Drawer.Screen
        name={routeKeys.dashboardNavigator}
        component={DashboardStackNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen name={routeKeys.accountsNavigator} component={AccountsNavigator} options={{headerShown: false}} />
      <Drawer.Screen name={routeKeys.registrarListScreen} component={RegistrarListScreen} />
      <Drawer.Screen
        name={routeKeys.parachainsNavigator}
        component={ParachainsNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={routeKeys.polkassemblyDiscussionsNavigator}
        component={PolkassemblyDiscussionsNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={routeKeys.webviewScreen}
        component={WebviewScreen}
        options={({route}) => ({title: route?.params?.title})}
      />
      <Drawer.Screen name={routeKeys.devScreen} component={DevScreen} />
      <Drawer.Screen name={routeKeys.notificationSettingsScreen} component={NotificationSettingsScreen} />
    </Drawer.Navigator>
  );
}

const ParachainsStack = createStackNavigator<ParachainsStackParamList>();

function ParachainsNavigator() {
  return (
    <ParachainsStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <ParachainsStack.Screen
        name={routeKeys.parachainsOverviewScreen}
        component={ParachainsOverviewScreen}
        options={{
          title: 'Overview',
          headerLeft: (props) => <AppBar.Action icon="menu" {...props} />,
        }}
      />
      <ParachainsStack.Screen
        name={routeKeys.crowdloanScreen}
        component={CrowdLoanScreen}
        options={{
          headerLeft: (props) => <AppBar.Action icon="menu" {...props} />,
        }}
      />
      <ParachainsStack.Screen
        options={{
          headerLeft: (props) => <AppBar.Action icon="menu" {...props} />,
        }}
        name={routeKeys.parathreadsScreen}
        component={ParathreadsScreen}
      />
      <ParachainsStack.Screen
        options={{
          title: 'Auctions',
          headerLeft: (props) => <AppBar.Action icon="menu" {...props} />,
        }}
        name={routeKeys.parachainAuctionsScreen}
        component={ParachainsAuctionsScreen}
      />
      <ParachainsStack.Screen
        name={routeKeys.parachainDetailScreen}
        component={ParachainDetailScreen}
        options={{title: 'Parachain'}}
      />
      <ParachainsStack.Screen
        name={routeKeys.crowdloanFundDetailScreen}
        component={CrowdLoanFundDetailScreen}
        options={{title: 'Fund details'}}
      />
    </ParachainsStack.Navigator>
  );
}

const ApiLoadingStack = createStackNavigator<ApiLoadingStackParamList>();

function ApiLoadingNavigator() {
  return (
    <ApiLoadingStack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <ApiLoadingStack.Screen name={routeKeys.apiLoadingScreen} component={ApiLoadingScreen} />
      <ApiLoadingStack.Screen name={routeKeys.networkSelectionScreen} component={NetworkSelectionScreen} />
      <ApiLoadingStack.Screen name={routeKeys.connectionRetryScreen} component={ConnectionRetryScreen} />
    </ApiLoadingStack.Navigator>
  );
}

const AppStack = createStackNavigator<AppStackParamList>();

function AppNavigator() {
  const {pushAuthorizationStatus, isLoading} = usePushAuthorizationStatus();

  // We need this here, because otherwise PermissionGrantingPrompt
  // wouldn't mount on the first render, loading indicator is not necessary
  // because the promise is resolving almost immediately
  if (isLoading) {
    return null;
  }

  return (
    <AppStack.Navigator
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
        animationEnabled: false,
        cardStyle: {
          backgroundColor: 'transparent',
          opacity: 1,
        },
        gestureEnabled: false,
      }}>
      {pushAuthorizationStatus && pushAuthorizationStatus === messaging.AuthorizationStatus.NOT_DETERMINED ? (
        <AppStack.Screen name={routeKeys.permissionGrantingPromptScreen} component={PermissionGrantingPrompt} />
      ) : undefined}
      <AppStack.Screen name={routeKeys.drawerNavigatorScreen} component={DrawerNavigator} />
      <AppStack.Screen name={routeKeys.addAccountScreen} component={AddAccountScreen} />
      <AppStack.Screen name={routeKeys.balanceScreen} component={BalanceScreen} />
      <AppStack.Screen name={routeKeys.identityGuideScreen} component={IdentityGuideScreen} />
      <AppStack.Screen name={routeKeys.accountsGuideScreen} component={AccountsGuideScreen} />
    </AppStack.Navigator>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  useAppBackgroundApiReconnect();
  useTurnOnAllNotificationsOnAppStartForAndroid();
  const {status} = React.useContext(ChainApiContext);

  return (
    <RootStack.Navigator
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
        animationEnabled: false,
        cardStyle: {
          backgroundColor: 'transparent',
          opacity: 1,
        },
        gestureEnabled: false,
      }}>
      {status === 'ready' ? <RootStack.Screen name={routeKeys.appStack} component={AppNavigator} /> : undefined}
      <RootStack.Screen name={routeKeys.apiLoadingStack} component={ApiLoadingNavigator} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
