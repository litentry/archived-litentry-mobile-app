/** @deprecated use src/api/hooks/useAccount instead */

import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {getAccountIdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

export function useAccountIdentityInfo(accountId?: string) {
  return useApiQuery(
    ['account_identity', accountId],
    (api: ApiPromise) => {
      if (accountId) {
        return getAccountIdentityInfo(api, accountId);
      }
    },
    {staleTime: 1000 * 60, enabled: Boolean(accountId)},
  );
}
