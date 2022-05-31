import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainDrawerAppBar, MainAppBar, MainStackAppBar} from '@ui/navigation/AppBars';
import {AccountsNavigator} from '@ui/navigation/AppNavigator';
import {accountsNavigator, feedbackScreen, tokenMigrationScreen, webviewScreen} from '@ui/navigation/routeKeys';
import DrawerScreen from '@ui/screens/Drawer/DrawerScreen';
import {TokenMigrationScreen} from '@ui/screens/TokenMigration/TokenMigrationScreen';
import {AppStackParamList} from '@ui/navigation/navigation';
import WebviewScreen from '@ui/screens/WebviewScreen';
import {FeedbackScreen} from '@ui/screens/FeedbackScreen';
import {HomeScreen} from '@ui/screens/HomeScreen';

type DrawerParamList = {
  tokenMigrationNavigator: undefined;
  [accountsNavigator]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [feedbackScreen]: undefined;
  homeScreen: undefined;
};

type TokenMigrationStackParamList = {
  'Token Migration': undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();
const TokenMigrationStack = createNativeStackNavigator<TokenMigrationStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const HomeStack = createNativeStackNavigator<{home: undefined}>();

function TokenMigrationNavigator() {
  return (
    <TokenMigrationStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <TokenMigrationStack.Screen name={tokenMigrationScreen} component={TokenMigrationScreen} />
    </TokenMigrationStack.Navigator>
  );
}

// TODO: remove this navigator
function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{header: (props) => <MainStackAppBar {...props} />}}>
      <HomeStack.Screen name={'home'} component={HomeScreen} options={{header: (props) => <MainAppBar {...props} />}} />
    </HomeStack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} />}
      screenOptions={{header: (props) => <MainDrawerAppBar {...props} />}}>
      <Drawer.Screen name={'homeScreen'} component={HomeNavigator} options={{headerShown: false}} />
      <Drawer.Screen
        name={'tokenMigrationNavigator'}
        component={TokenMigrationNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen name={accountsNavigator} component={AccountsNavigator} options={{headerShown: false}} />
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
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name={'Drawer'} component={DrawerNavigator} />
    </AppStack.Navigator>
  );
}
