import {
  apiLoadingScreen,
  councilScreen,
  dashboardNavigator,
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

type AppStackParamList = DrawerParamList & ApiNavigatorParamList & DashboardStackParamList;

type ApiNavigatorParamList = {
  [apiLoadingScreen]: {network: SupportedNetworkType; redirectTo: string | null} | undefined;
};
