/* eslint-disable no-restricted-imports */
import React from 'react';
import {ScrollView as RNScrollView, RefreshControl} from 'react-native';
import {RefetchQueries, useRefetch} from 'src/api/hooks/useRefetch';
import {useTheme} from '@ui/library';

type RNScrollViewProps = React.ComponentProps<typeof RNScrollView>;

type Props = Omit<RNScrollViewProps, 'refreshControl'> & {
  refetchQueries?: RefetchQueries;
};

export function ScrollView({children, refetchQueries, ...props}: Props) {
  const {colors} = useTheme();
  const {refreshing, refetch} = useRefetch(refetchQueries);

  const refreshControl = refetchQueries ? (
    <RefreshControl refreshing={refreshing} onRefresh={refetch} tintColor={colors.primary} colors={[colors.primary]} />
  ) : undefined;

  return (
    <RNScrollView {...props} refreshControl={refreshControl}>
      {children}
    </RNScrollView>
  );
}
