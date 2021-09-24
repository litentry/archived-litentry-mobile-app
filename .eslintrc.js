module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-restricted-imports': [
      2,
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['SafeAreaView'],
            message:
              'Using SafeAreaView from RN may result in buggy appearance, use react-native-safe-area-context instead.',
          },
          {
            name: '@react-native-community/async-storage',
            message: 'Please use src/service/AsyncStorage instead.',
          },
          {
            name: '@polkadot/util',
            importNames: ['formatBalance'],
            message: 'Please use useFormatBalance hook instead.',
          },
        ],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
