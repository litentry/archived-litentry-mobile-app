import React from 'react';
import {Host} from 'react-native-portalize';
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
import AppNavigator from 'src/navigation/AppNavigator';
import ThemeProvider from './context/ThemeContext';
import {IonicIconsPack} from './Ionic-icons';
import {NavigationContainer} from 'context/NavigationContainer';
import SplashScreen from 'react-native-splash-screen';

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, IonicIconsPack]} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationContainer>
            <NetworkContextProvider>
              <ChainApiContextProvider>
                <AccountsProvider>
                  <SafeAreaProvider>
                    <InAppNotificationContextProvider>
                      <ErrorBoundary>
                        <Host>
                          <TxContextProvider>
                            <AppNavigator />
                          </TxContextProvider>
                        </Host>
                      </ErrorBoundary>
                    </InAppNotificationContextProvider>
                  </SafeAreaProvider>
                </AccountsProvider>
              </ChainApiContextProvider>
            </NetworkContextProvider>
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
