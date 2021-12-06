import React from 'react';
import {NavigationContainer as RNnavigationContainer} from '@react-navigation/native';
import {useTheme} from 'src/context/ThemeContext';
import {darkTheme, lightTheme} from '@ui/navigation/theme';
import {linking} from '@ui/navigation/routeKeys';
import SplashScreen from 'react-native-splash-screen';

type PropTypes = {
  children: React.ReactNode;
};

export function NavigationContainer({children}: PropTypes) {
  const {theme} = useTheme();

  return (
    <RNnavigationContainer
      onReady={() => SplashScreen.hide()}
      linking={linking}
      theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </RNnavigationContainer>
  );
}
