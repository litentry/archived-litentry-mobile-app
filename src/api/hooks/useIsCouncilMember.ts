import {useAccounts} from 'context/AccountsContext';
import {useCouncil} from './useCouncil';

export function useIsCouncilMember() {
  const {networkAccounts} = useAccounts();
  const {data: council} = useCouncil();

  if (networkAccounts.length === 0) {
    return false;
  }

  if (council) {
    return council.members.some((member) =>
      networkAccounts.some((account) => account.address === member.account.address),
    );
  }

  return false;
}
