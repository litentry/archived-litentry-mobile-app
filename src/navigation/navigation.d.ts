import {
  addAccountScreen,
  deeplinkNavigatorScreen,
  apiLoadedNavigatorScreen,
  balanceScreen,
  councilScreen,
  dashboardNavigator,
  dashboardScreen,
  devScreen,
  drawerNavigatorScreen,
  motionDetailScreen,
  motionsScreen,
  myIdentityScreen,
  notificationSettingsScreen,
  democracyScreen,
  permissionGrantingPromptScreen,
  registrarListScreen,
  submitTipScreen,
  tipDetailScreen,
  tipsScreen,
  treasuryScreen,
  webviewScreen,
  referendumScreen,
  democracyProposalScreen,
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
  [democracyScreen]: undefined;
  [referendumScreen]: {index: string};
  [democracyProposalScreen]: {index: string};
};

type DrawerParamList = {
  [dashboardNavigator]: undefined;
  [registrarListScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
};

type ApiLoadedParamList = {
  [drawerNavigatorScreen]: undefined;
  [addAccountScreen]: undefined;
  [balanceScreen]: {address: string};
};

type AppStackParamList = {
  [apiLoadedNavigatorScreen]: undefined;
  [deeplinkNavigatorScreen]: {network: SupportedNetworkType; redirectTo: string | null} | undefined;
  [permissionGrantingPromptScreen]: undefined;
};

type CompleteNavigatorParamList = AppStackParamList & DrawerParamList & ApiLoadedParamList & DashboardStackParamList;
