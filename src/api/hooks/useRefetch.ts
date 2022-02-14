import {useCallback, useState} from 'react';
import {useLitentryApiClient} from 'context/LitentryApiContext';
import type {DocumentNode} from '@apollo/client';

export type RefetchQueries = Array<DocumentNode> | 'active' | 'all';

export function useRefetch(queries?: RefetchQueries) {
  const {client} = useLitentryApiClient();
  const [refreshing, setRefreshing] = useState(false);

  const refetch = useCallback(async () => {
    setRefreshing(true);
    client
      .refetchQueries({include: queries ?? 'active'})
      .catch((error) => {
        if (__DEV__) {
          console.error(error);
        }
      })
      .finally(() => setRefreshing(false));
  }, [client, queries]);

  return {refreshing, refetch};
}
