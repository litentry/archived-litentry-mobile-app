import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ChainApiContextProvider} from 'context/ChainApiContext';
import TxContextProvider from 'context/TxContext';
import {AccountsProvider} from 'context/AccountsContext';
import InAppNotificationContextProvider from 'context/InAppNotificationContext';
import NetworkContextProvider, {useCurrentNetwork} from 'context/NetworkContext';
import {ErrorBoundary} from '@ui/components/ErrorBoundary';
import AppNavigator from '@ui/navigation/AppNavigator';
import {NavigationContainer} from '@ui/navigation/NavigationContainer';
import ThemeProvider from 'context/ThemeContext';
import SnackbarProvider from 'context/SnackbarContext';
import {LitentryApiClientProvider} from 'context/LitentryApiContext';
import {WalletConnectProvider} from 'context/WalletConnectProvider';

// init type registry
import 'src/typeRegistry';
import {ParachainAppNavigator} from '@ui/navigation/ParachainAppNavigator';

const queryClient = new QueryClient();

function MainApp() {
  return (
    <LitentryApiClientProvider>
      <AppNavigator />
    </LitentryApiClientProvider>
  );
}

function LitentryApps() {
  const {isParachain} = useCurrentNetwork();

  if (isParachain) {
    return (
      <WalletConnectProvider>
        <ParachainAppNavigator />
      </WalletConnectProvider>
    );
  }

  return <MainApp />;
}

export default function App() {
  return (
    <NetworkContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <ChainApiContextProvider>
            <AccountsProvider>
              <SafeAreaProvider>
                <ThemeProvider>
                  <InAppNotificationContextProvider>
                    <ErrorBoundary>
                      <TxContextProvider>
                        <SnackbarProvider>
                          <LitentryApps />
                        </SnackbarProvider>
                      </TxContextProvider>
                    </ErrorBoundary>
                  </InAppNotificationContextProvider>
                </ThemeProvider>
              </SafeAreaProvider>
            </AccountsProvider>
          </ChainApiContextProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </NetworkContextProvider>
  );
}
