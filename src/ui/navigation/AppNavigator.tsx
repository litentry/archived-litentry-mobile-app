import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {AccountsScreen} from '@ui/screens/AccountsScreen';
import {AddAccountScreen} from '@ui/screens/AddAccountScreen/AddAccountScreen';
import {BalanceScreen} from '@ui/screens/BalanceScreen';
import {BountiesScreen} from '@ui/screens/Bounty/BountiesScreen';
import {BountyDetailScreen} from '@ui/screens/Bounty/BountyDetailScreen';
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
import {ImportAccountScreen} from '@ui/screens/ImportAccountScreen';
import {MotionDetailScreen} from '@ui/screens/MotionDetailScreen';
import {MyAccountScreen} from '@ui/screens/MyAccountScreen';
import {IdentityGuideScreen} from '@ui/screens/MyIdentityScreen/IdentityGuideScreen';
import ManageIdentityScreen from '@ui/screens/MyIdentityScreen/ManageIdentity';
import {NetworkSelectionScreen} from '@ui/screens/NetworkSelectionScreen';
import {NotificationSettingsScreen} from '@ui/screens/NotificationSettingsScreen';
import {ParachainsAuctionsScreen} from '@ui/screens/Parachains/ParachainAuctionsScreen';
import {CrowdloanFundDetailScreen} from '@ui/screens/Parachains/CrowdloanFundDetailScreen';
import {CrowdloanScreen} from '@ui/screens/Parachains/CrowdloanScreen';
import {ParachainsOverviewScreen} from '@ui/screens/Parachains/OverviewScreen';
import {ParachainDetailScreen} from '@ui/screens/Parachains/ParachainDetailScreen';
import {ParathreadsScreen} from '@ui/screens/Parachains/ParathreadsScreen';
import {PermissionGrantingPrompt} from '@ui/screens/PermissionGrantingPrompt';
import {PolkassemblyDiscussionDetail} from '@ui/screens/Polkassembly/PolkassemblyDiscussionDetail';
import {PolkassemblyDiscussions} from '@ui/screens/Polkassembly/PolkassemblyDiscussions';
import {ProposeTipScreen} from '@ui/screens/ProposeTipScreen';
import {ReferendumScreen} from '@ui/screens/ReferendumScreen';
import RegistrarListScreen from '@ui/screens/RegistrarListScreen';
import {RegisterSubIdentitiesScreen} from '@ui/screens/SubIdentities/RegisterSubIdentitiesScreen';
import TipDetailScreen from '@ui/screens/Tips/TipDetailScreen';
import {TreasuryScreen} from '@ui/screens/TreasuryScreen';
import WebviewScreen from '@ui/screens/WebviewScreen';
import {useFirebase} from '@hooks/useFirebase';
import {useTurnOnAllNotificationsOnAppStartForAndroid} from '@hooks/useTurnOnAllNotificationsOnAppStartForAndroid';
import {usePushAuthorizationStatus} from '@hooks/usePushNotificationsPermissions';
import {MainAppBar, MainDrawerAppBar, MainStackAppBar} from '@ui/navigation/AppBars';
import {
  AccountsStackParamList,
  AppStackParamList,
  DashboardStackParamList,
  DrawerParamList,
  ParachainsStackParamList,
  PolkassemblyDiscussionStackParamList,
} from '@ui/navigation/navigation';
import * as routeKeys from '@ui/navigation/routeKeys';
import {AppBar, IconButton} from '@ui/library';
import {AccountsGuideScreen} from '@ui/screens/AccountsGuideScreen';
import {ReceiveFundScreen} from '@ui/screens/ReceiveFundScreen';
import {SendFundScreen} from '@ui/screens/SendFundScreen';
import {FeedbackScreen} from '@ui/screens/FeedbackScreen';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  useFirebase();

  return (
    <DashboardStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <DashboardStack.Screen
        name={routeKeys.dashboardScreen}
        component={DashboardScreen}
        options={{header: (props) => <MainAppBar {...props} />}}
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
      <AccountsStack.Screen name={routeKeys.importAccountScreen} component={ImportAccountScreen} />
      <AccountsStack.Screen
        name={routeKeys.exportAccountWithJsonFileScreen}
        component={ExportAccountWithJsonFileScreen}
      />
      <AccountsStack.Screen
        name={routeKeys.receiveFundScreen}
        component={ReceiveFundScreen}
        options={overlayScreenOptions}
      />
      <AccountsStack.Screen name={routeKeys.sendFundScreen} component={SendFundScreen} options={overlayScreenOptions} />
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
      <Drawer.Screen name={routeKeys.feedbackScreen} component={FeedbackScreen} />
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
        component={CrowdloanScreen}
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
        component={CrowdloanFundDetailScreen}
        options={{title: 'Fund details'}}
      />
    </ParachainsStack.Navigator>
  );
}

const AppStack = createStackNavigator<AppStackParamList>();

function AppNavigator() {
  useTurnOnAllNotificationsOnAppStartForAndroid();
  const {isPnPromptNeeded, skipPnPermission, isLoading} = usePushAuthorizationStatus();

  // We need this here, because otherwise PermissionGrantingPrompt
  // wouldn't mount on the first render, loading indicator is not necessary
  // because the promise is resolving almost immediately
  if (isLoading) {
    return null;
  }

  return (
    <AppStack.Navigator screenOptions={overlayScreenOptions}>
      {isPnPromptNeeded ? (
        <AppStack.Screen name={routeKeys.permissionGrantingPromptScreen}>
          {() => <PermissionGrantingPrompt skipPnPermission={skipPnPermission} />}
        </AppStack.Screen>
      ) : undefined}
      <AppStack.Screen name={routeKeys.drawerNavigator} component={DrawerNavigator} />
      <AppStack.Screen name={routeKeys.networkSelectionScreen} component={NetworkSelectionScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;

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
