import {networkState} from '@atoms/network';
import {selector, useRecoilState, useRecoilValue} from 'recoil';
import {appAccountsState} from './atoms';

const netWorkAccountsState = selector({
  key: 'networkAccounts',
  get: ({get}) => {
    const accounts = get(appAccountsState);
    const network = get(networkState);
    return Object.values(accounts).filter((account) => account.meta.network === network.key);
  },
});

export function useAppAccounts() {
  const [accounts, setAccounts] = useRecoilState(appAccountsState);
  const networkAccounts = useRecoilValue(netWorkAccountsState);

  return {
    accounts,
    networkAccounts,
    setAccounts,
  };
}
