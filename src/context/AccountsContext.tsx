import React, {useContext, createContext, useState, useEffect} from 'react';

import {SupportedNetworkType} from 'src/types';
import {NetworkContext} from 'src/context/NetworkContext';
import {keyring} from '@polkadot/ui-keyring';
import {useApi} from './ChainApiContext';
import {VoidFn} from '@polkadot/api/types';

export type Account = {
  address: string;
  name: string;
  isFavorite: boolean;
  isExternal: boolean;
  network: SupportedNetworkType;
};

type Accounts = Record<string, Account>;

const AccountsContext = createContext<Accounts>({});

function AccountsProvider({children}: {children: React.ReactNode}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [accounts, setAccounts] = useState<Accounts>({});
  const {api} = useApi();

  useEffect(() => {
    let unsubscribe: VoidFn | undefined;

    if (api) {
      const subscription = keyring.accounts.subject.subscribe((accounts) => {
        const keyringAccounts = Object.values(accounts).reduce((map, {json}) => {
          if (json.meta.network === currentNetwork.key) {
            const pair = keyring.getPair(json.address);
            map = {
              ...map,
              [pair.address]: {
                address: pair.address,
                name: json.meta.name,
                isFavorite: Boolean(json.meta.isFavorite),
                isExternal: Boolean(json.meta.isExternal),
                network: json.meta.network as SupportedNetworkType,
              },
            };
          }
          return map;
        }, {});

        setAccounts(keyringAccounts);
      });

      unsubscribe = subscription.unsubscribe;
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [currentNetwork, api]);

  return <AccountsContext.Provider value={accounts}>{children}</AccountsContext.Provider>;
}

function useAccounts() {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }

  return {accounts: Object.values(context)};
}

function getAccountDisplayValue(account: Account) {
  return account.name ? account.name : account.address;
}

export {AccountsProvider, useAccounts, getAccountDisplayValue};
