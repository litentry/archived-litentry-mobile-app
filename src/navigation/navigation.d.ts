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
};

type DrawerParamList = {
  Dashboard: undefined;
  RegistrarList: undefined;
  Webview: {uri: string; title: string};
  DevScreen: undefined;
  MyIdentity: {address: string};
};

type AppStackParamList = DrawerParamList &
  ApiNavigatorParamList &
  DashboardStackParamList;

type ApiNavigatorParamList = {
  ApiLoadingPage: undefined;
  NetworkSelectScreen: undefined;
};
