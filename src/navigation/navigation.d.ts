type DashboardStackParamList = {
  Dashboard: undefined;
  MotionDetail: {
    id: number;
    hash: string;
  };
  Tips: undefined;
  TipDetail: {
    hash: string;
  };
  CouncilScreen: undefined;
  SubmitTipScreen: undefined;
  TreasuryScreen: undefined;
  MotionsScreen: undefined;
};

type DrawerParamList = {
  Dashboard: undefined;
  RegistrarList: undefined;
  Webview: {uri: string; title: string};
  DevScreen: undefined;
  NotificationSettingsScreen: undefined;
  MyIdentity: {address: string};
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
