import React from 'react';
import {createDrawerNavigator, DrawerContentComponentProps, DrawerHeaderProps} from '@react-navigation/drawer';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import {MainDrawerAppBar, MainStackAppBar} from '@ui/navigation/AppBars';
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

const StackNavigatorHeader = (props: NativeStackHeaderProps) => <MainStackAppBar {...props} />;

function TokenMigrationNavigator() {
  return (
    <TokenMigrationStack.Navigator screenOptions={{header: StackNavigatorHeader}}>
      <TokenMigrationStack.Screen name={tokenMigrationScreen} component={TokenMigrationScreen} />
    </TokenMigrationStack.Navigator>
  );
}

// TODO: remove this navigator
function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{header: StackNavigatorHeader}}>
      <HomeStack.Screen name={'home'} component={HomeScreen} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
}

const DrawerNavigatorHeader = (props: DrawerHeaderProps) => <MainDrawerAppBar {...props} />;
const DrawerContent = (props: DrawerContentComponentProps) => <DrawerScreen {...props} />;

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{header: DrawerNavigatorHeader}}>
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
