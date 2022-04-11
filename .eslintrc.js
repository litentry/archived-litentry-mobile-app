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
            name: '@polkadot/util',
            importNames: ['formatBalance'],
            message: 'Please use useFormatBalance hook instead.',
          },
          {
            name: 'react-native-paper',
            importNames: ['useTheme'],
            message: 'Please import useTheme from @ui/library instead.',
          },
          {
            name: '@react-navigation/native',
            importNames: ['useTheme'],
            message: 'Please import useTheme from @ui/library instead.',
          },
          {
            name: '@ui/library',
            importNames: ['Snackbar'],
            message: 'Please use useSnackbar from context/SnackbarContext instead.',
          },
          {
            name: '@testing-library/react-native',
            message: 'Please use src/testUtils instead',
          },
        ],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
