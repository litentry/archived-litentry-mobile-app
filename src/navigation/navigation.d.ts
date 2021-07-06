import {
  apiLoadingNavigatorScreen,
  apiLoadingScreen,
  appNavigatorScreen,
  councilScreen,
  dashboardScreen,
  devScreen,
  motionDetailScreen,
  motionsScreen,
  myIdentityScreen,
  notificationSettingsScreen,
  referendaScreen,
  referendumScreen,
  permissionGrantingPromptScreen,
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
  [referendaScreen]: undefined;
  [referendumScreen]: {index: string};
};

type DrawerParamList = {
  [dashboardScreen]: undefined;
  [registrarListScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
};

type AppStackParamList = {
  [appNavigatorScreen]: undefined;
  [apiLoadingNavigatorScreen]: undefined;
  [permissionGrantingPromptScreen]: undefined;
};

type CompleteNavigatorParamList = AppStackParamList & DrawerParamList & ApiNavigatorParamList & DashboardStackParamList;

type ApiNavigatorParamList = {
  [apiLoadingScreen]: undefined;
};
