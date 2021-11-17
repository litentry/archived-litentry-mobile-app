import {ParamListBase, Route} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {useApi} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import NetworkItem from 'presentational/NetworkItem';
import React, {useContext} from 'react';
import {networkSelectionScreen} from 'src/navigation/routeKeys';
import {AppBar} from 'src/packages/base_components';

export function DashboardStackAppBar({
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
  return (
    <AppBar.Header>
      {back ? <AppBar.BackAction onPress={navigation.goBack} /> : null}
      <AppBar.Content title={options.title ?? route.name} />
    </AppBar.Header>
  );
}

function navigationSupportsDrawer(navigation: unknown): navigation is DrawerNavigationProp<ParamListBase> {
  if (navigation && typeof navigation === 'object') {
    return 'openDrawer' in navigation;
  }

  throw new Error('Navigation is not of expected type');
}

export function DashboardAppBar({navigation}: {navigation: StackNavigationProp<ParamListBase>}) {
  const {currentNetwork} = useContext(NetworkContext);
  const {status} = useApi();

  return (
    <AppBar.Header>
      <AppBar.Action
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
          ) : null
        }
      />
    </AppBar.Header>
  );
}
