import {useEffect} from 'react';
import {useRefetch} from 'src/api/hooks/useRefetch';
import {useNetInfo} from './useNetInfo';

export function useApiRefetch() {
  const {isConnected} = useNetInfo();
  const {refetch} = useRefetch();

  useEffect(() => {
    if (isConnected) {
      refetch();
    }
  }, [isConnected, refetch]);
}
