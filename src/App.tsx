import React, {useContext} from 'react';
import {Host} from 'react-native-portalize';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import ChainApiContextProvider from 'context/ChainApiContext';
import AccountContextProvider from 'context/AccountContextProvider';
import BalanceContextProvider from 'context/BalanceContext';
import TxContextProvider from 'context/TxContext';
import AppNavigator from 'src/navigation/AppNavigator';
import {IonicIconsPack} from './Ionic-icons';
import {ErrorBoundary} from 'src/ErrorBoundary';
import {QueryClient, QueryClientProvider} from 'react-query';

// init type registry
import 'src/typeRegistry';

const queryClient = new QueryClient();

export default function App() {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, IonicIconsPack]} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ErrorBoundary>
          <Host>
            <ChainApiContextProvider>
              <QueryClientProvider client={queryClient}>
                <AccountContextProvider>
                  <BalanceContextProvider>
                    <TxContextProvider>
                      <AppNavigator />
                    </TxContextProvider>
                  </BalanceContextProvider>
                </AccountContextProvider>
              </QueryClientProvider>
            </ChainApiContextProvider>
          </Host>
        </ErrorBoundary>
      </ApplicationProvider>
    </>
  );
}
