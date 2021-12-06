import React from 'react';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@ui/library';

function Header({children}: {children: React.ReactNode}) {
  const theme = useTheme();

  return <AppBar.Header style={{backgroundColor: theme.colors.background}}>{children}</AppBar.Header>;
}

export const AppBar = Object.assign(Appbar, {Header});
