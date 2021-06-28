import './shim';
import 'proxy-polyfill'; // added for android hermes engine, double check when upgrade RN to 0.64
import 'react-native-gesture-handler';
import 'fast-text-encoding';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import ThemeProvider from './src/context/ThemeContext';
import NetworkContextProvider from './src/context/NetworkContext';
import InAppNotificationContextProvider from './src/context/InAppNotificationContext';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

function WithContext(props) {
  return (
    <InAppNotificationContextProvider>
      <NavigationContainer>
        <NetworkContextProvider>
          <ThemeProvider>
            <App {...props} />
          </ThemeProvider>
        </NetworkContextProvider>
      </NavigationContainer>
    </InAppNotificationContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => WithContext);
