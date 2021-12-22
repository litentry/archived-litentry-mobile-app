import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ParamListBase, Route, RouteProp} from '@react-navigation/core';
import {DrawerNavigationOptions, DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {useApi} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import NetworkItem from '@ui/components/NetworkItem';
import {dashboardScreen, networkSelectionScreen} from '@ui/navigation/routeKeys';
import {AppBar, AppHeader, Title, useTheme} from '@ui/library';
import {standardPadding} from '@ui/styles';
import {noop} from 'lodash';

export function MainDrawerAppBar({
  navigation,
  options,
  route,
}: {
  route: Route<string>;
  options: DrawerNavigationOptions;
  navigation: DrawerNavigationProp<ParamListBase>;
}) {
  const {colors} = useTheme();

  return (
    <AppHeader style={{backgroundColor: colors.background}}>
      <AppBar.Action onPress={navigation.openDrawer} icon={'menu'} />
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
  const {colors} = useTheme();

  const openDrawer = () => {
    if (navigationSupportsDrawer(navigation)) {
      navigation.openDrawer();
    }
  };

  return (
    <AppHeader style={{backgroundColor: colors.background}}>
      {options.headerLeft ? (
        options.headerLeft({onPress: openDrawer})
      ) : back ? (
        <AppBar.BackAction onPress={navigation.goBack} />
      ) : (
        <AppBar.Action onPress={openDrawer} icon={'menu'} />
      )}
      <AppBar.Content title={options.title ?? route.name} />
      {options.headerRight ? options.headerRight({}) : null}
    </AppHeader>
  );
}

function navigationSupportsDrawer(navigation: unknown): navigation is DrawerNavigationProp<ParamListBase> {
  if (navigation && typeof navigation === 'object') {
    return 'openDrawer' in navigation;
  }

  throw new Error('Navigation is not of expected type');
}

export function MainAppBar({
  navigation,
  route,
}: {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}) {
  const showMenu = route.name === dashboardScreen;

  const {currentNetwork} = useContext(NetworkContext);
  const {status} = useApi();
  const {colors} = useTheme();

  const onActionLeftPress = React.useCallback(() => {
    if (navigationSupportsDrawer(navigation)) {
      navigation.openDrawer();
    }
  }, [navigation]);

  return (
    <AppHeader style={{backgroundColor: colors.primary}}>
      <AppBar.Action
        onPress={showMenu ? onActionLeftPress : noop}
        icon={'menu'}
        color={showMenu ? 'white' : 'transparent'}
      />
      <AppBar.Content
        style={styles.contentContainer}
        title={
          <View style={styles.titleContainer}>
            <Title style={styles.title}>Litentry</Title>
          </View>
        }
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(networkSelectionScreen)}
        style={[styles.networkSwitch, {backgroundColor: colors.background}]}>
        {currentNetwork ? (
          <NetworkItem item={currentNetwork} isConnected={status === 'connected' || status === 'ready'} />
        ) : undefined}
      </TouchableOpacity>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginRight: '12%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {color: 'white'},
  logoImage: {width: 30, height: 30},
  networkSwitch: {
    position: 'absolute',
    right: standardPadding * 1.5,
    bottom: 0,
    paddingHorizontal: standardPadding,
    paddingVertical: standardPadding / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
});
