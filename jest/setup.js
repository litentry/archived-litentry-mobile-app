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
const mockBlob = jest.fn();
mockBlob.prototype.size = 1;
global.Blob = mockBlob;

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-mmkv');

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

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
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

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => {
    return mockNavigation;
  },
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});
