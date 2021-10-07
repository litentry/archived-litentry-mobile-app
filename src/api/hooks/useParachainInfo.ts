import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import type {Option} from '@polkadot/types';
import type {ParaId, ParaLifecycle, CandidatePendingAvailability} from '@polkadot/types/interfaces';
import type {Codec} from '@polkadot/types/types';

export function sliceHex(value: Codec, max = 6): string {
  const hex = value.toHex();
  return hex.length > 2 * max + 2 ? `${hex.slice(0, max + 2)}…${hex.slice(-max)}` : hex === '0x' ? '' : hex;
}

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
