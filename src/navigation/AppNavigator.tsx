import React from 'react';
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

const DashboardStack = createStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator headerMode="none">
      <DashboardStack.Screen
        name={routeKeys.dashboard}
        component={DashboardScreen}
      />
      <DashboardStack.Screen
        name={routeKeys.motionDetail}
        component={MotionDetailScreen}
      />
      <DashboardStack.Screen name={routeKeys.tips} component={TipsScreen} />
      <DashboardStack.Screen
        name={routeKeys.tipDetail}
        component={TipDetailScreen}
      />
    </DashboardStack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function AppNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen
        name={routeKeys.dashboard}
        component={DashboardStackNavigator}
      />
      <Drawer.Screen
        name={routeKeys.registrarList}
        component={RegistrarListScreen}
      />

      <Drawer.Screen name={routeKeys.myIdentity} component={MyIdentityScreen} />
      <Drawer.Screen name={routeKeys.webview} component={WebviewScreen} />
      <Drawer.Screen name={routeKeys.devScreen} component={DevScreen} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
