import {
  addAccountScreen,
  balanceScreen,
  councilScreen,
  candidateScreen,
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
  polkaassemblyDiscussions,
  polkaassemblyDiscussionDetail,
  polkaassemblyDiscussionsNavigator,
} from 'src/navigation/routeKeys';

type DashboardStackParamList = {
  [dashboardScreen]: undefined;
  [motionDetailScreen]: {
    hash: string;
  };
  [tipsScreen]: undefined;
  [tipDetailScreen]: {
    hash: string;
  };
  [councilScreen]: undefined;
  [candidateScreen]: {
    accountId: string;
    title: string;
    backing?: string;
  };
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
  [polkaassemblyDiscussionsNavigator]: undefined;
};

type PolkaassemblyDiscussionStackParamList = {
  [polkaassemblyDiscussions]: undefined;
  [polkaassemblyDiscussionDetail]: {id: number};
};

type AppStackParamList = {
  [permissionGrantingPromptScreen]: undefined;
  [drawerNavigatorScreen]: undefined;
  [addAccountScreen]: undefined;
  [balanceScreen]: {address: string};
};

type CompleteNavigatorParamList = AppStackParamList &
  DrawerParamList &
  RootParamList &
  DashboardStackParamList &
  PolkaassemblyDiscussionStackParamList;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends CompleteNavigatorParamList {
      // Specifying default types for useNavigation, Link, ref, etc
    }
  }
}
