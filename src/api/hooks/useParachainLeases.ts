import {ApiPromise} from '@polkadot/api';
import type {Option} from '@polkadot/types';
import type {AccountId, BalanceOf, ParaId} from '@polkadot/types/interfaces';
import type {ITuple} from '@polkadot/types/types';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useParachainLeases(id: ParaId) {
  return useApiQuery(['parachain_leases', id], async (api: ApiPromise) => {
    const leases = (await api.query.slots?.leases?.(id)) as Option<ITuple<[AccountId, BalanceOf]>>[] | undefined;

    if (leases) {
      return leases.map((opt, index) => (opt.isSome ? index : -1)).filter((period) => period !== -1);
    }
  });
}
