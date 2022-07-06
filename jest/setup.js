import {Blob} from 'blob-polyfill';
import React from 'react';
import 'react-native-gesture-handler/jestSetup';

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
  };
});

jest.mock('react-native-in-app-message', () => {
  return {
    show: () => {},
    hide: () => {},
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

jest.mock('../src/polkadotApi/useAppAccounts', () => ({
  useAppAccounts: () => ({
    accounts: {},
    networkAccounts: [
      {
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
      },
    ],
    setAccounts: () => jest.fn(),
  }),
}));
