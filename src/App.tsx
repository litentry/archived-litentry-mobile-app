import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import DashboardScreen from 'screen/DashboardScreen';
import WebviewScreen from 'screen/WebviewScreen';
import DevScreen from 'screen/DevScreen';
import DrawerScreen from 'screen/DrawerScreen';
import NetworkSelectionContextProvider from 'context/NetworkSelectionContext';
import ChainApiContextProvider from 'context/ChainApiContext';
import ScannerContextProvider from 'context/ScannerContext';
import AccountContextProvider from 'context/AccountContextProvider';
import {DrawerParamList} from './types';
import BalanceContextProvider from 'context/BalanceContext';
import TxContextProvider from 'context/TxContext';
import RegistrarListScreen from 'screen/RegistrarListScreen';
import {Host} from 'react-native-portalize';

import {IonicIconsPack} from './Ionic-icons';

// init type registry
import 'src/typeRegistry';

const Drawer = createDrawerNavigator();

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const DrawerContentComp = (props: PropTypes) => {
  return <DrawerScreen {...props} />;
};

function WithContexts({children}: {children: React.ReactNode}) {
  return (
    <NetworkSelectionContextProvider>
      <ChainApiContextProvider>
        <ScannerContextProvider>
          <AccountContextProvider>
            <BalanceContextProvider>
              <TxContextProvider>{children}</TxContextProvider>
            </BalanceContextProvider>
          </AccountContextProvider>
        </ScannerContextProvider>
      </ChainApiContextProvider>
    </NetworkSelectionContextProvider>
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
            <Drawer.Navigator drawerContent={DrawerContentComp}>
              <Drawer.Screen name="Dashboard" component={DashboardScreen} />
              <Drawer.Screen
                name="RegistrarList"
                component={RegistrarListScreen}
              />
              <Drawer.Screen name="Webview" component={WebviewScreen} />
              <Drawer.Screen name="DevScreen" component={DevScreen} />
            </Drawer.Navigator>
          </WithContexts>
        </Host>
      </ApplicationProvider>
    </>
  );
};
