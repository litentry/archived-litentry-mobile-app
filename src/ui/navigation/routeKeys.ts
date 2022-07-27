import {LinkingOptions} from '@react-navigation/native';
import {CompleteNavigatorParamList} from './navigation';

export const drawerNavigator = 'Drawer' as const;
export const appNavigator = 'App' as const;
export const permissionGrantingPromptScreen = 'PermissionsGrantingPrompt' as const;
export const dashboardNavigator = 'DashboardNavigator' as const;
export const accountsNavigator = 'AccountsNavigator' as const;
export const parachainsNavigator = 'ParachainsNavigator' as const;
export const crowdloansNavigator = 'CrowdloansNavigator' as const;
export const eventsCalendarScreen = 'Events' as const;

export const deeplinkNavigatorScreen = 'DeeplinkNavigatorScreen' as const;
export const mnemonicScreen = 'Mnemonic' as const;
export const verifyMnemonicScreen = 'Verify Mnemonic' as const;
export const createAccountScreen = 'Create Account' as const;

export const dashboardScreen = 'Dashboard' as const;
export const tipsScreen = 'Tips' as const;
export const tipDetailScreen = 'Tip' as const;
export const proposeTipScreen = 'Propose Tip' as const;
export const registrarListScreen = 'Registrars' as const;
export const technicalCommitteeScreen = 'Technical Committee' as const;
export const motionDetailScreen = 'Motion' as const;
export const notificationSettingsScreen = 'Notification' as const;
export const accountsScreen = 'My Accounts' as const;
export const myAccountScreen = 'My Account' as const;
export const importAccountScreen = 'Import Account' as const;
export const exportAccountWithJsonFileScreen = 'Export JSON' as const;
export const bountiesScreen = 'Bounties' as const;
export const bountyDetailScreen = 'Bounty' as const;
export const parachainsOverviewScreen = 'Overview' as const;
export const parachainDetailScreen = 'Parachain' as const;
export const parachainAuctionsScreen = 'Auctions' as const;
export const feedbackScreen = 'Feedback' as const;
export const onboardingScreen = 'Onboarding' as const;

export const webviewScreen = 'Webview' as const;
export const devScreen = 'Dev Kit' as const;
export const manageIdentityScreen = 'Manage Identity' as const;
export const registerSubIdentitiesScreen = 'Register Sub-Identities' as const;
export const councilScreen = 'Council' as const;
export const candidateScreen = 'Candidate' as const;
export const treasuryScreen = 'Treasury' as const;
export const motionsScreen = 'Motions' as const;

export const democracyScreen = 'Democracy' as const;
export const democracyReferendumDetailScreen = 'Referendum' as const;
export const democracyProposalDetailScreen = 'Proposal' as const;

export const parathreadsScreen = 'Parathreads' as const;
export const crowdloanScreen = 'Crowdloan' as const;
export const crowdloanFundDetailScreen = 'Fund Detail' as const;

export const polkassemblyDiscussionsNavigator = 'PolkassemblyDiscussionsNavigator' as const;
export const polkassemblyDiscussions = 'Discussions' as const;
export const polkassemblyDiscussionDetail = 'Discussion' as const;

export const networkSelectionScreen = 'Select Network' as const;
export const accountScreen = 'Account Details' as const;

export const tokenMigrationScreen = 'Token Migration' as const;

export const linking: LinkingOptions<CompleteNavigatorParamList> = {
  prefixes: ['litentry://'],

  config: {
    initialRouteName: drawerNavigator,
    screens: {
      [drawerNavigator]: {
        screens: {
          [dashboardNavigator]: {
            initialRouteName: dashboardScreen,
            screens: {
              [treasuryScreen]: {
                screens: {
                  [treasuryScreen]: 'treasury',
                  [tipsScreen]: 'tips',
                },
              },
              [councilScreen]: {
                screens: {
                  [councilScreen]: 'council',
                  [motionsScreen]: 'motions',
                },
              },
              [democracyScreen]: 'democracy',
              [bountiesScreen]: 'bounties',
            },
          },
        },
      },
    },
  },
};
