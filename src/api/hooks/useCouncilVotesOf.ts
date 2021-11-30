import {ApiPromise} from '@polkadot/api';
import type {AccountId} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useCouncilVotesOf(accountId?: string | Uint8Array | AccountId) {
  return useApiQuery(
    ['council-votes', {accountId}],
    async (api: ApiPromise) => {
      if (accountId != null) {
        return await api.derive.council.votesOf(accountId);
      }
    },
    {enabled: Boolean(accountId)},
  );
}
