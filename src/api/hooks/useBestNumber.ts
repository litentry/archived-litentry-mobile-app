import {BlockNumber} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useBestNumber(): BlockNumber | undefined {
  const {data} = useApiQuery(['api_derive_chain_bestNumber'], (api) => api.derive.chain.bestNumber(), {
    staleTime: 1000 * 60,
  });
  return data;
}
