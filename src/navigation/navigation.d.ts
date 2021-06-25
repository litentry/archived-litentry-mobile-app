import {
  councilScreen,
  dashboard,
  devScreen,
  motionDetail,
  motionsScreen,
  myIdentity,
  notificationSettingsScreen,
  registrarList,
  submitTip,
  tipDetail,
  tipsScreen,
  treasuryScreen,
  webview,
} from 'src/navigation/routeKeys';

type DashboardStackParamList = {
  [dashboard]: undefined;
  [motionDetail]: {
    id: number;
    hash: string;
  };
  [tipsScreen]: undefined;
  [tipDetail]: {
    hash: string;
  };
  [councilScreen]: undefined;
  [submitTip]: undefined;
  [treasuryScreen]: undefined;
  [motionsScreen]: undefined;
  [myIdentity]: {address: string};
};

type DrawerParamList = {
  [dashboard]: undefined;
  [registrarList]: undefined;
  [webview]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
};

type AppStackParamList = DrawerParamList & ApiNavigatorParamList & DashboardStackParamList;

type ApiNavigatorParamList = {
  ApiLoadingScreen: undefined;
};
