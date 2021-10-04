import type BN from 'bn.js';
import {extractParaEndpoints} from './useParaEndpoints';
import {useRelayEndpoints} from './useRelayEndpoints';

export function useIsParasLinked(ids?: (BN | number)[] | null): Record<string, boolean> | undefined {
  const {data: endpoints} = useRelayEndpoints();
  if (endpoints != null && Array.isArray(endpoints)) {
    return ids
      ? ids.reduce(
          (all: Record<string, boolean>, id) => ({
            ...all,
            [id.toString()]: extractParaEndpoints(endpoints, id).length !== 0,
          }),
          {},
        )
      : {};
  }
}
