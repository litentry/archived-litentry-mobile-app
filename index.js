import './shim';
import 'proxy-polyfill'; // added for android hermes engine, double check when upgrade RN to 0.64
import 'react-native-gesture-handler';
import 'fast-text-encoding';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
