import messaging from '@react-native-firebase/messaging';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {ChainApiContext} from 'context/ChainApiContext';
import React from 'react';
import {AccountsScreen} from 'screen/AccountsScreen';
import {AddAccountScreen} from 'screen/AddAccountScreen/AddAccountScreen';
import {ApiLoadingScreen} from 'screen/ApiLoadingScreen';
import {BalanceScreen} from 'screen/BalanceScreen';
import {BountiesScreen} from 'screen/Bounty/BountiesScreen';
import {BountyDetailScreen} from 'screen/Bounty/BountyDetailScreen';
import {ConnectionRetryScreen} from 'screen/ConnectionRetryScreen';
import {CandidateScreen} from 'screen/Council/CandidateScreen';
import {CouncilScreen} from 'screen/Council/CouncilScreen';
import {MotionsScreen} from 'screen/Council/MotionsScreen';
import {CreateAccountScreen} from 'screen/CreateAccount/CreateAccountScreen';
import {MnemonicScreen} from 'screen/CreateAccount/MnemonicScreen';
import {VerifyMnemonicScreen} from 'screen/CreateAccount/VerifyMnemonic';
import DashboardScreen from 'screen/DashboardScreen';
import {DemocracyProposalScreen} from 'screen/DemocracyProposalScreen';
import {DemocracyScreen} from 'screen/DemocracyScreen';
import DevScreen from 'screen/DevScreen';
import DrawerScreen from 'screen/Drawer/DrawerScreen';
import {ExportAccountWithJsonFileScreen} from 'screen/ExportAccountWithJsonFileScreen';
import {ImportAccountScreen, ImportScreenHeaderRight} from 'screen/ImportAccountScreen';
import {ImportAccountWithJsonFileScreen} from 'screen/ImportAccountWithJsonFileScreen';
import {MotionDetailScreen} from 'screen/MotionDetailScreen';
import {MyAccountScreen} from 'screen/MyAccountScreen';
import {IdentityGuideScreen} from 'screen/MyIdentityScreen/IdentityGuideScreen';
import ManageIdentityScreen from 'screen/MyIdentityScreen/ManageIdentity';
import {NetworkSelectionScreen} from 'screen/NetworkSelectionScreen';
import {NotificationSettingsScreen} from 'screen/NotificationSettingsScreen';
import {ParachainsAuctionsScreen} from 'screen/Parachains/ParachainAuctionsScreen';
import {CrowdLoanFundDetailScreen} from 'screen/Parachains/CrowdLoanFundDetailScreen';
import {CrowdLoanScreen} from 'screen/Parachains/CrowdLoanScreen';
import {ParachainsOverviewScreen} from 'screen/Parachains/OverviewScreen';
import {ParachainDetailScreen} from 'screen/Parachains/ParachainDetailScreen';
import {ParathreadsScreen} from 'screen/Parachains/ParathreadsScreen';
import {PermissionGrantingPrompt} from 'screen/PermissionGrantingPrompt';
import {PolkassemblyDiscussionDetail} from 'screen/Polkassembly/PolkassemblyDiscussionDetail';
import {PolkassemblyDiscussions} from 'screen/Polkassembly/PolkassemblyDiscussions';
import {ProposeTipScreen} from 'screen/ProposeTipScreen';
import {ReferendumScreen} from 'screen/ReferendumScreen';
import RegistrarListScreen from 'screen/RegistrarListScreen';
import {RegisterSubIdentitiesScreen} from 'screen/subIdentities/RegisterSubIdentitiesScreen';
import TipDetailScreen from 'screen/tips/TipDetailScreen';
import {TreasuryScreen} from 'screen/TreasuryScreen';
import WebviewScreen from 'screen/WebviewScreen';
import {useAppBackgroundApiReconnect} from 'src/hook/useAppBackgroundApiReconnect';
import {useFirebase} from 'src/hook/useFirebase';
import {usePushAuthorizationStatus} from 'src/hook/usePushNotificationsPermissions';
import {useTurnOnAllNotificationsOnAppStartForAndroid} from 'src/hook/useTurnOnAllNotificationsOnAppStartForAndroid';
import {DashboardAppBar, MainDrawerAppBar, MainStackAppBar} from 'src/navigation/AppBars';
import {
  AccountsStackParamList,
  ApiLoadingStackParamList,
  AppStackParamList,
  DashboardStackParamList,
  DrawerParamList,
  ParachainsStackParamList,
  PolkassemblyDiscussionStackParamList,
  RootStackParamList,
} from 'src/navigation/navigation';
import * as routeKeys from 'src/navigation/routeKeys';
import {AppBar, IconButton} from 'src/packages/base_components';
import {AccountsGuideScreen} from 'screen/AccountsGuideScreen';
import {CalendarScreen} from 'screen/CalendarScreen';
import {ReceiveFundScreen} from 'screen/ReceiveFundScreen';

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
      <DashboardStack.Screen name={routeKeys.calendarScreen} component={CalendarScreen} />
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
      <AccountsStack.Screen
        name={routeKeys.receiveFundScreen}
        component={ReceiveFundScreen}
        options={overlayScreenOptions}
      />
      <AccountsStack.Screen
        name={routeKeys.addAccountScreen}
        component={AddAccountScreen}
        options={overlayScreenOptions}
      />
      <AccountsStack.Screen name={routeKeys.balanceScreen} component={BalanceScreen} options={overlayScreenOptions} />
      <AccountsStack.Screen
        name={routeKeys.identityGuideScreen}
        component={IdentityGuideScreen}
        options={overlayScreenOptions}
      />
      <AccountsStack.Screen
        name={routeKeys.accountsGuideScreen}
        component={AccountsGuideScreen}
        options={overlayScreenOptions}
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
    <AppStack.Navigator screenOptions={overlayScreenOptions}>
      {pushAuthorizationStatus && pushAuthorizationStatus === messaging.AuthorizationStatus.NOT_DETERMINED ? (
        <AppStack.Screen name={routeKeys.permissionGrantingPromptScreen} component={PermissionGrantingPrompt} />
      ) : undefined}
      <AppStack.Screen name={routeKeys.drawerNavigatorScreen} component={DrawerNavigator} />
    </AppStack.Navigator>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  useAppBackgroundApiReconnect();
  useTurnOnAllNotificationsOnAppStartForAndroid();
  const {status} = React.useContext(ChainApiContext);

  return (
    <RootStack.Navigator screenOptions={overlayScreenOptions}>
      {status === 'ready' ? <RootStack.Screen name={routeKeys.appStack} component={AppNavigator} /> : undefined}
      <RootStack.Screen name={routeKeys.apiLoadingStack} component={ApiLoadingNavigator} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;

const overlayScreenOptions: StackNavigationOptions = {
  presentation: 'transparentModal',
  headerShown: false,
  animationEnabled: false,
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  gestureEnabled: false,
};
