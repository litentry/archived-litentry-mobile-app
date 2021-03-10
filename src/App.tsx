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

// init type registry
import 'src/typeRegistry';

function WithContexts({children}: {children: React.ReactNode}) {
  return (
    <ChainApiContextProvider>
      <AccountContextProvider>
        <BalanceContextProvider>
          <TxContextProvider>{children}</TxContextProvider>
        </BalanceContextProvider>
      </AccountContextProvider>
    </ChainApiContextProvider>
  );
}

export default () => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, IonicIconsPack]} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <Host>
          <WithContexts>
            <AppNavigator />
          </WithContexts>
        </Host>
      </ApplicationProvider>
    </>
  );
};
