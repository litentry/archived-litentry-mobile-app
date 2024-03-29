import {
  accountScreen,
  accountsNavigator,
  accountsScreen,
  bountiesScreen,
  bountyDetailScreen,
  candidateScreen,
  councilScreen,
  createAccountScreen,
  crowdloanFundDetailScreen,
  crowdloanScreen,
  crowdloansNavigator,
  dashboardNavigator,
  dashboardScreen,
  democracyScreen,
  democracyReferendumDetailScreen,
  democracyProposalDetailScreen,
  devScreen,
  drawerNavigator,
  eventsCalendarScreen,
  exportAccountWithJsonFileScreen,
  feedbackScreen,
  importAccountScreen,
  manageIdentityScreen,
  mnemonicScreen,
  motionDetailScreen,
  motionsScreen,
  myAccountScreen,
  networkSelectionScreen,
  notificationSettingsScreen,
  onboardingScreen,
  parachainAuctionsScreen,
  parachainDetailScreen,
  parachainsNavigator,
  parachainsOverviewScreen,
  parathreadsScreen,
  permissionGrantingPromptScreen,
  polkassemblyDiscussionDetail,
  polkassemblyDiscussions,
  polkassemblyDiscussionsNavigator,
  proposeTipScreen,
  registerSubIdentitiesScreen,
  registrarListScreen,
  technicalCommitteeScreen,
  tipDetailScreen,
  tipsScreen,
  treasuryScreen,
  verifyMnemonicScreen,
  webviewScreen,
} from '@ui/navigation/routeKeys';
import type {CouncilMember} from 'src/api/hooks/useCouncil';

type DashboardStackParamList = {
  [dashboardScreen]: undefined;
  [motionDetailScreen]: {
    hash: string;
  };
  [tipsScreen]: undefined;
  [tipDetailScreen]: {
    id: string;
  };
  [councilScreen]: undefined;
  [candidateScreen]: {
    candidate: CouncilMember;
    title: string;
  };
  [proposeTipScreen]: undefined;
  [treasuryScreen]: undefined;
  [motionsScreen]: undefined;
  [democracyScreen]: undefined;
  [democracyReferendumDetailScreen]: {id: string};
  [democracyProposalDetailScreen]: {id: string};
  [bountiesScreen]: undefined;
  [bountyDetailScreen]: {index: string};
  [eventsCalendarScreen]: undefined;
  [onboardingScreen]: undefined;
};

type DrawerParamList = {
  [dashboardNavigator]: undefined;
  [registrarListScreen]: undefined;
  [technicalCommitteeScreen]: undefined;
  [webviewScreen]: {uri: string; title: string};
  [devScreen]: undefined;
  [notificationSettingsScreen]: undefined;
  [polkassemblyDiscussionsNavigator]: undefined;
  [accountsNavigator]: undefined;
  [parachainsNavigator]: undefined;
  [crowdloansNavigator]: undefined;
  [feedbackScreen]: undefined;
  [parathreadsScreen]: undefined;
  [parachainAuctionsScreen]: undefined;
};

type ParachainsStackParamList = {
  [parachainsOverviewScreen]: undefined;
  [parachainDetailScreen]: {parachainId: string};
};

type CrowdloansStackParamList = {
  [crowdloanScreen]: undefined;
  [crowdloanFundDetailScreen]: {title: string; paraId: string};
};

type PolkassemblyDiscussionStackParamList = {
  [polkassemblyDiscussions]: undefined;
  [polkassemblyDiscussionDetail]: {id: number};
};

type AppStackParamList = {
  [permissionGrantingPromptScreen]: undefined;
  [drawerNavigator]: undefined;
  [networkSelectionScreen]: undefined;
  [accountScreen]: {address: string};
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
  [exportAccountWithJsonFileScreen]: {address: string};
};

type CompleteNavigatorParamList = AppStackParamList &
  DrawerParamList &
  DashboardStackParamList &
  AccountsStackParamList &
  ParachainsStackParamList &
  CrowdloansStackParamList &
  PolkassemblyDiscussionStackParamList;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends CompleteNavigatorParamList {
      // Specifying default types for useNavigation, Link, ref, etc
    }
  }
}
