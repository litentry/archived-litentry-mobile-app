import messaging from '@react-native-firebase/messaging';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets, TransitionSpecs} from '@react-navigation/stack';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import LoadingView from 'presentational/LoadingView';
import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {AddAccountScreen} from 'screen/AddAccountScreen/AddAccountScreen';
import {ApiLoadingScreen} from 'screen/ApiLoadingScreen';
import {BalanceScreen} from 'screen/BalanceScreen';
import {BeaconWebViewScreen} from 'screen/BeaconWebViewScreen';
import {CouncilScreen} from 'screen/Council/CouncilScreen';
import {MotionsScreen} from 'screen/Council/MotionsScreen';
import DashboardScreen, {DashboardHeaderLeft} from 'screen/DashboardScreen';
import DevScreen from 'screen/DevScreen';
import DrawerScreen from 'screen/Drawer/DrawerScreen';
import MotionDetailScreen from 'screen/MotionDetailScreen';
import MyIdentityScreen from 'screen/MyIdentityScreen';
import {NotificationSettingsScreen} from 'screen/NotificationSettingsScreen';
import {PermissionGrantingPrompt} from 'screen/PermissionGrantingPrompt';
import {ReferendaScreen} from 'screen/ReferendaScreen';
import {ReferendumScreen} from 'screen/ReferendumScreen';
import RegistrarListScreen from 'screen/RegistrarListScreen';
import {SubmitTipScreen} from 'screen/SubmitTipScreen';
import TipDetailScreen from 'screen/tips/TipDetailScreen';
import TipsScreen from 'screen/tips/TipsScreen';
import {TreasuryScreen} from 'screen/TreasuryScreen';
import WebviewScreen from 'screen/WebviewScreen';
import {useTheme} from 'src/context/ThemeContext';
import {useFirebase} from 'src/hook/useFirebase';
import {usePushAuthorizationStatus} from 'src/hook/usePushNotificationsPermissions';
import {useTurnOnAllNotificationsOnAppStartForAndroid} from 'src/hook/useTurnOnAllNotificationsOnAppStartForAndroid';
import {
  ApiLoadedParamList,
  AppStackParamList,
  DashboardStackParamList,
  DrawerParamList,
} from 'src/navigation/navigation';
import * as routeKeys from 'src/navigation/routeKeys';
import {darkTheme, lightTheme} from 'src/navigation/theme';
import globalStyles from 'src/styles';

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
      <DashboardStack.Screen name={routeKeys.treasuryScreen} component={TreasuryScreen} />
      <DashboardStack.Screen name={routeKeys.submitTipScreen} component={SubmitTipScreen} />
      <DashboardStack.Screen name={routeKeys.motionsScreen} component={MotionsScreen} />
      <DashboardStack.Screen name={routeKeys.myIdentityScreen} component={MyIdentityScreen} />
      <DashboardStack.Screen name={routeKeys.referendaScreen} component={ReferendaScreen} />
      <DashboardStack.Screen name={routeKeys.referendumScreen} component={ReferendumScreen} />
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
    </Drawer.Navigator>
  );
}

const LoadedAppStack = createStackNavigator<ApiLoadedParamList>();

function ApiLoadedNavigator({navigation}: {navigation: any}) {
  return (
    <LoadedAppStack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        cardOverlayEnabled: true,
        cardStyle: {
          backgroundColor: 'transparent',
          opacity: 1,
        },
        gestureEnabled: false,
      }}
      mode="modal">
      <LoadedAppStack.Screen name={routeKeys.drawerNavigatorScreen} component={DrawerNavigator} />
      <LoadedAppStack.Screen
        name={routeKeys.beaconWebViewScreen}
        component={BeaconWebViewScreen}
        options={{
          animationEnabled: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          cardOverlay: (p) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(routeKeys.drawerNavigatorScreen)}
                style={{flex: 1, backgroundColor: 'black'}}
              />
            );
          },
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <LoadedAppStack.Screen name={routeKeys.addAccountScreen} component={AddAccountScreen} />
      <LoadedAppStack.Screen name={routeKeys.balanceScreen} component={BalanceScreen} />
    </LoadedAppStack.Navigator>
  );
}

const AppStack = createStackNavigator<AppStackParamList>();

function AppNavigator() {
  const {api} = useContext(ChainApiContext);
  const {theme} = useTheme();

  // Start: app start hooks
  useTurnOnAllNotificationsOnAppStartForAndroid();
  // End: app start hooks

  const {pushAuthorizationStatus, isLoading} = usePushAuthorizationStatus();

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <NavigationContainer linking={routeKeys.linking} theme={theme === 'dark' ? darkTheme : lightTheme}>
      <AppStack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
        {pushAuthorizationStatus && pushAuthorizationStatus === messaging.AuthorizationStatus.NOT_DETERMINED ? (
          <AppStack.Screen name={routeKeys.permissionGrantingPromptScreen} component={PermissionGrantingPrompt} />
        ) : undefined}
        {api ? <AppStack.Screen name={routeKeys.apiLoadedNavigatorScreen} component={ApiLoadedNavigator} /> : undefined}
        <AppStack.Screen name={routeKeys.apiLoadingScreen} component={ApiLoadingScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
