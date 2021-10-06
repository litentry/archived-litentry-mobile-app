import {useEffect} from 'react';
import {useApi} from 'context/ChainApiContext';
import {useQueryClient} from 'react-query';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {VoidFn} from '@polkadot/api/types';
import {SignedBlockExtended} from '@polkadot/api-derive/types';

const LAST_BLOCK_QUERY_KEY = 'api_derive_chain_lastBlock';

export function useLastBlock() {
  const {api} = useApi();
  const queryClient = useQueryClient();
  const {data} = useApiQuery(
    LAST_BLOCK_QUERY_KEY,
    async (apiPromise) => await apiPromise.derive.chain.subscribeNewBlocks(),
  );

  useEffect(() => {
    let unsub: VoidFn | undefined;

    (async () => {
      unsub = await api?.derive.chain.subscribeNewBlocks((block) => {
        const lastBlock = queryClient.getQueryData<SignedBlockExtended>(LAST_BLOCK_QUERY_KEY);
        if (!lastBlock?.eq(block)) {
          queryClient.setQueryData(LAST_BLOCK_QUERY_KEY, block);
        }
      });
    })();

    return () => {
      unsub && unsub();
    };
  }, [queryClient, api]);

  return data;
}
