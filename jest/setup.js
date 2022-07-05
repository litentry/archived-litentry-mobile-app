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

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useIsFocused: () => ({
      isFocused: false,
    }),
  };
});

jest.mock('react-native-qrcode-scanner/node_modules/react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

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

jest.mock('react-native-aes-crypto', () => {
  return {
    __esModule: true,
    default: {
      randomKey: jest.fn(() => Promise.resolve()),
      pbkdf2: jest.fn(),
      encrypt: jest.fn(),
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
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
