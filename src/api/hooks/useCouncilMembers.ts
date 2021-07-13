import {useQuery} from 'react-query';
import {useApi} from 'context/ChainApiContext';
import {useAccounts} from 'context/AccountsContext';
import {getAccountsDetail} from 'src/api/hooks/useAccountsDetail';

export function useCouncilMembers() {
  const {api} = useApi();
  const {accounts} = useAccounts();

  return useQuery(
    ['council-members', accounts],
    async () => {
      if (!api) {
        throw new Error('Api not defined');
      }
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
