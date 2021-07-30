import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {getAccountIdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

export function useAccountIdentityInfo(accountId?: string) {
  return useApiQuery(
    ['account_identity', accountId],
    (api: ApiPromise) => {
      if (!accountId) {
        throw new Error('accountId is required');
      }
      return getAccountIdentityInfo(api, accountId);
    },
    {staleTime: 1000 * 60, enabled: Boolean(accountId)},
  );
}
