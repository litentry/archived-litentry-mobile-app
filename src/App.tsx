import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ChainApiContextProvider} from 'context/ChainApiContext';
import TxContextProvider from 'context/TxContext';
import {AccountsProvider} from 'src/context/AccountsContext';
import InAppNotificationContextProvider from 'src/context/InAppNotificationContext';
import NetworkContextProvider from 'src/context/NetworkContext';
import {ErrorBoundary} from 'src/ErrorBoundary';
import AppNavigator from '@ui/navigation/AppNavigator';
import ThemeProvider from './context/ThemeContext';
import {IonicIconsPack} from './Ionic-icons';
import {NavigationContainer} from 'context/NavigationContainer';

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
                          <AppNavigator />
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
