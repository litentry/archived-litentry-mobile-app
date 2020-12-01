import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import RegistrarScreen from 'screen/Registrar';
import WebviewScreen from 'screen/Webview';
import DevScreen from 'screen/DevScreen';
import DrawerScreen from 'screen/Drawer';
import NetworkSelectionContextProvider from 'context/NetworkSelectionContext';
import ChainApiContextProvider from 'context/ChainApiContext';
import ScannerContextProvider from 'context/ScannerContext';
import AccountContextProvider from 'context/AccountContextProvider';
import {DrawerParamList} from './types';
import ModalContextProvider from 'context/ModalContextProvider';
import BalanceContextProvider from 'context/BalanceContext';

const Drawer = createDrawerNavigator();

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const DrawerContentComp = (props: PropTypes) => {
  return <DrawerScreen {...props} />;
};

export default () => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ModalContextProvider>
          <NetworkSelectionContextProvider>
            <ChainApiContextProvider>
              <ScannerContextProvider>
                <AccountContextProvider>
                  <BalanceContextProvider>
                    <Drawer.Navigator drawerContent={DrawerContentComp}>
                      <Drawer.Screen
                        name="Registrar"
                        component={RegistrarScreen}
                      />
                      <Drawer.Screen name="Webview" component={WebviewScreen} />
                      <Drawer.Screen name="DevScreen" component={DevScreen} />
                    </Drawer.Navigator>
                  </BalanceContextProvider>
                </AccountContextProvider>
              </ScannerContextProvider>
            </ChainApiContextProvider>
          </NetworkSelectionContextProvider>
        </ModalContextProvider>
      </ApplicationProvider>
    </>
  );
};
