import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import {Blob} from 'blob-polyfill';
import React from 'react';
import 'react-native-gesture-handler/jestSetup';
require('@shopify/flash-list/jestSetup');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

global.__reanimatedWorkletInit = jest.fn();
global.Blob = Blob;

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-mmkv');

jest.mock('react-native-qrcode-scanner/node_modules/react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useIsFocused: () => ({
      isFocused: false,
    }),
    useFocusEffect: () => true,
  };
});

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return {
    default: mockComponent('react-native/Libraries/Components/Switch/Switch'),
  };
});
jest.mock('react-native-qrcode-scanner', () => <></>);

jest.mock('@gorhom/bottom-sheet', () => {
  const MockBottomSheet = require('@gorhom/bottom-sheet/mock');
  return {
    __esModule: true,
    ...MockBottomSheet,
    useBottomSheet: {
      expand: () => {},
    },
  };
});

jest.mock('react-native-share', () => {
  return {
    open: jest.fn(),
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
  };
});

jest.mock('react-native-device-info', () => {
  return {
    __esModule: true,
    default: {
      getVersion: jest.fn(() => {}),
      getBuildNumber: jest.fn(() => {}),
    },
  };
});
jest.mock('@react-native-community/clipboard', () => {
  return {
    setString: jest.fn(),
  };
});

jest.mock('@react-navigation/material-top-tabs', () => ({
  createMaterialTopTabNavigator: () => jest.fn(),
}));

const selectAccount = {
  encoded: 'MFMCAQEwBQYDK2VwBCIEIKEjAyEAnHhgkOJZiuiE/50fAdahqbrxOp5h9zYzqJKPTYC/ff4=',
  encoding: {content: ['pkcs8', 'sr25519'], type: ['none'], version: '3'},
  address: 'G7UkJAutjbQyZGRiP8z5bBSBPBJ66JbTKAkFDq3cANwENyX',
  meta: {
    name: 'Test account name',
    network: 'kusama',
    isFavorite: false,
    isExternal: true,
    whenCreated: 1657023528984,
  },
};

jest.mock('../src/polkadotApi/useAppAccounts', () => ({
  useAppAccounts: () => ({
    accounts: {},
    networkAccounts: [selectAccount],
    setAccounts: () => jest.fn(),
  }),
}));

jest.mock('@atoms/activeAccount', () => ({
  useActiveAccount: () => ({
    activeAccount: selectAccount,
    selectActiveAccount: () => selectAccount,
  }),
}));

jest.mock('react-native-aes-crypto', () => {
  return {
    __esModule: true,
    default: {
      randomKey: jest.fn(),
      pbkdf2: jest.fn(),
      encrypt: jest.fn(() => Promise.resolve()),
    },
  };
});

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve()),
  getGenericPassword: jest.fn(() => Promise.resolve()),
  resetGenericPassword: jest.fn(() => Promise.resolve()),
  setInternetCredentials: jest.fn().mockReturnValue(true),
  getSupportedBiometryType: jest.fn().mockReturnValue(true),
  ACCESS_CONTROL: {BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE: 'mockedpwd'},
  ACCESSIBLE: {WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: true},
}));

jest.mock('../src/hooks/useRemoteConfig', () => {
  return {
    useRemoteConfig: () => ({
      getValue: jest.fn(),
    }),
  };
});

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
