import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ChainApiContextProvider} from 'context/ChainApiContext';
import TxContextProvider from 'context/TxContext';
import {AccountsProvider} from 'context/AccountsContext';
import InAppNotificationContextProvider from 'context/InAppNotificationContext';
import NetworkContextProvider from 'context/NetworkContext';
import {ErrorBoundary} from '@ui/components/ErrorBoundary';
import AppNavigator from '@ui/navigation/AppNavigator';
import {NavigationContainer} from '@ui/navigation/NavigationContainer';
import ThemeProvider from 'context/ThemeContext';
import SnackbarProvider from 'context/SnackbarContext';
import {LitentryApiClientProvider} from 'context/LitentryApiContext';

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkContextProvider>
        <LitentryApiClientProvider>
          <NavigationContainer>
            <ChainApiContextProvider>
              <AccountsProvider>
                <SafeAreaProvider>
                  <ThemeProvider>
                    <InAppNotificationContextProvider>
                      <ErrorBoundary>
                        <TxContextProvider>
                          <SnackbarProvider>
                            <AppNavigator />
                          </SnackbarProvider>
                        </TxContextProvider>
                      </ErrorBoundary>
                    </InAppNotificationContextProvider>
                  </ThemeProvider>
                </SafeAreaProvider>
              </AccountsProvider>
            </ChainApiContextProvider>
          </NavigationContainer>
        </LitentryApiClientProvider>
      </NetworkContextProvider>
    </QueryClientProvider>
  );
}
