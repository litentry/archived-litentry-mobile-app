import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useSubAccounts} from 'src/api/hooks/useSubAccounts';
import {getAccountIdentityInfo, IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

const ACCOUNTS_INDEX = 1;

export function useSubIdentities(address?: string) {
  const {data: subAccounts} = useSubAccounts(address);
  const subIds = subAccounts ? subAccounts[ACCOUNTS_INDEX].map((accountId) => accountId.toString()) : [];

  return useApiQuery(
    ['sub-identities', {address, subsCount: subAccounts?.length || 0}],
    async (api: ApiPromise): Promise<Array<IdentityInfo>> => {
      return await Promise.all(subIds.map((subId) => getAccountIdentityInfo(api, subId)));
    },
    {enabled: Boolean(address) && Boolean(subAccounts)},
  );
}
