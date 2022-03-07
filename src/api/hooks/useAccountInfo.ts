/** @deprecated use src/api/hooks/useAccount instead */

import useApiQuery from 'src/api/hooks/useApiQuery';

export function useAccountInfo(accountId: string) {
  return useApiQuery(['account_info', accountId], async (api) => {
    return await api.query.system.account(accountId);
  });
}
