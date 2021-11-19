import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

export function Layout({children, style}: {style: ViewStyle; children: React.ReactNode}) {
  const theme = useTheme();
  return <View style={[{backgroundColor: theme.colors.background}, style]}>{children}</View>;
}
