module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended', 'prettier'],
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
        ],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
