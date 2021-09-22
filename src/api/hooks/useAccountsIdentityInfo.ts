import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {getAccountIdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

export function useAccountsIdentityInfo(accountIds: string[]) {
  return useApiQuery(['accounts_identity', {accountIds}], (api: ApiPromise) => {
    return Promise.all(accountIds.map((id) => getAccountIdentityInfo(api, id)));
  });
}
