import {useEffect, useState} from 'react';
import {useAccounts} from 'context/AccountsContext';
import {useAccounts as useApiAccounts} from 'src/api/hooks/useAccounts';
import type {Account} from 'src/api/hooks/useAccount';

export function useAppAccounts() {
  const {networkAccounts} = useAccounts();
  const addresses = networkAccounts.map((account) => account.address);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const {data} = useApiAccounts(addresses);

  useEffect(() => {
    if (data != null) {
      setAccounts(data);
    }
  }, [data]);

  return accounts;
}
