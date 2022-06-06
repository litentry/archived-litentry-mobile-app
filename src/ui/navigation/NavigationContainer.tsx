import React from 'react';
import {NavigationContainer as RNnavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {useFlipper} from '@react-navigation/devtools';
import SplashScreen from 'react-native-splash-screen';
import {useToggleTheme} from 'src/context/ThemeContext';
import {darkTheme, lightTheme} from '@ui/navigation/theme';
import {linking} from '@ui/navigation/routeKeys';

type PropTypes = {
  children: React.ReactNode;
};

export function NavigationContainer({children}: PropTypes) {
  const {theme} = useToggleTheme();
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <RNnavigationContainer
      ref={navigationRef}
      onReady={() => SplashScreen.hide()}
      linking={linking}
      theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </RNnavigationContainer>
  );
}
