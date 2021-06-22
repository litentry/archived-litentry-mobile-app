import React, {useContext} from 'react';
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
import messaging from '@react-native-firebase/messaging';

// init type registry
import 'src/typeRegistry';
import {Alert} from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  const {theme} = useContext(ThemeContext);
  React.useEffect(() => {
    requestUserPermission();
    messaging().getToken().then(console.log);
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
