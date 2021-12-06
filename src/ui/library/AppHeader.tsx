import React from 'react';
import {Appbar as AppBar} from 'react-native-paper';
import {useTheme} from '@ui/library';

export function AppHeader({children}: {children: React.ReactNode}) {
  const theme = useTheme();

  return <AppBar.Header style={{backgroundColor: theme.colors.background}}>{children}</AppBar.Header>;
}
