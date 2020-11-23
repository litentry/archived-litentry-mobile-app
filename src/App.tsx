import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RegistrarScreen from 'screen/Registrar';
import WebviewScreen from 'screen/Webview';
import DrawerScreen from 'screen/Drawer';

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
        <Drawer.Navigator drawerContent={DrawerContentComp}>
          <Drawer.Screen name="Registrar" component={RegistrarScreen} />
          <Drawer.Screen name="Webview" component={WebviewScreen} />
        </Drawer.Navigator>
      </ApplicationProvider>
    </>
  );
};
