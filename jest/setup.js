import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-mmkv');

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
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
