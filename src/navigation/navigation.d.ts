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
  polkassemblyDiscussions,
  polkassemblyDiscussionDetail,
  polkassemblyDiscussionsNavigator,
  registerSubIdentitiesScreen,
  accountsScreen,
  accountsNavigator,
  identityGuideScreen,
  myAccountScreen,
  bountiesScreen,
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
  [democracyScreen]: undefined;
  [referendumScreen]: {index: string};
  [democracyProposalScreen]: {index: string};
  [bountiesScreen]: undefined;
};

type DrawerParamList = {
  [dashboardNavigator]: undefined;
  [registrarListScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
  [polkassemblyDiscussionsNavigator]: undefined;
  [accountsNavigator]: undefined;
};

type PolkassemblyDiscussionStackParamList = {
  [polkassemblyDiscussions]: undefined;
  [polkassemblyDiscussionDetail]: {id: number};
};

type AppStackParamList = {
  [permissionGrantingPromptScreen]: undefined;
  [drawerNavigatorScreen]: undefined;
  [addAccountScreen]: undefined;
  [balanceScreen]: {address: string};
  [identityGuideScreen]: undefined;
};

type AccountsStackParamList = {
  [accountsScreen]: undefined;
  [myIdentityScreen]: {address: string};
  [myAccountScreen]: {address: string};
  [registerSubIdentitiesScreen]: {address: string};
};

type CompleteNavigatorParamList = AppStackParamList &
  DrawerParamList &
  RootParamList &
  DashboardStackParamList &
  AccountsStackParamList &
  PolkassemblyDiscussionStackParamList;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends CompleteNavigatorParamList {
      // Specifying default types for useNavigation, Link, ref, etc
    }
  }
}
