import React from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {DrawerActions} from '@react-navigation/native';
import {dashboardScreen, tokenMigrationScreen} from '@ui/navigation/routeKeys';
import {AppBar, AppHeader, Title, useTheme} from '@ui/library';
import {NetworkConnectionError} from '@ui/components/NetworkConnectionError';

export function MainDrawerAppBar({navigation, options, route}: DrawerHeaderProps) {
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
        <NetworkConnectionError />
      </View>
    </TouchableWithoutFeedback>
  );
}

export function MainStackAppBar({navigation, back, options, route}: NativeStackHeaderProps) {
  const {colors} = useTheme();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <AppHeader style={{backgroundColor: colors.background}}>
        {back ? <AppBar.BackAction onPress={goBack} /> : <AppBar.Action onPress={openDrawer} icon={'menu'} />}
        <AppBar.Content title={options.title ?? route.name} />
        {options.headerRight ? options.headerRight({canGoBack: navigation.canGoBack()}) : null}
      </AppHeader>
      <NetworkConnectionError />
    </>
  );
}

export function MainAppBar({navigation, route, options}: NativeStackHeaderProps) {
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
      {options.headerRight ? options.headerRight({canGoBack: navigation.canGoBack()}) : null}
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
