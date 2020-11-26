import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RegistrarScreen from 'screen/Registrar';
import WebviewScreen from 'screen/Webview';
import DrawerScreen from 'screen/Drawer';
import NetworkSelectionContextProvider from 'context/NetworkSelectionContext';
import ChainApiContextProvider from 'context/ChainApiContext';
import ScannerContextProvider from 'context/ScannerContext';
import AccountContextProvider from 'context/AccountContextProvider';

const Drawer = createDrawerNavigator();

const DrawerContentComp = () => {
  return <DrawerScreen />;
};

export default () => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <NetworkSelectionContextProvider>
          <ChainApiContextProvider>
            <ScannerContextProvider>
              <AccountContextProvider>
                <Drawer.Navigator drawerContent={DrawerContentComp}>
                  <Drawer.Screen name="Registrar" component={RegistrarScreen} />
                  <Drawer.Screen name="Webview" component={WebviewScreen} />
                </Drawer.Navigator>
              </AccountContextProvider>
            </ScannerContextProvider>
          </ChainApiContextProvider>
        </NetworkSelectionContextProvider>
      </ApplicationProvider>
    </>
  );
};
