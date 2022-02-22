import React from 'react';
import {ScrollView} from 'react-native';
import {RefetchQueries, useRefetch} from 'src/api/hooks/useRefetch';
import {RefreshControl} from '@ui/library/RefreshControl';

type ScrollViewProps = React.ComponentProps<typeof ScrollView>;

type Props = Omit<ScrollViewProps, 'refreshControl'> & {
  refetchQueries?: RefetchQueries;
};

export function ScrollViewRefetch({children, refetchQueries, ...props}: Props) {
  const {refreshing, refetch} = useRefetch(refetchQueries);

  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={refetch} />;

  return (
    <ScrollView {...props} refreshControl={refreshControl}>
      {children}
    </ScrollView>
  );
}
