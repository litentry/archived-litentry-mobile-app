import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {MainDrawerAppBar, MainAppBar, MainStackAppBar} from '@ui/navigation/AppBars';
import {AccountsNavigator, overlayScreenOptions} from '@ui/navigation/AppNavigator';
import {
  accountsNavigator,
  feedbackScreen,
  networkSelectionScreen,
  tokenMigrationScreen,
  webviewScreen,
} from '@ui/navigation/routeKeys';
import DrawerScreen from '@ui/screens/Drawer/DrawerScreen';
import {TokenMigrationScreen} from '@ui/screens/TokenMigrationScreen';
import {AppStackParamList} from '@ui/navigation/navigation';
import {NetworkSelectionScreen} from '@ui/screens/NetworkSelectionScreen';
import WebviewScreen from '@ui/screens/WebviewScreen';
import {FeedbackScreen} from '@ui/screens/FeedbackScreen';

type DrawerParamList = {
  tokenMigrationNavigator: undefined;
  [accountsNavigator]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [feedbackScreen]: undefined;
};

type TokenMigrationStackParamList = {
  'Token Migration': undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();
const TokenMigrationStack = createStackNavigator<TokenMigrationStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function TokenMigrationNavigator() {
  return (
    <TokenMigrationStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <TokenMigrationStack.Screen
        name={tokenMigrationScreen}
        component={TokenMigrationScreen}
        options={{header: (props) => <MainAppBar {...props} />}}
      />
    </TokenMigrationStack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} />}
      screenOptions={{header: (props) => <MainDrawerAppBar {...props} />}}>
      <Drawer.Screen name={accountsNavigator} component={AccountsNavigator} options={{headerShown: false}} />
      <Drawer.Screen
        name={'tokenMigrationNavigator'}
        component={TokenMigrationNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={webviewScreen}
        component={WebviewScreen}
        options={({route}) => ({title: route?.params?.title})}
      />
      <Drawer.Screen name={feedbackScreen} component={FeedbackScreen} />
    </Drawer.Navigator>
  );
}

export function ParachainAppNavigator() {
  return (
    <AppStack.Navigator screenOptions={overlayScreenOptions}>
      <AppStack.Screen name={'Drawer'} component={DrawerNavigator} />
      <AppStack.Screen name={networkSelectionScreen} component={NetworkSelectionScreen} />
    </AppStack.Navigator>
  );
}
