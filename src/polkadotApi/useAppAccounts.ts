import {useMemo} from 'react';
import {useNetwork} from 'context/NetworkContext';
import {useRecoilState} from 'recoil';
import {appAccountsState} from './atoms';

export function useAppAccounts() {
  const {currentNetwork} = useNetwork();
  const [accounts, setAccounts] = useRecoilState(appAccountsState);

  // TODO: create a selector for networkAccounts (the currentNetwork needs to be moved to a atom)
  const networkAccounts = useMemo(() => {
    return Object.values(accounts).filter((account) => account.meta.network === currentNetwork.key);
  }, [accounts, currentNetwork]);

  return {
    accounts,
    networkAccounts,
    setAccounts,
  };
}
