import {VoidFn} from '@polkadot/api/types';
import {BlockNumber} from '@polkadot/types/interfaces';
import {useApi} from 'context/ChainApiContext';
import {useEffect} from 'react';
import {useQueryClient} from 'react-query';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useBestNumber(): BlockNumber | undefined {
  const {api} = useApi();
  const queryClient = useQueryClient();
  const {data} = useApiQuery('api_derive_chain_bestNumber', (apiPromise) => apiPromise.derive.chain.bestNumber());

  useEffect(() => {
    let unsub: VoidFn | undefined;

    (async () => {
      unsub = await api?.derive.chain.bestNumber((blockNumber) => {
        queryClient.setQueryData('api_derive_chain_bestNumber', blockNumber);
      });
    })();

    return () => {
      unsub && unsub();
    };
  }, [queryClient, api]);

  return data;
}
