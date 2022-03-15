import {useAccounts} from 'context/AccountsContext';
import {useCouncil} from './useCouncil';

export function useIsCouncilMember() {
  const {accounts} = useAccounts();
  const {data: council} = useCouncil();

  if (!council) return false;
  return council.members.some((member) => accounts[member.address]);
}
