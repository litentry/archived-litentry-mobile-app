module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
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
  },
};
