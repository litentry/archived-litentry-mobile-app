module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
  plugins: [
    'babel-plugin-transform-import-meta',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          src: './src',
          image: './src/image',
          svg: './svg',
          assets: './assets',
          context: './src/context',
          service: './src/service',
          '@hooks': './src/hooks',
          '@ui': './src/ui',
        },
      },
    ],
    'react-native-reanimated/plugin', // This has to be listed last.
  ],
};
