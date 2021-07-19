import {useApi} from 'context/ChainApiContext';
import {useQuery} from 'react-query';
import {getAccountIdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

export function useAccountIdentity(id?: string) {
  const {api} = useApi();

  return useQuery(
    ['account_identity', id],
    async () => {
      if (!id) {
        return undefined;
      }

      const account = api ? await getAccountIdentityInfo(api, id) : undefined;
      return account;
    },
    {staleTime: 1000 * 60, enabled: !!id},
  );
}
