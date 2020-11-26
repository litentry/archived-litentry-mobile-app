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
import InAppNotificationContextProvider from 'context/InAppNotificationContext';
import ScannerContextProvider from 'context/ScannerContext';

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
            <InAppNotificationContextProvider>
              <ScannerContextProvider>
                <Drawer.Navigator drawerContent={DrawerContentComp}>
                  <Drawer.Screen name="Registrar" component={RegistrarScreen} />
                  <Drawer.Screen name="Webview" component={WebviewScreen} />
                </Drawer.Navigator>
              </ScannerContextProvider>
            </InAppNotificationContextProvider>
          </ChainApiContextProvider>
        </NetworkSelectionContextProvider>
      </ApplicationProvider>
    </>
  );
};
