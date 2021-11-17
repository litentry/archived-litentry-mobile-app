import {ParamListBase, Route} from '@react-navigation/core';
import {DrawerNavigationOptions, DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {useApi} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import {noop} from 'lodash';
import NetworkItem from 'presentational/NetworkItem';
import React, {useContext} from 'react';
import {useTheme} from 'react-native-paper';
import {networkSelectionScreen} from 'src/navigation/routeKeys';
import {AppBar} from 'src/packages/base_components';

export function MainDrawerAppBar({
  navigation,
  options,
  route,
}: {
  route: Route<string>;
  options: DrawerNavigationOptions;
  navigation: DrawerNavigationProp<ParamListBase>;
}) {
  return (
    <AppHeader>
      <AppBarActionMenu onPress={navigation.openDrawer} />
      <AppBar.Content title={options.title ?? route.name} />
    </AppHeader>
  );
}

export function MainStackAppBar({
  navigation,
  back,
  options,
  route,
}: {
  back?: {title: string};
  route: Route<string>;
  options: StackNavigationOptions;
  navigation: StackNavigationProp<ParamListBase>;
}) {
  const openDrawer = () => {
    if (navigationSupportsDrawer(navigation)) {
      navigation.openDrawer();
    }
  };

  return (
    <AppHeader>
      {options.headerLeft ? (
        options.headerLeft({onPress: openDrawer})
      ) : back ? (
        <AppBar.BackAction tvParallaxProperties={undefined} hasTVPreferredFocus={false} onPress={navigation.goBack} />
      ) : (
        <AppBarActionMenu onPress={openDrawer} />
      )}
      <AppBar.Content title={options.title ?? route.name} />
      {options.headerRight ? options.headerRight({}) : null}
    </AppHeader>
  );
}

export function AppBarActionMenu({onPress = noop}: {onPress?: () => void}) {
  return <AppBar.Action tvParallaxProperties={undefined} hasTVPreferredFocus={false} onPress={onPress} icon={'menu'} />;
}

function navigationSupportsDrawer(navigation: unknown): navigation is DrawerNavigationProp<ParamListBase> {
  if (navigation && typeof navigation === 'object') {
    return 'openDrawer' in navigation;
  }

  throw new Error('Navigation is not of expected type');
}

export function AppHeader({children}: {children: React.ReactNode}) {
  const theme = useTheme();

  return <AppBar.Header style={{backgroundColor: theme.colors.background}}>{children}</AppBar.Header>;
}

export function DashboardAppBar({navigation}: {navigation: StackNavigationProp<ParamListBase>}) {
  const {currentNetwork} = useContext(NetworkContext);
  const {status} = useApi();

  return (
    <AppHeader>
      <AppBar.Action
        tvParallaxProperties={undefined}
        hasTVPreferredFocus={false}
        icon="menu"
        onPress={() => {
          if (navigationSupportsDrawer(navigation)) {
            navigation.openDrawer();
          }
        }}
      />
      <AppBar.Content
        title="Litentry"
        onPress={() => {
          return navigation.navigate(networkSelectionScreen);
        }}
        subtitle={
          currentNetwork ? (
            <NetworkItem item={currentNetwork} isConnected={status === 'connected' || status === 'ready'} />
          ) : undefined
        }
      />
    </AppHeader>
  );
}
