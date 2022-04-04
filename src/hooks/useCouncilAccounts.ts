import {useAccounts} from 'context/AccountsContext';
import {useCouncil} from 'src/api/hooks/useCouncil';

export function useCouncilAccounts() {
  const {networkAccounts} = useAccounts();
  const {data: council} = useCouncil();

  if (networkAccounts.length === 0 || !council) {
    return {
      councilAccounts: [],
      isAnyAccountCouncil: false,
    };
  }

  const councilAccounts = networkAccounts.filter((account) =>
    council.members.some((member) => member.account.address === account.address),
  );

  return {
    councilAccounts,
    isAnyAccountCouncil: Boolean(councilAccounts.length),
  };
}
