import {LinkingOptions} from '@react-navigation/native';
import {CompleteNavigatorParamList} from './navigation';

export const drawerNavigatorScreen = 'Drawer' as const;
export const appNavigator = 'App' as const;
export const apiLoadingNavigatorScreen = 'ApiLoadingNavigator' as const;
export const permissionGrantingPromptScreen = 'PermissionsGrantingPrompt' as const;
export const dashboardNavigator = 'DashboardNavigator' as const;
export const accountsNavigator = 'AccountsNavigator' as const;
export const parachainsNavigator = 'ParachainsNavigator' as const;

export const deeplinkNavigatorScreen = 'DeeplinkNavigatorScreen' as const;
export const addAccountScreen = 'AddAccountScreen' as const;
export const mnemonicScreen = 'Mnemonic' as const;
export const verifyMnemonicScreen = 'Verify Mnemonic' as const;
export const createAccountScreen = 'Create Account' as const;
export const balanceScreen = 'BalanceScreen' as const;
export const identityGuideScreen = 'IdentityGuideScreen' as const;

export const dashboardScreen = 'Dashboard' as const;
export const tipsScreen = 'Tips' as const;
export const tipDetailScreen = 'Tip' as const;
export const proposeTipScreen = 'Propose Tip' as const;
export const registrarListScreen = 'Registrars' as const;
export const motionDetailScreen = 'Motion' as const;
export const notificationSettingsScreen = 'Notification' as const;
export const accountsScreen = 'My Accounts' as const;
export const myAccountScreen = 'My Account' as const;
export const importAccountScreen = 'Import account' as const;
export const importAccountWithJsonFileScreen = 'Import json' as const;
export const exportAccountWithJsonFileScreen = 'Export json' as const;
export const bountiesScreen = 'Bounties' as const;
export const parachainsOverviewScreen = 'parachainsOverview' as const;
export const parachainDetailScreen = 'parachainDetail' as const;
export const parachainAuctionsScreen = 'parachainAuctions' as const;

export const webviewScreen = 'Webview' as const;
export const devScreen = 'Dev Kit' as const;
export const manageIdentityScreen = 'Manage Identity' as const;
export const registerSubIdentitiesScreen = 'Register Sub-Identities' as const;
export const councilScreen = 'Council' as const;
export const candidateScreen = 'Candidate' as const;
export const treasuryScreen = 'Treasury' as const;
export const motionsScreen = 'Motions' as const;
export const democracyScreen = 'Democracy' as const;
export const referendumScreen = 'Referendum' as const;
export const democracyProposalScreen = 'DemocracyProposal' as const;

export const parathreadsScreen = 'Parathreads' as const;
export const crowdloanScreen = 'Crowdloan' as const;
export const crowdloanFundDetailScreen = 'CrowdLoanDetailScreen' as const;

export const polkassemblyDiscussionsNavigator = 'PolkassemblyDiscussionsNavigator' as const;
export const polkassemblyDiscussions = 'PolkassemblyDiscussions' as const;
export const polkassemblyDiscussionDetail = 'PolkassemblyDiscussionDetail' as const;

export const apiLoadingScreen = 'ApiLoadingScreen' as const;
export const networkSelectionScreen = 'NetworkSelectionScreen' as const;
export const connectionRetryScreen = 'ConnectionRetryScreen' as const;

export const appStack = 'AppStack' as const;
export const apiLoadingStack = 'ApiLoadingStack' as const;

export const linking: LinkingOptions<CompleteNavigatorParamList> = {
  prefixes: ['litentry://'],

  config: {
    initialRouteName: appNavigator,
    screens: {
      [drawerNavigatorScreen]: {
        screens: {
          [dashboardNavigator]: {
            initialRouteName: dashboardScreen,
            screens: {
              [treasuryScreen]: 'treasury',
              [democracyScreen]: 'democracy',
              [tipsScreen]: 'tips',
            },
          },
        },
      },
    },
  },
};
