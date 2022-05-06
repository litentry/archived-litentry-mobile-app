import React from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {ParamListBase, Route, RouteProp} from '@react-navigation/core';
import {DrawerNavigationOptions, DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import {dashboardScreen, tokenMigrationScreen} from '@ui/navigation/routeKeys';
import {AppBar, AppHeader, Title, useTheme} from '@ui/library';

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
  options,
}: {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  options: StackNavigationOptions;
}) {
  const showMenu = route.name === dashboardScreen || tokenMigrationScreen;
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
      {options.headerRight ? options.headerRight({}) : null}
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
  title: {
    color: 'white',
  },
});
