import {LinkingOptions} from '@react-navigation/native';

export const appNavigatorScreen = 'App' as const;
export const apiLoadingNavigatorScreen = 'ApiLoadingNavigator' as const;
export const permissionGrantingPromptScreen = 'PermissionsGrantingPrompt' as const;
export const dashboardNavigator = 'DashboardNavigator' as const;

export const apiLoadingScreen = 'Api Loading' as const;

export const dashboardScreen = 'Dashboard' as const;
export const tipsScreen = 'Tips' as const;
export const tipDetailScreen = 'Tip' as const;
export const submitTipScreen = 'Submit Tip' as const;
export const registrarListScreen = 'Registrars' as const;
export const motionDetailScreen = 'Motion' as const;
export const notificationSettingsScreen = 'Notification' as const;

export const webviewScreen = 'Webview' as const;
export const devScreen = 'Dev Kit' as const;
export const myIdentityScreen = 'My Identity' as const;
export const councilScreen = 'Council' as const;
export const treasuryScreen = 'Treasury' as const;
export const motionsScreen = 'Motions' as const;
export const referendaScreen = 'Referenda' as const;
export const referendumScreen = 'Referendum' as const;

export const linking: LinkingOptions = {
  prefixes: ['litentry://'],

  config: {
    initialRouteName: appNavigatorScreen,
    screens: {
      [apiLoadingScreen]: 'api/:network/:redirectTo?',
      [appNavigatorScreen]: {
        initialRouteName: dashboardNavigator,
        path: '',
        screens: {
          [dashboardNavigator]: {
            initialRouteName: dashboardScreen,
            screens: {
              [treasuryScreen]: 'treasury',
              [referendaScreen]: 'referenda',
              [tipsScreen]: 'tips',
            },
          },
        },
      },
    },
  },
};
