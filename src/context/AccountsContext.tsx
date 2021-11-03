import React, {useContext, createContext, useState, useEffect} from 'react';

import {keyring} from '@polkadot/ui-keyring';
import {VoidFn} from '@polkadot/api/types';
import {SupportedNetworkType} from 'src/types';
import {NetworkContext} from 'src/context/NetworkContext';
import {useApi} from 'src/context/ChainApiContext';

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

  // addAccount: (address: string, name: string, isFavorite: boolean, isExternal: boolean) => void;
  // removeAccount: (address: string) => void;
  // setAccountName: (address: string, name: string) => void;
  // setAccountFavorite: (address: string, isFavorite: boolean) => void;
  // setAccountExternal: (address: string, isExternal: boolean) => void;
  // setAccountNetwork: (address: string, network: SupportedNetworkType) => void;
};

const AccountsContext = createContext<Context>({
  accounts: {},
  addAccount: () => {
    return;
  },
});

function AccountsProvider({children}: {children: React.ReactNode}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [accounts, setAccounts] = useState<Accounts>({});
  const {api} = useApi();

  const value = {
    accounts,
    addAccount: (account: Account) => {
      setAccounts({...accounts, [account.address]: account});
    },
  };

  return <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>;
}

function useAccounts() {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }

  return {accounts: Object.values(context.accounts), addAccount: context.addAccount};
}

function getAccountDisplayValue(account: Account) {
  return account.meta.name ? account.meta.name : account.address;
}

export {AccountsProvider, useAccounts, getAccountDisplayValue};
