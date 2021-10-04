import type {Option} from '@polkadot/types';
import type {ITuple} from '@polkadot/types/types';
import type {ApiPromise} from '@polkadot/api';
import type {AccountId, BalanceOf, ParaId} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useUpcomingParaIds} from 'src/api/hooks/useUpcomingParaIds';
import {useIsParasLinked} from './useIsParaLinked';

export type LeaseInfo = {
  accountId: AccountId;
  balance: BalanceOf;
  period: number;
} | null;

type ParaMap = {
  id: ParaId;
  leases: LeaseInfo[];
};
type LeaseOptions = Option<ITuple<[AccountId, BalanceOf]>>[];

function extractParaMap(hasLinksMap: Record<string, boolean>, paraIds: ParaId[], leases: LeaseOptions[]): ParaMap[] {
  return paraIds
    .reduce((all: ParaMap[], id, index) => {
      const lease = leases[index];

      if (lease != null) {
        all.push({
          id,
          leases: lease.map((optLease, period): LeaseInfo | null => {
            if (optLease.isNone) {
              return null;
            }
            const [accountId, balance] = optLease.unwrap();
            return {
              accountId,
              balance,
              period,
            };
          }),
        });
      }

      return all;
    }, [])
    .sort(({id: aId, leases: aLeases}, {id: bId, leases: bLeases}): number => {
      const aKnown = hasLinksMap[aId.toString()] || false;
      const bKnown = hasLinksMap[bId.toString()] || false;

      const aLease = aLeases[0];
      const bLease = bLeases[0];

      return aLeases.length && bLeases.length && aLease && bLease
        ? aLease.period - bLease.period || aId.cmp(bId)
        : aLeases.length
        ? -1
        : bLeases.length
        ? 1
        : aKnown === bKnown
        ? aId.cmp(bId)
        : aKnown
        ? -1
        : 1;
    });
}

export function useParathreads() {
  const {data: ids} = useUpcomingParaIds();
  const hasLinksMap = useIsParasLinked(ids);
  return useApiQuery(
    ['parathreads', ids],
    async (api: ApiPromise) => {
      if (ids && ids.length > 0 && hasLinksMap != null) {
        const leases = (await api.query.slots?.leases?.multi(ids)) as unknown as LeaseOptions[];
        return extractParaMap(hasLinksMap, ids, leases);
      }
    },
    {enabled: ids && ids.length > 0},
  );
}
