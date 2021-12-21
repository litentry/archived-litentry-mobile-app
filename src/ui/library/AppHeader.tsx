import React from 'react';
import {Appbar as AppBar} from 'react-native-paper';

export function AppHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.ComponentProps<typeof AppBar.Header>['style'];
}) {
  return <AppBar.Header style={style}>{children}</AppBar.Header>;
}
