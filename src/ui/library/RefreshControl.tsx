import React from 'react';
import {RefreshControl as RNRefreshControl} from 'react-native';
import {useTheme} from '@ui/library';

type Props = {
  refreshing: boolean;
  onRefresh: () => void;
};

export function RefreshControl({refreshing, onRefresh}: Props) {
  const {colors} = useTheme();

  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={colors.primary}
      colors={[colors.primary]}
    />
  );
}
