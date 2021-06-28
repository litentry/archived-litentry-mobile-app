import {
  councilScreen,
  dashboardScreen,
  devScreen,
  motionDetailScreen,
  motionsScreen,
  myIdentityScreen,
  notificationSettingsScreen,
  registrarListScreen,
  submitTipScreen,
  tipDetailScreen,
  tipsScreen,
  treasuryScreen,
  webviewScreen,
} from 'src/navigation/routeKeys';

type DashboardStackParamList = {
  [dashboardScreen]: undefined;
  [motionDetailScreen]: {
    id: number;
    hash: string;
  };
  [tipsScreen]: undefined;
  [tipDetailScreen]: {
    hash: string;
  };
  [councilScreen]: undefined;
  [submitTipScreen]: undefined;
  [treasuryScreen]: undefined;
  [motionsScreen]: undefined;
  [myIdentityScreen]: {address: string};
};

type DrawerParamList = {
  [dashboardScreen]: undefined;
  [registrarListScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
};

type AppStackParamList = {
  App: undefined;
  ApiNavigator: undefined;
  PermissionGrantingPrompt: undefined;
};

type CompleteNavigatorParamList = AppStackParamList & DrawerParamList & ApiNavigatorParamList & DashboardStackParamList;

type ApiNavigatorParamList = {
  ApiLoadingScreen: undefined;
};
