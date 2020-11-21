import 'proxy-polyfill'; // added for android hermes engine, double check when upgrade RN to 0.64
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import ThemeContextProvider from './src/context/ThemeProvider';
import {name as appName} from './app.json';

function WithContext(props) {
  return (
    <ThemeContextProvider>
      <App {...props} />
    </ThemeContextProvider>
  );
}
AppRegistry.registerComponent(appName, () => WithContext);
