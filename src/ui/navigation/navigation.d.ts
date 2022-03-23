import {
  accountsGuideScreen,
  accountsNavigator,
  accountsScreen,
  addAccountScreen,
  addBountyScreen,
  balanceScreen,
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
  democracyProposalScreen,
  democracyScreen,
  devScreen,
  drawerNavigator,
  eventsCalendarScreen,
  exportAccountWithJsonFileScreen,
  feedbackScreen,
  identityGuideScreen,
  importAccountScreen,
  manageIdentityScreen,
  memberDetailsScreen,
  mnemonicScreen,
  motionDetailScreen,
  motionsScreen,
  myAccountScreen,
  networkSelectionScreen,
  notificationSettingsScreen,
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
  receiveFundScreen,
  referendumScreen,
  registerSubIdentitiesScreen,
  registrarListScreen,
  sendFundScreen,
  technicalCommitteeScreen,
  tipDetailScreen,
  tipsScreen,
  treasuryScreen,
  verifyMnemonicScreen,
  webviewScreen,
} from '@ui/navigation/routeKeys';
import type {CouncilCandidate, CouncilMember} from 'src/api/hooks/useCouncil';
import type {DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';

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
    candidate: CouncilCandidate | CouncilMember;
    title: string;
  };
  [proposeTipScreen]: undefined;
  [treasuryScreen]: undefined;
  [motionsScreen]: undefined;
  [democracyScreen]: undefined;
  [referendumScreen]: {referendum: DemocracyReferendum};
  [democracyProposalScreen]: {proposal: DemocracyProposal};
  [bountiesScreen]: undefined;
  [bountyDetailScreen]: {index: string};
  [addBountyScreen]: undefined;
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
  [eventsCalendarScreen]: undefined;
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
  [memberDetailsScreen]: {address: string};
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
  [receiveFundScreen]: {address: string};
  [sendFundScreen]: {address: string};
  [addAccountScreen]: undefined;
  [balanceScreen]: {address: string};
  [identityGuideScreen]: undefined;
  [accountsGuideScreen]: undefined;
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
