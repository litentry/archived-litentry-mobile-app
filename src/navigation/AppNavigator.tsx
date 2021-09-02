import messaging from '@react-native-firebase/messaging';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {AddAccountScreen} from 'screen/AddAccountScreen/AddAccountScreen';
import {BalanceScreen} from 'screen/BalanceScreen';
import {CouncilScreen} from 'screen/Council/CouncilScreen';
import {CandidateScreen} from 'screen/Council/CandidateScreen';
import {MotionsScreen} from 'screen/Council/MotionsScreen';
import DashboardScreen, {DashboardHeaderLeft} from 'screen/DashboardScreen';
import DevScreen from 'screen/DevScreen';
import DrawerScreen from 'screen/Drawer/DrawerScreen';
import {MotionDetailScreen} from 'screen/MotionDetailScreen';
import MyIdentityScreen from 'screen/MyIdentityScreen';
import {NotificationSettingsScreen} from 'screen/NotificationSettingsScreen';
import {PermissionGrantingPrompt} from 'screen/PermissionGrantingPrompt';
import {DemocracyScreen} from 'screen/DemocracyScreen';
import {DemocracyProposalScreen} from 'screen/DemocracyProposalScreen';
import {ReferendumScreen} from 'screen/ReferendumScreen';
import RegistrarListScreen from 'screen/RegistrarListScreen';
import {SubmitTipScreen} from 'screen/SubmitTipScreen';
import TipDetailScreen from 'screen/tips/TipDetailScreen';
import TipsScreen from 'screen/tips/TipsScreen';
import {RegisterSubIdentitiesScreen} from 'screen/subIdentities/RegisterSubIdentitiesScreen';
import {TreasuryScreen} from 'screen/TreasuryScreen';
import WebviewScreen from 'screen/WebviewScreen';
import {useTheme} from 'src/context/ThemeContext';
import {useFirebase} from 'src/hook/useFirebase';
import {usePushAuthorizationStatus} from 'src/hook/usePushNotificationsPermissions';
import {useTurnOnAllNotificationsOnAppStartForAndroid} from 'src/hook/useTurnOnAllNotificationsOnAppStartForAndroid';
import {AppStackParamList, DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';
import * as routeKeys from 'src/navigation/routeKeys';
import {darkTheme, lightTheme} from 'src/navigation/theme';
import globalStyles from 'src/styles';
import {PolkadotDiscussions} from 'screen/Polkadot/PolkadotDiscussions';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  useFirebase();

  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingHorizontal: 10},
        headerRightContainerStyle: {paddingHorizontal: 10},
        headerBackImage: ({tintColor}) => (
          <Icon
            name={'arrow-back-outline'}
            style={[globalStyles.icon25, {color: tintColor}]}
            fill={tintColor}
            pack={'ionic'}
          />
        ),
      }}>
      <DashboardStack.Screen name={routeKeys.dashboardScreen} component={DashboardScreen} />
      <DashboardStack.Screen name={routeKeys.motionDetailScreen} component={MotionDetailScreen} />
      <DashboardStack.Screen
        name={routeKeys.tipsScreen}
        component={TipsScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TopNavigationAction
              icon={(props) => <Icon {...props} name="plus-circle-outline" />}
              onPress={() => navigation.navigate(routeKeys.submitTipScreen)}
            />
          ),
        })}
      />
      <DashboardStack.Screen name={routeKeys.tipDetailScreen} component={TipDetailScreen} />
      <DashboardStack.Screen name={routeKeys.councilScreen} component={CouncilScreen} />
      <DashboardStack.Screen name={routeKeys.candidateScreen} component={CandidateScreen} />
      <DashboardStack.Screen name={routeKeys.treasuryScreen} component={TreasuryScreen} />
      <DashboardStack.Screen name={routeKeys.submitTipScreen} component={SubmitTipScreen} />
      <DashboardStack.Screen name={routeKeys.motionsScreen} component={MotionsScreen} />
      <DashboardStack.Screen name={routeKeys.myIdentityScreen} component={MyIdentityScreen} />
      <DashboardStack.Screen name={routeKeys.registerSubIdentitiesScreen} component={RegisterSubIdentitiesScreen} />
      <DashboardStack.Screen name={routeKeys.democracyScreen} component={DemocracyScreen} />
      <DashboardStack.Screen name={routeKeys.referendumScreen} component={ReferendumScreen} />
      <DashboardStack.Screen
        name={routeKeys.democracyProposalScreen}
        component={DemocracyProposalScreen}
        options={{title: 'Proposal'}}
      />
    </DashboardStack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: DashboardHeaderLeft,
      }}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen
        name={routeKeys.dashboardNavigator}
        component={DashboardStackNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen name={routeKeys.registrarListScreen} component={RegistrarListScreen} />
      <Drawer.Screen
        name={routeKeys.webviewScreen}
        component={WebviewScreen}
        options={({route}) => ({title: route?.params?.title})}
      />
      <Drawer.Screen name={routeKeys.devScreen} component={DevScreen} />
      <Drawer.Screen name={routeKeys.notificationSettingsScreen} component={NotificationSettingsScreen} />
      <Drawer.Screen
        name={routeKeys.polkadotDiscussions}
        component={PolkadotDiscussions}
        options={{title: 'Discussions'}}
      />
    </Drawer.Navigator>
  );
}

const AppStack = createStackNavigator<AppStackParamList>();

function AppNavigator() {
  const {theme} = useTheme();

  // Start: app start hooks
  useTurnOnAllNotificationsOnAppStartForAndroid();
  // End: app start hooks

  const {pushAuthorizationStatus} = usePushAuthorizationStatus();

  return (
    <NavigationContainer linking={routeKeys.linking} theme={theme === 'dark' ? darkTheme : lightTheme}>
      <AppStack.Navigator
        screenOptions={{
          presentation: 'modal',
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
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
