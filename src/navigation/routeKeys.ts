import {LinkingOptions} from '@react-navigation/native';

export const dashboard = 'Dashboard' as const;
export const tips = 'Tips' as const;
export const tipDetail = 'TipDetail' as const;
export const submitTip = 'SubmitTipScreen' as const;
export const registrarList = 'RegistrarList' as const;
export const motionDetail = 'MotionDetail' as const;
export const notificationSettingsScreen = 'NotificationSettingsScreen' as const;

export const webview = 'Webview' as const;
export const devScreen = 'DevScreen' as const;
export const myIdentity = 'MyIdentity' as const;
export const councilScreen = 'CouncilScreen' as const;
export const treasuryScreen = 'TreasuryScreen' as const;
export const motionsScreen = 'MotionsScreen' as const;

export const linking: LinkingOptions = {
  prefixes: ['litentry://'],

  config: {
    screens: {
      App: {
        screens: {
          [dashboard]: {
            screens: {
              [treasuryScreen]: 'treasury',
            },
          },
        },
      },
    },
  },
};
