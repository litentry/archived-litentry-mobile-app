import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '@ui/library';

type Props = {
  style?: ViewStyle;
  children: React.ReactNode;
  testID?: string;
};

export function Layout({children, style, testID}: Props) {
  const theme = useTheme();
  return (
    <View testID={testID} style={[{backgroundColor: theme.colors.background}, style]}>
      {children}
    </View>
  );
}
