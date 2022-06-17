import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useStopStartupTrace} from 'react-native-startup-trace';
import {ChainApiContextProvider} from 'context/ChainApiContext';
import {TxProvider} from 'context/TxContext';
import {AccountsProvider} from 'context/AccountsContext';
import InAppNotificationContextProvider from 'context/InAppNotificationContext';
import NetworkContextProvider, {useNetwork} from 'context/NetworkContext';
import {ErrorBoundary} from '@ui/components/ErrorBoundary';
import AppNavigator from '@ui/navigation/AppNavigator';
import {NavigationContainer} from '@ui/navigation/NavigationContainer';
import ThemeProvider from 'context/ThemeContext';
import SnackbarProvider from 'context/SnackbarContext';
import {LitentryApiClientProvider} from 'context/LitentryApiContext';
import {WalletConnectProvider} from 'context/WalletConnectProvider';
import {Web3WalletProvider} from 'context/Web3WalletContext';
import {useRemoteConfig} from 'src/hooks/useRemoteConfig';

// init type registry
import 'src/typeRegistry';
import {ParachainAppNavigator} from '@ui/navigation/ParachainAppNavigator';
import {PolkadotApiWebView} from '@polkadotApi/PolkadotApiWebView';
import {RecoilRoot} from 'recoil';

const queryClient = new QueryClient();

function MainApp() {
  return <AppNavigator />;
}

function ParachainApp() {
  return (
    <WalletConnectProvider>
      <Web3WalletProvider>
        <ParachainAppNavigator />
      </Web3WalletProvider>
    </WalletConnectProvider>
  );
}

function LitentryApps() {
  const {currentNetwork} = useNetwork();

  if (currentNetwork.isParachain) {
    return <ParachainApp />;
  }

  return <MainApp />;
}

export default function App() {
  useStopStartupTrace();
  useRemoteConfig();

  return (
    <NetworkContextProvider>
      <LitentryApiClientProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <ChainApiContextProvider>
              <AccountsProvider>
                <SafeAreaProvider>
                  <ThemeProvider>
                    <InAppNotificationContextProvider>
                      <ErrorBoundary>
                        <RecoilRoot>
                          <TxProvider>
                            <SnackbarProvider>
                              <LitentryApps />
                              <PolkadotApiWebView />
                            </SnackbarProvider>
                          </TxProvider>
                        </RecoilRoot>
                      </ErrorBoundary>
                    </InAppNotificationContextProvider>
                  </ThemeProvider>
                </SafeAreaProvider>
              </AccountsProvider>
            </ChainApiContextProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </LitentryApiClientProvider>
    </NetworkContextProvider>
  );
}
