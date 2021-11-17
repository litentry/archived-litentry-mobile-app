import {ParamListBase, Route} from '@react-navigation/core';
import {DrawerNavigationOptions, DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {useApi} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import NetworkItem from 'presentational/NetworkItem';
import React, {useContext} from 'react';
import {networkSelectionScreen} from 'src/navigation/routeKeys';
import * as Base from 'src/packages/base_components';

export function MainDrawerAppBar({
  navigation,
  options,
  route,
}: {
  route: Route<string>;
  options: DrawerNavigationOptions;
  navigation: DrawerNavigationProp<ParamListBase>;
}) {
  return <Base.MainDrawerAppBar onActionMenuPress={navigation.openDrawer} title={options.title ?? route.name} />;
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
    <Base.MainStackAppBar
      headerLeft={
        options.headerLeft ? (
          options.headerLeft({onPress: openDrawer})
        ) : back ? (
          <Base.AppBar.BackAction
            tvParallaxProperties={undefined}
            hasTVPreferredFocus={false}
            onPress={navigation.goBack}
          />
        ) : (
          <Base.AppBar.Action
            tvParallaxProperties={undefined}
            hasTVPreferredFocus={false}
            onPress={openDrawer}
            icon={'menu'}
          />
        )
      }
      headerRight={options.headerRight ? options.headerRight({}) : null}
      title={options.title ?? route.name}
    />
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
    <Base.DashboardAppBar
      onActionLeftPress={() => {
        if (navigationSupportsDrawer(navigation)) {
          navigation.openDrawer();
        }
      }}
      onContentPress={() => {
        return navigation.navigate(networkSelectionScreen);
      }}
      subtitle={
        currentNetwork ? (
          <NetworkItem item={currentNetwork} isConnected={status === 'connected' || status === 'ready'} />
        ) : undefined
      }
    />
  );
}
