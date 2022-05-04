/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;
const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      'bn.js': path.resolve(__dirname, './node_modules/react-native-bignumber'),
    },
    sourceExts: process.env.RN_SRC_EXT
      ? [...process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts), 'cjs'] // <-- cjs added here
      : [...defaultSourceExts, 'cjs'], // <-- cjs added here
  },
};
