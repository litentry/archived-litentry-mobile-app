import React, {useContext} from 'react';
import {createStackNavigator, HeaderStyleInterpolators} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreen from 'screen/DrawerScreen';
import DashboardScreen, {DashboardHeaderLeft} from 'screen/DashboardScreen';
import MotionDetailScreen from 'screen/MotionDetailScreen';
import TipsScreen from 'screen/tips/TipsScreen';
import TipDetailScreen from 'screen/tips/TipDetailScreen';
import RegistrarListScreen from 'screen/RegistrarListScreen';
import WebviewScreen from 'screen/WebviewScreen';
import DevScreen from 'screen/DevScreen';
import MyIdentityScreen from 'screen/MyIdentityScreen';
import * as routeKeys from 'src/navigation/routeKeys';
import {ChainApiContext} from 'context/ChainApiContext';
import {ApiLoadingScreen} from 'screen/ApiLoadingScreen';
import {CouncilScreen} from 'screen/Council/CouncilScreen';
import {SubmitTipScreen} from 'screen/SubmitTipScreen';
import {TreasuryScreen} from 'screen/TreasuryScreen';
import {MotionsScreen} from 'screen/Council/MotionsScreen';
import {NotificationSettingsScreen} from 'screen/NotificationSettingsScreen';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import {DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';
import globalStyles from 'src/styles';
import {submitTip} from 'src/navigation/routeKeys';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingHorizontal: 10},
        headerBackImage: ({tintColor}) => (
          <Icon
            name={'arrow-back-outline'}
            style={[globalStyles.icon30, {color: tintColor}]}
            fill={tintColor}
            pack={'ionic'}
          />
        ),
      }}>
      <DashboardStack.Screen name={routeKeys.dashboard} component={DashboardScreen} />
      <DashboardStack.Screen name={routeKeys.motionDetail} component={MotionDetailScreen} />
      <DashboardStack.Screen
        name={routeKeys.tipsScreen}
        component={TipsScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TopNavigationAction
              icon={(props) => <Icon {...props} name="plus-circle-outline" />}
              onPress={() => navigation.navigate(submitTip)}
            />
          ),
        })}
      />
      <DashboardStack.Screen name={routeKeys.tipDetail} component={TipDetailScreen} />
      <DashboardStack.Screen name={routeKeys.councilScreen} component={CouncilScreen} />
      <DashboardStack.Screen name={routeKeys.treasuryScreen} component={TreasuryScreen} />
      <DashboardStack.Screen name={routeKeys.submitTip} component={SubmitTipScreen} />
      <DashboardStack.Screen name={routeKeys.motionsScreen} component={MotionsScreen} />
      <DashboardStack.Screen name={routeKeys.myIdentity} component={MyIdentityScreen} />
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
      <Drawer.Screen name={routeKeys.dashboard} component={DashboardStackNavigator} options={{headerShown: false}} />
      <Drawer.Screen name={routeKeys.registrarList} component={RegistrarListScreen} />
      <Drawer.Screen
        name={routeKeys.webview}
        component={WebviewScreen}
        options={({route}) => ({title: route?.params?.title})}
      />
      <Drawer.Screen name={routeKeys.devScreen} component={DevScreen} />
      <Drawer.Screen name={routeKeys.notificationSettingsScreen} component={NotificationSettingsScreen} />
    </Drawer.Navigator>
  );
}

const AppStack = createStackNavigator();

function AppNavigator() {
  const {api} = useContext(ChainApiContext);
  return (
    <AppStack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
      {api ? <AppStack.Screen name={'App'} component={DrawerNavigator} /> : undefined}
      <AppStack.Screen name={'ApiNavigator'} component={ApiLoadingNavigator} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;

const ApiLoadingStack = createStackNavigator();

function ApiLoadingNavigator() {
  return (
    <ApiLoadingStack.Navigator headerMode={'none'} mode={'modal'} screenOptions={{gestureEnabled: false}}>
      <ApiLoadingStack.Screen
        name={'ApiLoadingScreen'}
        component={ApiLoadingScreen}
        options={{gestureEnabled: false}}
      />
    </ApiLoadingStack.Navigator>
  );
}
