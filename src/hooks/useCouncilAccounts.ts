import {useCouncil} from 'src/api/hooks/useCouncil';
import {useAppAccounts} from './useAppAccounts';

export function useCouncilAccounts() {
  const accounts = useAppAccounts();
  const {data: council} = useCouncil();

  if (accounts.length === 0 || !council) {
    return {
      councilAccounts: [],
      isAnyAccountCouncil: false,
    };
  }

  const councilAccounts = accounts.filter((account) =>
    council.members.some((member) => member.account.address === account.address),
  );

  return {
    councilAccounts,
    isAnyAccountCouncil: Boolean(councilAccounts.length),
  };
}
