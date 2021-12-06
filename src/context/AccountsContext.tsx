import React, {createContext, useContext} from 'react';
import {NetworkContext} from 'context/NetworkContext';
import {usePersistedState} from '@hooks/usePersistedState';
import {SupportedNetworkType} from 'src/types';

export type InternalAccount = {
  encoded: string;
  address: string;
  meta: {
    name: string;
    isFavorite: boolean;
    network: SupportedNetworkType;
  };
  isExternal: false;
};

export type ExternalAccount = {
  address: string;
  meta: {
    name: string;
    isFavorite: boolean;
    network: SupportedNetworkType;
  };
  isExternal: true;
};

export type Account = InternalAccount | ExternalAccount;

type Accounts = Record<string, Account>;

type Context = {
  accounts: Accounts;
  addAccount: (account: Account) => void;
  toggleFavorite: (address: string) => void;
  removeAccount: (address: string) => void;
};

const AccountsContext = createContext<Context>({
  accounts: {},
  addAccount: () => {
    return;
  },
  toggleFavorite: () => {
    return;
  },
  removeAccount: () => {
    return;
  },
});

function AccountsProvider({children}: {children: React.ReactNode}) {
  const [accounts, setAccounts] = usePersistedState<Accounts>('accounts', {});

  const value = {
    accounts,
    addAccount: (account: Account) => {
      setAccounts({...accounts, [account.address]: account});
    },
    toggleFavorite: (address: string) => {
      const account = accounts[address];
      if (account) {
        const newAccount = {...account, meta: {...account.meta, isFavorite: !account.meta.isFavorite}};
        setAccounts({...accounts, [address]: newAccount});
      }
    },
    removeAccount: (address: string) => {
      const newAccounts = {...accounts};
      delete newAccounts[address];
      setAccounts(newAccounts);
    },
  };

  return <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>;
}

function useAccounts() {
  const context = useContext(AccountsContext);
  const {currentNetwork} = useContext(NetworkContext);
  const networkAccounts = Object.values(context.accounts).filter(
    (account) => account.meta.network === currentNetwork.key,
  );

  if (!context) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }

  return {...context, networkAccounts};
}

function getAccountDisplayValue(account: Account) {
  return account.meta.name ? account.meta.name : account.address;
}

export {AccountsProvider, useAccounts, getAccountDisplayValue};
