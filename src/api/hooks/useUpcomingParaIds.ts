import {ApiPromise} from '@polkadot/api';
import type {Option, StorageKey} from '@polkadot/types';
import type {ParaId, ParaLifecycle} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';

type ParaIdEntries = [StorageKey<[ParaId]>, Option<ParaLifecycle>][];

function extractIds(entries: ParaIdEntries): ParaId[] {
  return entries
    .map(
      ([
        {
          args: [paraId],
        },
        optValue,
      ]): ParaId | null => {
        const value = optValue.unwrap();

        return value &&
          (value.isParathread || value.isUpgradingToParachain || value.isOutgoingParathread || value.isOnboarding)
          ? paraId
          : null;
      },
    )
    .filter((paraId): paraId is ParaId => !!paraId)
    .sort((a, b) => a.cmp(b));
}

export function useUpcomingParaIds() {
  return useApiQuery('parachains_upcoming_ids', async (api: ApiPromise) => {
    const paraLifecycles = (await api.query.paras?.paraLifecycles?.entries()) as ParaIdEntries | undefined;
    const result = paraLifecycles ? extractIds(paraLifecycles) : [];

    return result;
  });
}
