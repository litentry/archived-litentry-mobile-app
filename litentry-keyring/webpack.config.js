const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify/'),
      stream: require.resolve('stream-browserify/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlInlineScriptPlugin(),
  ]
};