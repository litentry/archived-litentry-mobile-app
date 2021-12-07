import {ParaId} from '@polkadot/types/interfaces';

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
  manageIdentityScreen,
  notificationSettingsScreen,
  democracyScreen,
  permissionGrantingPromptScreen,
  registrarListScreen,
  proposeTipScreen,
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
  bountyDetailScreen,
  parathreadsScreen,
  parachainsOverviewScreen,
  parachainDetailScreen,
  parachainsNavigator,
  crowdloanScreen,
  crowdloanFundDetailScreen,
  mnemonicScreen,
  verifyMnemonicScreen,
  createAccountScreen,
  importAccountScreen,
  importAccountWithJsonFileScreen,
  exportAccountWithJsonFileScreen,
  apiLoadingScreen,
  networkSelectionScreen,
  connectionRetryScreen,
  appStack,
  apiLoadingStack,
  parachainAuctionsScreen,
  accountsGuideScreen,
  calendarScreen,
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
  [proposeTipScreen]: undefined;
  [treasuryScreen]: undefined;
  [motionsScreen]: undefined;
  [democracyScreen]: undefined;
  [referendumScreen]: {index: string};
  [democracyProposalScreen]: {index: string};
  [bountiesScreen]: undefined;
  [bountyDetailScreen]: {index: string};
  [calendarScreen]: undefined;
};

type DrawerParamList = {
  [dashboardNavigator]: undefined;
  [registrarListScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
  [polkassemblyDiscussionsNavigator]: undefined;
  [accountsNavigator]: undefined;
  [parachainsNavigator]: undefined;
};

type ParachainsStackParamList = {
  [parachainsOverviewScreen]: undefined;
  [parachainDetailScreen]: {id: string; name: string; period?: string; blocks?: string};
  [crowdloanScreen]: undefined;
  [crowdloanFundDetailScreen]: {title: string; paraId: ParaId};
  [parathreadsScreen]: undefined;
  [parachainAuctionsScreen]: undefined;
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
  [accountsGuideScreen]: undefined;
};

type AccountsStackParamList = {
  [mnemonicScreen]: undefined;
  [verifyMnemonicScreen]: {mnemonic: string};
  [createAccountScreen]: {mnemonic: string};
  [accountsScreen]: {reload?: boolean};
  [manageIdentityScreen]: {address: string};
  [myAccountScreen]: {address: string};
  [registerSubIdentitiesScreen]: {address: string};
  [importAccountScreen]: undefined;
  [importAccountWithJsonFileScreen]: undefined;
  [exportAccountWithJsonFileScreen]: {address: string};
};

type ApiLoadingStackParamList = {
  [apiLoadingScreen]: undefined;
  [networkSelectionScreen]: undefined;
  [connectionRetryScreen]: undefined;
};

type RootStackParamList = {
  [appStack]: undefined;
  [apiLoadingStack]: undefined;
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
