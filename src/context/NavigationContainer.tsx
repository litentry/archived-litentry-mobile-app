import React from 'react';
import {NavigationContainer as RNnavigationContainer} from '@react-navigation/native';
import {useTheme} from 'src/context/ThemeContext';
import {darkTheme, lightTheme} from 'src/navigation/theme';
import {linking} from 'src/navigation/routeKeys';

type PropTypes = {
  children: React.ReactNode;
};

export function NavigationContainer({children}: PropTypes) {
  const {theme} = useTheme();

  return (
    <RNnavigationContainer linking={linking} theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </RNnavigationContainer>
  );
}
