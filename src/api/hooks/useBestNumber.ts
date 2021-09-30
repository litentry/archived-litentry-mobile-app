import {useEffect} from 'react';
import {useQueryClient} from 'react-query';
import {VoidFn} from '@polkadot/api/types';
import {BlockNumber} from '@polkadot/types/interfaces';
import {useApi} from 'context/ChainApiContext';
import useApiQuery from 'src/api/hooks/useApiQuery';

const BEST_NUMBER_QUERY_KEY = 'api_derive_chain_bestNumber';

export function useBestNumber(): BlockNumber | undefined {
  const {api} = useApi();
  const queryClient = useQueryClient();
  const {data} = useApiQuery(BEST_NUMBER_QUERY_KEY, (apiPromise) => apiPromise.derive.chain.bestNumber());

  useEffect(() => {
    let unsub: VoidFn | undefined;

    (async () => {
      unsub = await api?.derive.chain.bestNumber((blockNumber) => {
        const currentBestNumber = queryClient.getQueryData<BlockNumber>(BEST_NUMBER_QUERY_KEY);
        if (!currentBestNumber?.eq(blockNumber)) {
          queryClient.setQueryData(BEST_NUMBER_QUERY_KEY, blockNumber);
        }
      });
    })();

    return () => {
      unsub && unsub();
    };
  }, [queryClient, api]);

  return data;
}
