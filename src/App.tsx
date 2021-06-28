import React from 'react';
import {Host} from 'react-native-portalize';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {useTheme} from './context/ThemeContext';
import ChainApiContextProvider from 'context/ChainApiContext';
import {AccountsProvider} from 'src/context/AccountsContext';
import BalanceContextProvider from 'context/BalanceContext';
import TxContextProvider from 'context/TxContext';
import AppNavigator from 'src/navigation/AppNavigator';
import {IonicIconsPack} from './Ionic-icons';
import {ErrorBoundary} from 'src/ErrorBoundary';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useFirebase} from 'src/hook/useFirebase';

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  const {theme} = useTheme();
  useFirebase();

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, IonicIconsPack]} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ErrorBoundary>
          <Host>
            <ChainApiContextProvider>
              <QueryClientProvider client={queryClient}>
                <AccountsProvider>
                  <BalanceContextProvider>
                    <TxContextProvider>
                      <AppNavigator />
                    </TxContextProvider>
                  </BalanceContextProvider>
                </AccountsProvider>
              </QueryClientProvider>
            </ChainApiContextProvider>
          </Host>
        </ErrorBoundary>
      </ApplicationProvider>
    </>
  );
}
