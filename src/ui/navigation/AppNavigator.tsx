import React from 'react';
import {createDrawerNavigator, DrawerHeaderProps, DrawerContentComponentProps} from '@react-navigation/drawer';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {AccountsScreen} from '@ui/screens/AccountsScreen';
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
import {DemocracyScreen} from '@ui/screens/Democracy/DemocracyScreen';
import {ReferendumDetailScreen} from '@ui/screens/Democracy/ReferendumDetailScreen';
import {ProposalDetailScreen} from '@ui/screens/Democracy/ProposalDetailScreen';
import DevScreen from '@ui/screens/DevScreen';
import DrawerScreen from '@ui/screens/Drawer/DrawerScreen';
import {ExportAccountWithJsonFileScreen} from '@ui/screens/ExportAccountWithJsonFileScreen';
import {ImportAccountScreen} from '@ui/screens/ImportAccountScreen';
import {MotionDetailScreen} from '@ui/screens/MotionDetailScreen';
import {MyAccountScreen} from '@ui/screens/MyAccountScreen';
import {ManageIdentityScreen} from '@ui/screens/MyIdentityScreen/ManageIdentityScreen';
import {NotificationSettingsScreen} from '@ui/screens/NotificationSettingsScreen';
import {AuctionsScreen} from '@ui/screens/Parachains/AuctionsScreen';
import {CrowdloanFundDetailScreen} from '@ui/screens/Parachains/CrowdloanFundDetailScreen';
import {CrowdloanScreen} from '@ui/screens/Parachains/CrowdloanScreen';
import {ParachainsOverviewScreen} from '@ui/screens/Parachains/OverviewScreen';
import {ParachainDetailScreen} from '@ui/screens/Parachains/ParachainDetailScreen';
import {ParathreadsScreen} from '@ui/screens/Parachains/ParathreadsScreen';
import {PermissionPromptScreen} from '@ui/screens/PermissionPromptScreen';
import {PolkassemblyDiscussionDetail} from '@ui/screens/Polkassembly/PolkassemblyDiscussionDetail';
import {PolkassemblyDiscussions} from '@ui/screens/Polkassembly/PolkassemblyDiscussions';
import {ProposeTipScreen} from '@ui/screens/ProposeTipScreen';
import RegistrarListScreen from '@ui/screens/RegistrarListScreen';
import {TechnicalCommitteeScreen} from '@ui/screens/TechnicalCommitteeScreen';
import {RegisterSubIdentitiesScreen} from '@ui/screens/SubIdentities/RegisterSubIdentitiesScreen';
import TipDetailScreen from '@ui/screens/Tips/TipDetailScreen';
import {TreasuryScreen} from '@ui/screens/TreasuryScreen';
import WebviewScreen from '@ui/screens/WebviewScreen';
import {useFirebase} from '@hooks/useFirebase';
import {useTurnOnAllNotificationsOnAppStartForAndroid} from '@hooks/useTurnOnAllNotificationsOnAppStartForAndroid';
import {useCheckAuthorizationStatus, usePermissions, useSkipPermission} from '@atoms/pushNotification';
import {MainDrawerAppBar, MainStackAppBar} from '@ui/navigation/AppBars';
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
import {FeedbackScreen} from '@ui/screens/FeedbackScreen';
import {AccountScreen} from '@ui/screens/AccountScreen';
import {OnboardingScreen} from '@ui/screens/Onboarding/OnboardingScreen';
import {usePersistedState} from '@hooks/usePersistedState';

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

const StackNavigatorHeader = (props: NativeStackHeaderProps) => <MainStackAppBar {...props} />;

function DashboardStackNavigator() {
  const [onboardingSeen] = usePersistedState<boolean>('onboarding_seen');
  useFirebase();

  return (
    <DashboardStack.Navigator screenOptions={{header: StackNavigatorHeader}}>
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
        options={{headerShown: false}}
      />
      <DashboardStack.Screen name={routeKeys.motionDetailScreen} component={MotionDetailScreen} />
      <DashboardStack.Screen name={routeKeys.tipDetailScreen} component={TipDetailScreen} />
      <DashboardStack.Screen name={routeKeys.councilScreen} component={CouncilScreen} />
      <DashboardStack.Screen name={routeKeys.candidateScreen} component={CandidateScreen} />
      <DashboardStack.Screen name={routeKeys.treasuryScreen} component={TreasuryScreen} />
      <DashboardStack.Screen name={routeKeys.proposeTipScreen} component={ProposeTipScreen} />
      <DashboardStack.Screen name={routeKeys.motionsScreen} component={MotionsScreen} />
      <DashboardStack.Screen name={routeKeys.democracyScreen} component={DemocracyScreen} />
      <DashboardStack.Screen name={routeKeys.referendumDetailScreen} component={ReferendumDetailScreen} />
      <DashboardStack.Screen name={routeKeys.proposalDetailScreen} component={ProposalDetailScreen} />
      <DashboardStack.Screen name={routeKeys.bountiesScreen} component={BountiesScreen} />
      <DashboardStack.Screen name={routeKeys.bountyDetailScreen} component={BountyDetailScreen} />
      <DashboardStack.Screen name={routeKeys.eventsCalendarScreen} component={EventsCalendarScreen} />
    </DashboardStack.Navigator>
  );
}

const AccountsStack = createNativeStackNavigator<AccountsStackParamList>();

export function AccountsNavigator() {
  return (
    <AccountsStack.Navigator screenOptions={{header: StackNavigatorHeader}}>
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
    </AccountsStack.Navigator>
  );
}

const DiscussionNavigator = createNativeStackNavigator<PolkassemblyDiscussionStackParamList>();

function PolkassemblyDiscussionsNavigator() {
  return (
    <DiscussionNavigator.Navigator screenOptions={{header: StackNavigatorHeader}}>
      <DiscussionNavigator.Screen name={routeKeys.polkassemblyDiscussions} component={PolkassemblyDiscussions} />
      <DiscussionNavigator.Screen
        name={routeKeys.polkassemblyDiscussionDetail}
        component={PolkassemblyDiscussionDetail}
      />
    </DiscussionNavigator.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigatorHeader = (props: DrawerHeaderProps) => <MainDrawerAppBar {...props} />;
const DrawerContent = (props: DrawerContentComponentProps) => <DrawerScreen {...props} />;

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{header: DrawerNavigatorHeader}}>
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

const ParachainsStack = createNativeStackNavigator<ParachainsStackParamList>();

function ParachainsNavigator() {
  return (
    <ParachainsStack.Navigator screenOptions={{header: StackNavigatorHeader}}>
      <ParachainsStack.Screen name={routeKeys.parachainsOverviewScreen} component={ParachainsOverviewScreen} />
      <ParachainsStack.Screen name={routeKeys.parachainDetailScreen} component={ParachainDetailScreen} />
    </ParachainsStack.Navigator>
  );
}

const CrowdloansStack = createNativeStackNavigator<CrowdloansStackParamList>();

function CrowdloansNavigator() {
  return (
    <CrowdloansStack.Navigator screenOptions={{header: StackNavigatorHeader}}>
      <CrowdloansStack.Screen name={routeKeys.crowdloanScreen} component={CrowdloanScreen} />
      <CrowdloansStack.Screen name={routeKeys.crowdloanFundDetailScreen} component={CrowdloanFundDetailScreen} />
    </CrowdloansStack.Navigator>
  );
}

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppNavigator() {
  useTurnOnAllNotificationsOnAppStartForAndroid();
  const {isChecking} = useCheckAuthorizationStatus();
  const {isPermissionPromptNeeded} = usePermissions();
  const {skipPermission} = useSkipPermission();

  if (isChecking) {
    return null;
  }

  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      {isPermissionPromptNeeded ? (
        <AppStack.Screen name={routeKeys.permissionGrantingPromptScreen}>
          {() => <PermissionPromptScreen skipPermission={skipPermission} />}
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
        options={{header: StackNavigatorHeader, headerShown: true}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
