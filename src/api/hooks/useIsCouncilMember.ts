import {useAccounts} from 'context/AccountsContext';
import {useCouncil} from './useCouncil';

export function useIsCouncilMember() {
  const {networkAccounts} = useAccounts();
  const {data: council} = useCouncil();
  if (!council) return false;
  return council.members.some((member) => networkAccounts.find((account) => account.address === member.address));
}