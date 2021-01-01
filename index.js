import './shim';
import 'proxy-polyfill'; // added for android hermes engine, double check when upgrade RN to 0.64
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import DataContextProvider from './src/context/DataContext';
import ThemeContextProvider from './src/context/ThemeProvider';
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
        <DataContextProvider>
          <NetworkContextProvider>
            <ThemeContextProvider>
              <App {...props} />
            </ThemeContextProvider>
          </NetworkContextProvider>
        </DataContextProvider>
      </NavigationContainer>
    </InAppNotificationContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => WithContext);
