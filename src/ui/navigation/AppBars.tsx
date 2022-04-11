import React from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {ParamListBase, Route, RouteProp} from '@react-navigation/core';
import {DrawerNavigationOptions, DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import {useApi} from 'context/ChainApiContext';
import {useNetwork} from 'context/NetworkContext';
import NetworkItem from '@ui/components/NetworkItem';
import {dashboardScreen, networkSelectionScreen, tokenMigrationScreen} from '@ui/navigation/routeKeys';
import {AppBar, AppHeader, Title, useTheme} from '@ui/library';
import {standardPadding} from '@ui/styles';

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
  const openDrawer = () => {
    Keyboard.dismiss();
    navigation.openDrawer();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <AppHeader style={{backgroundColor: colors.background}}>
          <AppBar.Action onPress={openDrawer} icon={'menu'} />
          <AppBar.Content title={options.title ?? route.name} />
        </AppHeader>
      </View>
    </TouchableWithoutFeedback>
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
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const goBack = () => {
    const navIndex = navigation.getState().index;
    if (navIndex > 0) {
      navigation.goBack();
    }
  };

  return (
    <AppHeader style={{backgroundColor: colors.background}}>
      {options.headerLeft ? (
        options.headerLeft({onPress: openDrawer})
      ) : back ? (
        <AppBar.BackAction onPress={goBack} />
      ) : (
        <AppBar.Action onPress={openDrawer} icon={'menu'} />
      )}
      <AppBar.Content title={options.title ?? route.name} />
      {options.headerRight ? options.headerRight({}) : null}
    </AppHeader>
  );
}

export function MainAppBar({
  navigation,
  route,
}: {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}) {
  const showMenu = route.name === dashboardScreen || tokenMigrationScreen;

  const {currentNetwork} = useNetwork();
  const {status} = useApi();
  const {colors} = useTheme();

  const onActionLeftPress = React.useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <AppHeader style={{backgroundColor: colors.primary}}>
      {showMenu ? <AppBar.Action onPress={onActionLeftPress} icon={'menu'} color="white" /> : null}
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
