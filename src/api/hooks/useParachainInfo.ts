import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import type {Option} from '@polkadot/types';
import type {ParaId, ParaLifecycle, CandidatePendingAvailability} from '@polkadot/types/interfaces';

export function useParachainInfo(id: ParaId) {
  return useApiQuery(['parachainInfo', id], async (api: ApiPromise) => {
    const [optLifecycle, optPending] = await Promise.all([
      api.query.paras?.paraLifecycles?.<Option<ParaLifecycle>>(id),
      (api.query.parasInclusion || api.query.paraInclusion || api.query.inclusion)?.pendingAvailability?.<
        Option<CandidatePendingAvailability>
      >(id),
    ]);

    return {
      lifecycle: optLifecycle?.unwrap(),
      pendingAvail: optPending?.unwrap(),
    };
  });
}
