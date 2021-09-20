import {AccountInfo} from '@polkadot/types/interfaces';
import {useApi} from 'context/ChainApiContext';
import {useEffect, useState} from 'react';

export function useBalance({address}: {address: string}) {
  const {api} = useApi();
  const [balance, setBalance] = useState<AccountInfo | null>(null);

  useEffect(() => {
    let localUnsub: () => void | null;
    if (api) {
      api?.query.system
        .account(address, (accountInfo) => {
          setBalance(accountInfo);
        })
        .then((unsub) => {
          localUnsub = unsub;
        });
    }

    return () => {
      localUnsub && localUnsub();
    };
  }, [api, address]);

  return balance;
}
