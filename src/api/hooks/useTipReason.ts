import type {Hash} from '@polkadot/types/interfaces';
import {hexToString} from '@polkadot/util';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useTipReason(reasonHash: Hash) {
  return useApiQuery(['tips_reason', reasonHash], async (api) => {
    const reasonText = await api.query.tips.reasons(reasonHash);

    return reasonText.isSome ? hexToString(reasonText.unwrap().toHex()) : reasonHash.toHex();
  });
}
