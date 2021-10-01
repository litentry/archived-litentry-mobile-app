import {ApiPromise} from '@polkadot/api';
import type {ParaId} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useParachainIds() {
  return useApiQuery('parachain_ids', async (api: ApiPromise) => api.query.paras?.parachains?.<ParaId[]>());
}
