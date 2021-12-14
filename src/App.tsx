import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.appContainer}>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
