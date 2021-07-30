import {Bytes, Option} from '@polkadot/types';
import {Hash} from '@polkadot/types/interfaces';
import {hexToString} from '@polkadot/util';
import useApiQuery from 'src/api/hooks/useApiQuery';

const transformTip = {
  transform: (optBytes: Option<Bytes>) => (optBytes.isSome ? hexToString(optBytes.unwrap().toHex()) : null),
};

export function useTipReason(reasonHash: Hash) {
  return useApiQuery(['tips_reason', reasonHash], async (api) => {
    const reasonText = await api.query.tips.reasons(reasonHash);
    const transformed = transformTip.transform(reasonText);

    return transformed || reasonHash.toHex();
  });
}
