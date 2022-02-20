import type {ParaId} from '@polkadot/types/interfaces';
import type {CouncilCandidate, CouncilMember} from 'src/api/hooks/useCouncil';
import type {DemocracyProposal} from 'src/api/hooks/useDemocracyProposals';
import type {DemocracyReferendum} from 'src/api/hooks/useDemocracyReferendum';

import {
  addAccountScreen,
  balanceScreen,
  councilScreen,
  candidateScreen,
  dashboardNavigator,
  dashboardScreen,
  devScreen,
  drawerNavigator,
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
  crowdloansNavigator,
  crowdloanScreen,
  crowdloanFundDetailScreen,
  mnemonicScreen,
  verifyMnemonicScreen,
  createAccountScreen,
  importAccountScreen,
  exportAccountWithJsonFileScreen,
  networkSelectionScreen,
  parachainAuctionsScreen,
  accountsGuideScreen,
  receiveFundScreen,
  sendFundScreen,
  feedbackScreen,
} from '@ui/navigation/routeKeys';

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
  [crowdloansNavigator]: undefined;
  [feedbackScreen]: undefined;
  [parathreadsScreen]: undefined;
  [parachainAuctionsScreen]: undefined;
};

type ParachainsStackParamList = {
  [parachainsOverviewScreen]: undefined;
  [parachainDetailScreen]: {id: string; name: string; period?: string; blocks?: string};
};

type CrowdloansStackParamList = {
  [crowdloanScreen]: undefined;
  [crowdloanFundDetailScreen]: {title: string; paraId: ParaId};
};

type PolkassemblyDiscussionStackParamList = {
  [polkassemblyDiscussions]: undefined;
  [polkassemblyDiscussionDetail]: {id: number};
};

type AppStackParamList = {
  [permissionGrantingPromptScreen]: undefined;
  [drawerNavigator]: undefined;
  [networkSelectionScreen]: undefined;
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
