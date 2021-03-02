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
import MyIdentityScreen from 'screen/MyIdentityScreen';
import DrawerScreen from 'screen/DrawerScreen';
import ChainApiContextProvider from 'context/ChainApiContext';
import AccountContextProvider from 'context/AccountContextProvider';
import {DrawerParamList} from './types';
import BalanceContextProvider from 'context/BalanceContext';
import TxContextProvider from 'context/TxContext';
import RegistrarListScreen from 'screen/RegistrarListScreen';
import MotionDetailScreen from 'screen/MotionDetailScreen';
import {Host} from 'react-native-portalize';

import {IonicIconsPack} from './Ionic-icons';

// init type registry
import 'src/typeRegistry';
import TestScreen from 'screen/TestScreen';

const Drawer = createDrawerNavigator();

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const DrawerContentComp = (props: PropTypes) => {
  return <DrawerScreen {...props} />;
};

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
            <Drawer.Navigator drawerContent={DrawerContentComp}>
              <Drawer.Screen name="Dashboard" component={DashboardScreen} />
              <Drawer.Screen
                name="RegistrarList"
                component={RegistrarListScreen}
              />
              <Drawer.Screen
                name="MotionDetail"
                component={MotionDetailScreen}
              />
              <Drawer.Screen name="Webview" component={WebviewScreen} />
              <Drawer.Screen name="DevScreen" component={DevScreen} />
              <Drawer.Screen name="MyIdentity" component={MyIdentityScreen} />
              <Drawer.Screen name="TestScreen" component={TestScreen} />
            </Drawer.Navigator>
          </WithContexts>
        </Host>
      </ApplicationProvider>
    </>
  );
};
