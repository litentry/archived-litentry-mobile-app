import {Appbar as AppBar, useTheme} from 'react-native-paper';
import React from 'react';

export function MainDrawerAppBar({onActionMenuPress, title}: {onActionMenuPress: () => void; title: string}) {
  return (
    <AppHeader>
      <AppBarActionMenu onPress={onActionMenuPress} />
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

const noop = () => {
  return;
};

export function AppBarActionMenu({onPress = noop}: {onPress?: () => void}) {
  return <AppBar.Action tvParallaxProperties={undefined} hasTVPreferredFocus={false} onPress={onPress} icon={'menu'} />;
}

export function AppHeader({children}: {children: React.ReactNode}) {
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
      <AppBarActionMenu onPress={onActionLeftPress} />
      <AppBar.Content title="Litentry" onPress={onContentPress} subtitle={subtitle} />
    </AppHeader>
  );
}
