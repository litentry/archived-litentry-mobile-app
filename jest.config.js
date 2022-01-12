/* eslint-disable @typescript-eslint/no-var-requires */
const {defaults: tsjPreset} = require('ts-jest/presets');

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...tsjPreset,
  preset: 'react-native',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@polkadot|@babel/runtime/helpers/esm/)',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@ui/(.*)$': '<rootDir>/src/ui/$1',
    '^context/(.*)$': '<rootDir>/src/context/$1',
    '^image/(.*)$': '<rootDir>/src/image/$1',
    '^svg/(.*)$': '<rootDir>/src/svg/$1',
    '^service/(.*)$': '<rootDir>/src/service/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  verbose: true,
};

module.exports = config;
