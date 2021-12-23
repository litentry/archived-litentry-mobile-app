import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useSubAccounts(address?: string) {
  return useApiQuery(['sub_accounts', {address}], (api: ApiPromise) => api.query.identity.subsOf(address || ''), {
    enabled: Boolean(address),
  });
}
