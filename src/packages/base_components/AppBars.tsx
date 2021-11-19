import {Appbar as AppBar, useTheme} from 'react-native-paper';
import React from 'react';
import {useIOSStatusBarStyle} from 'src/hook/useIOSStatusBarStyle';

export function MainDrawerAppBar({onActionMenuPress, title}: {onActionMenuPress: () => void; title: string}) {
  return (
    <AppHeader>
      <AppBar.Action onPress={onActionMenuPress} icon={'menu'} />
      <AppBar.Content title={title} />
    </AppHeader>
  );
}

export function MainStackAppBar({
  headerLeft,
  headerRight,
  title,
}: {
  title: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}) {
  return (
    <AppHeader>
      {headerLeft}
      <AppBar.Content title={title} />
      {headerRight}
    </AppHeader>
  );
}

export function AppHeader({children}: {children: React.ReactNode}) {
  useIOSStatusBarStyle();
  const theme = useTheme();

  return <AppBar.Header style={{backgroundColor: theme.colors.background}}>{children}</AppBar.Header>;
}

export function DashboardAppBar({
  onActionLeftPress,
  onContentPress,
  subtitle,
}: {
  onActionLeftPress: () => void;
  onContentPress: () => void;
  subtitle?: React.ReactNode;
}) {
  return (
    <AppHeader>
      <AppBar.Action onPress={onActionLeftPress} icon={'menu'} />
      <AppBar.Content title="Litentry" onPress={onContentPress} subtitle={subtitle} />
    </AppHeader>
  );
}
