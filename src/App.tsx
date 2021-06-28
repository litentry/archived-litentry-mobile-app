import React from 'react';
import {Host} from 'react-native-portalize';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import ChainApiContextProvider from 'context/ChainApiContext';
import {AccountsProvider} from 'src/context/AccountsContext';
import BalanceContextProvider from 'context/BalanceContext';
import TxContextProvider from 'context/TxContext';
import AppNavigator from 'src/navigation/AppNavigator';
import {IonicIconsPack} from './Ionic-icons';
import {ErrorBoundary} from 'src/ErrorBoundary';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DataContextProvider from 'src/context/DataContext';
import ThemeContextProvider from 'src/context/ThemeProvider';
import NetworkContextProvider from 'src/context/NetworkContext';
import InAppNotificationContextProvider from 'src/context/InAppNotificationContext';
import {useFirebase} from 'src/hook/useFirebase';
import {linking} from 'src/navigation/routeKeys';

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  useFirebase();

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, IonicIconsPack]} />

      <DataContextProvider>
        <NetworkContextProvider>
          <ChainApiContextProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeContextProvider>
                <ThemeContext.Consumer>
                  {({theme}) => (
                    <ApplicationProvider {...eva} theme={eva[theme]}>
                      <InAppNotificationContextProvider>
                        <SafeAreaProvider>
                          <ErrorBoundary>
                            <Host>
                              <AccountsProvider>
                                <BalanceContextProvider>
                                  <TxContextProvider>
                                    <NavigationContainer
                                      linking={linking}
                                      theme={theme === 'dark' ? DarkTheme : LightTheme}>
                                      <AppNavigator />
                                    </NavigationContainer>
                                  </TxContextProvider>
                                </BalanceContextProvider>
                              </AccountsProvider>
                            </Host>
                          </ErrorBoundary>
                        </SafeAreaProvider>
                      </InAppNotificationContextProvider>
                    </ApplicationProvider>
                  )}
                </ThemeContext.Consumer>
              </ThemeContextProvider>
            </QueryClientProvider>
          </ChainApiContextProvider>
        </NetworkContextProvider>
      </DataContextProvider>
    </>
  );
}

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FFFFFF' /*text-alternative-color*/,
    background: '#222B45' /*background-alternative-color-1*/,
    card: '#222B45' /*background-alternative-color-1*/,
    text: '#FFFFFF' /*text-alternative-color*/,
    border: '#222B45',
    notification: '#222B45',
  },
};

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#222B45' /*text-basic-color*/,
    background: '#FFFFFF' /*background-alternative-color-1*/,
    card: '#FFFFFF',
    text: '#222B45' /*text-basic-color*/,
    border: '#FFFFFF',
    notification: '#FFFFFF',
  },
};
