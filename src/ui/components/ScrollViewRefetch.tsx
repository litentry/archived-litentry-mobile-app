import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {RefreshControl} from 'react-native';
import {RefetchQueries, useRefetch} from 'src/api/hooks/useRefetch';
import {useTheme} from '@ui/library';
import {useNetInfo} from 'src/hooks/useNetInfo';

type ScrollViewProps = React.ComponentProps<typeof ScrollView>;

type Props = Omit<ScrollViewProps, 'refreshControl'> & {
  refetchQueries?: RefetchQueries;
};

export function ScrollViewRefetch({children, refetchQueries, ...props}: Props) {
  const {colors} = useTheme();
  const {isConnected} = useNetInfo();
  const {refreshing, refetch} = useRefetch(refetchQueries);

  useEffect(() => {
    refetch();
  }, [isConnected, refetch]);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetch} tintColor={colors.primary} colors={[colors.primary]} />
  );

  return (
    <ScrollView {...props} refreshControl={refreshControl}>
      {children}
    </ScrollView>
  );
}
