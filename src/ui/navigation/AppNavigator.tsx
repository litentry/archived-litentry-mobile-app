import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {AccountsScreen} from '@ui/screens/AccountsScreen';
import {BalanceScreen} from '@ui/screens/BalanceScreen';
import {BountiesScreen} from '@ui/screens/Bounty/BountiesScreen';
import {BountyDetailScreen} from '@ui/screens/Bounty/BountyDetailScreen';
import {CandidateScreen} from '@ui/screens/Council/CandidateScreen';
import {EventsCalendarScreen} from '@ui/screens/EventsCalendarScreen';
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
import {NotificationSettingsScreen} from '@ui/screens/NotificationSettingsScreen';
import {AuctionsScreen} from '@ui/screens/Parachains/AuctionsScreen';
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
import {TechnicalCommitteeScreen} from '@ui/screens/TechnicalCommitteeScreen';
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
  CrowdloansStackParamList,
  DashboardStackParamList,
  DrawerParamList,
  ParachainsStackParamList,
  PolkassemblyDiscussionStackParamList,
} from '@ui/navigation/navigation';
import * as routeKeys from '@ui/navigation/routeKeys';
import {AppBar} from '@ui/library';
import {ReceiveFundScreen} from '@ui/screens/ReceiveFundScreen';
import {SendFundScreen} from '@ui/screens/SendFundScreen';
import {FeedbackScreen} from '@ui/screens/FeedbackScreen';
import {AccountScreen} from '@ui/screens/AccountScreen';
import {OnboardingScreen} from '@ui/screens/Onboarding/OnboardingScreen';
import {usePersistedState} from '@hooks/usePersistedState';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  const [onboardingSeen] = usePersistedState<boolean>('onboarding_seen');
  useFirebase();

  return (
    <DashboardStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      {!onboardingSeen ? (
        <DashboardStack.Screen
          name={routeKeys.onboardingScreen}
          component={OnboardingScreen}
          options={{headerShown: false, presentation: 'modal'}}
        />
      ) : null}
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
      <DashboardStack.Screen name={routeKeys.democracyProposalScreen} component={DemocracyProposalScreen} />
      <DashboardStack.Screen name={routeKeys.bountiesScreen} component={BountiesScreen} />
      <DashboardStack.Screen name={routeKeys.bountyDetailScreen} component={BountyDetailScreen} />
      <DashboardStack.Screen name={routeKeys.eventsCalendarScreen} component={EventsCalendarScreen} />
    </DashboardStack.Navigator>
  );
}

const AccountsStack = createStackNavigator<AccountsStackParamList>();

export function AccountsNavigator() {
  return (
    <AccountsStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <AccountsStack.Screen name={routeKeys.accountsScreen} component={AccountsScreen} />
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
      <AccountsStack.Screen name={routeKeys.balanceScreen} component={BalanceScreen} options={overlayScreenOptions} />
      <AccountsStack.Screen
        name={routeKeys.identityGuideScreen}
        component={IdentityGuideScreen}
        options={overlayScreenOptions}
      />
    </AccountsStack.Navigator>
  );
}

const DiscussionNavigator = createStackNavigator<PolkassemblyDiscussionStackParamList>();

function PolkassemblyDiscussionsNavigator() {
  return (
    <DiscussionNavigator.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <DiscussionNavigator.Screen name={routeKeys.polkassemblyDiscussions} component={PolkassemblyDiscussions} />
      <DiscussionNavigator.Screen
        name={routeKeys.polkassemblyDiscussionDetail}
        component={PolkassemblyDiscussionDetail}
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
      <Drawer.Screen name={routeKeys.technicalCommitteeScreen} component={TechnicalCommitteeScreen} />

      <Drawer.Screen
        name={routeKeys.parachainsNavigator}
        component={ParachainsNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={routeKeys.crowdloansNavigator}
        component={CrowdloansNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen name={routeKeys.parathreadsScreen} component={ParathreadsScreen} />
      <Drawer.Screen name={routeKeys.parachainAuctionsScreen} component={AuctionsScreen} />

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
          headerLeft: (props) => <AppBar.Action icon="menu" {...props} />,
        }}
      />
      <ParachainsStack.Screen name={routeKeys.parachainDetailScreen} component={ParachainDetailScreen} />
    </ParachainsStack.Navigator>
  );
}

const CrowdloansStack = createStackNavigator<CrowdloansStackParamList>();

function CrowdloansNavigator() {
  return (
    <CrowdloansStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <CrowdloansStack.Screen
        name={routeKeys.crowdloanScreen}
        component={CrowdloanScreen}
        options={{
          headerLeft: (props) => <AppBar.Action icon="menu" {...props} />,
        }}
      />
      <CrowdloansStack.Screen name={routeKeys.crowdloanFundDetailScreen} component={CrowdloanFundDetailScreen} />
    </CrowdloansStack.Navigator>
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
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      {isPnPromptNeeded ? (
        <AppStack.Screen name={routeKeys.permissionGrantingPromptScreen}>
          {() => <PermissionGrantingPrompt skipPnPermission={skipPnPermission} />}
        </AppStack.Screen>
      ) : undefined}
      <AppStack.Screen
        name={routeKeys.drawerNavigator}
        component={DrawerNavigator}
        options={{presentation: 'transparentModal'}}
      />
      <AppStack.Screen
        name={routeKeys.accountScreen}
        component={AccountScreen}
        options={{header: (props) => <MainStackAppBar {...props} />, headerShown: true}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;

export const overlayScreenOptions: StackNavigationOptions = {
  presentation: 'transparentModal',
  headerShown: false,
  animationEnabled: false,
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  gestureEnabled: false,
};
