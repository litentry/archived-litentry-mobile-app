import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreen from 'screen/DrawerScreen';
import DashboardScreen from 'screen/DashboardScreen';
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
import {NetworkSelectScreen} from 'screen/NetworkSelectScreen';
import {CouncilScreen} from 'screen/CouncilScreen';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator headerMode="none">
      <DashboardStack.Screen name={routeKeys.dashboard} component={DashboardScreen} />
      <DashboardStack.Screen name={routeKeys.motionDetail} component={MotionDetailScreen} />
      <DashboardStack.Screen name={routeKeys.tips} component={TipsScreen} />
      <DashboardStack.Screen name={routeKeys.tipDetail} component={TipDetailScreen} />
      <DashboardStack.Screen name={routeKeys.councilScreen} component={CouncilScreen} />
    </DashboardStack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen name={routeKeys.dashboard} component={DashboardStackNavigator} />
      <Drawer.Screen name={routeKeys.registrarList} component={RegistrarListScreen} />

      <Drawer.Screen name={routeKeys.myIdentity} component={MyIdentityScreen} />
      <Drawer.Screen name={routeKeys.webview} component={WebviewScreen} />
      <Drawer.Screen name={routeKeys.devScreen} component={DevScreen} />
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
      <ApiLoadingStack.Screen
        name={'NetworkSelectScreen'}
        component={NetworkSelectScreen}
        options={{
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 0}},
            close: {animation: 'timing', config: {duration: 0}},
          },
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true,
          gestureEnabled: false,
        }}
      />
    </ApiLoadingStack.Navigator>
  );
}
