import {ApiPromise} from '@polkadot/api';
import useApiQuery from './useApiQuery';
import {useAccounts} from 'context/AccountsContext';
import {getAccountsDetail} from 'src/api/hooks/useAccountsDetail';

export function useCouncilMembers() {
  const {accounts} = useAccounts();

  return useApiQuery(
    ['council-members', accounts],
    async (api: ApiPromise) => {
      const accountIds = await api.query.council.members();
      const members = await getAccountsDetail(api, accountIds);

      return {
        members,
        isMember: members.some((member) =>
          accounts.find((account) => account.address.toString() === member.accountId.toString()),
        ),
      };
    },
    {staleTime: 0},
  );
}
