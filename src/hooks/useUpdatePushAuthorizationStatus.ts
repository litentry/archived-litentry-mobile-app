import {useEffect} from 'react';
import {useQueryClient} from 'react-query';
import {useAppState} from './useAppState';

export function useUpdatePushAuthorizationStatus(): void {
  const queryClient = useQueryClient();
  const {didAppCameToForeground} = useAppState();

  useEffect(() => {
    (async () => {
      if (didAppCameToForeground) {
        queryClient.invalidateQueries('push_authorization_status');
      }
    })();
  }, [didAppCameToForeground, queryClient]);
}
