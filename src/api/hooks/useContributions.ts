import useApiQuery from 'src/api/hooks/useApiQuery';
import type {ParaId} from '@polkadot/types/interfaces';

export function useContributions(paraId: ParaId) {
  return useApiQuery(['contributions', {paraId}], async (api) => {
    return api.derive.crowdloan.contributions(paraId);
  });
}
