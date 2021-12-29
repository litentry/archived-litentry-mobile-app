import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ChainApiContextProvider} from 'context/ChainApiContext';
import TxContextProvider from 'context/TxContext';
import {AccountsProvider} from 'context/AccountsContext';
import InAppNotificationContextProvider from 'context/InAppNotificationContext';
import NetworkContextProvider from 'context/NetworkContext';
import {ErrorBoundary} from '@ui/components/ErrorBoundary';
import AppNavigator from '@ui/navigation/AppNavigator';
import ThemeProvider from 'context/ThemeContext';
import {IonicIconsPack} from './Ionic-icons';
import {NavigationContainer} from 'context/NavigationContainer';
import SnackbarProvider from 'context/SnackbarContext';

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <IconRegistry icons={[EvaIconsPack, IonicIconsPack]} />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <NetworkContextProvider>
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
          </NetworkContextProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}
