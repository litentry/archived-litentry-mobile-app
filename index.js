import './shim';
import 'proxy-polyfill'; // added for android hermes engine, double check when upgrade RN to 0.64
import 'react-native-gesture-handler';
import 'fast-text-encoding';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

/**
 * ignore warning about long period timers on android
 * more info on https://github.com/tannerlinsley/react-query/discussions/356#discussioncomment-4813
 **/
LogBox.ignoreLogs(['Setting a timer']);

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
