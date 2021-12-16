import './shim';
import 'proxy-polyfill'; // added for android hermes engine, double check when upgrade RN to 0.64
import 'react-native-gesture-handler';
import 'fast-text-encoding';
import Sentry from './sentry';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
import dayjs from 'dayjs';

const SentryApp = Sentry.wrap(App);

// setup dayjs
// eslint-disable-next-line @typescript-eslint/no-var-requires
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

/**
 * ignore warning about long period timers on android
 * more info on https://github.com/tannerlinsley/react-query/discussions/356#discussioncomment-4813
 **/
LogBox.ignoreLogs(['Setting a timer']);

AppRegistry.registerComponent(appName, () => SentryApp);
