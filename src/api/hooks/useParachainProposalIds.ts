import {ApiPromise} from '@polkadot/api';
import type {ParaId} from '@polkadot/types/interfaces';
import type {StorageKey} from '@polkadot/types';
import useApiQuery from 'src/api/hooks/useApiQuery';

function extractProposalIds(keys: StorageKey<[ParaId]>[]): ParaId[] {
  return keys.map(({args: [id]}) => id);
}

export function useParachainProposalIds() {
  return useApiQuery('parachain_proposals', async (api: ApiPromise) => {
    const proposals = (await api.query.proposeParachain?.proposals?.entries()) as StorageKey<[ParaId]>[] | undefined;

    if (proposals) {
      return extractProposalIds(proposals);
    }
  });
}
