import {
  addAccountScreen,
  apiLoadingScreen,
  appNavigatorScreen,
  balanceScreen,
  councilScreen,
  dashboardNavigator,
  dashboardScreen,
  devScreen,
  motionDetailScreen,
  motionsScreen,
  myIdentityScreen,
  notificationSettingsScreen,
  permissionGrantingPromptScreen,
  registrarListScreen,
  submitTipScreen,
  tipDetailScreen,
  tipsScreen,
  treasuryScreen,
  webviewScreen,
} from 'src/navigation/routeKeys';
import {SupportedNetworkType} from 'src/types';

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
  [dashboardNavigator]: undefined;
  [registrarListScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
};

type AppStackParamList = {
  [appNavigatorScreen]: undefined;
  [apiLoadingScreen]: {network: SupportedNetworkType; redirectTo: string | null} | undefined;
  [permissionGrantingPromptScreen]: undefined;
  [addAccountScreen]: undefined;
  [balanceScreen]: {address: string};
};

type CompleteNavigatorParamList = AppStackParamList & DrawerParamList & ApiNavigatorParamList & DashboardStackParamList;
