import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import type {Option} from '@polkadot/types';
import type {ParaId, ParaInfo, ParaLifecycle, HeadData, ParaGenesisArgs} from '@polkadot/types/interfaces';
import type {Codec} from '@polkadot/types/types';

export function sliceHex(value: Codec, max = 6): string {
  const hex = value.toHex();
  return hex.length > 2 * max + 2 ? `${hex.slice(0, max + 2)}…${hex.slice(-max)}` : hex === '0x' ? '' : hex;
}

export function useParathreadInfo(id: ParaId) {
  return useApiQuery(['parathreadInfo', id], async (api: ApiPromise) => {
    const [paraInfo, lifecycleInfo, headInfo, genesisInfo] = await Promise.all([
      api.query.registrar?.paras?.<Option<ParaInfo>>(id),
      api.query.paras?.paraLifecycles?.<Option<ParaLifecycle>>(id),
      api.query.paras?.heads?.<Option<HeadData>>(id),
      api.query.paras?.upcomingParasGenesis?.<Option<ParaGenesisArgs>>(id),
    ]);

    return {
      headHex: headInfo?.isSome
        ? sliceHex(headInfo.unwrap())
        : genesisInfo?.isSome
        ? sliceHex(genesisInfo.unwrap().genesisHead)
        : null,
      lifecycle: lifecycleInfo?.unwrapOr(null),
      manager: paraInfo?.isSome ? paraInfo.unwrap().manager : null,
    };
  });
}
