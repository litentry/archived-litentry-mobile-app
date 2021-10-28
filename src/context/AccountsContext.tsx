import React, {useContext, createContext, useState, useEffect, useCallback} from 'react';

import {VoidFn} from '@polkadot/api/types';
import {SupportedNetworkType} from 'src/types';
import {NetworkContext} from 'src/context/NetworkContext';
import {useApi} from 'src/context/ChainApiContext';

import {Keyring} from '@polkadot/keyring';
const keyring = new Keyring({type: 'sr25519', ss58Format: 0});

export type Account = {
  address: string;
  name: string;
  isFavorite: boolean;
  isExternal: boolean;
  network: SupportedNetworkType;
};

type Accounts = Record<string, Account>;

const AccountsContext = createContext<{accounts: Accounts; reload: () => void; keyring: Keyring}>({
  keyring,
  accounts: {},
  reload: () => {
    return;
  },
});

function AccountsProvider({children}: {children: React.ReactNode}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [accounts, setAccounts] = useState<Accounts>({});
  const {api} = useApi();

  const getAll = useCallback(() => {
    const pairs = keyring.getPairs();

    const _accounts = pairs.reduce((acc, pair) => {
      const {address} = pair;
      const isFavorite = !!pair.meta.isFavorite;
      const isExternal = !!pair.meta.isExternal;
      const network = pair.meta.network as SupportedNetworkType;
      return {
        ...acc,
        [address]: {
          address,
          name: pair.meta.name,
          isFavorite,
          isExternal,
          network,
        },
      };
    }, {});

    setAccounts(_accounts);
  }, []);

  useEffect(() => {
    let unsubscribe: VoidFn | undefined;

    if (api) {
      // const subscription = keyring.accounts.subject.subscribe((accounts) => {
      //   const keyringAccounts = Object.values(accounts).reduce((map, {json}) => {
      //     const pair = tryGetPair(json.address);
      //     if (json.meta.network === currentNetwork.key && pair) {
      //       map = {
      //         ...map,
      //         [pair.address]: {
      //           address: pair.address,
      //           name: json.meta.name,
      //           isFavorite: Boolean(json.meta.isFavorite),
      //           isExternal: Boolean(json.meta.isExternal),
      //           network: json.meta.network as SupportedNetworkType,
      //         },
      //       };
      //     }
      //     return map;
      //   }, {});
      //   setAccounts(keyringAccounts);
      // });
      // unsubscribe = subscription.unsubscribe.bind(subscription);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [currentNetwork, api]);

  return <AccountsContext.Provider value={{accounts, reload: getAll, keyring}}>{children}</AccountsContext.Provider>;
}

function tryGetPair(address: string) {
  try {
    return keyring.getPair(address);
  } catch (e) {
    return undefined;
  }
}

function useAccounts() {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }

  return {accounts: Object.values(context.accounts), reload: context.reload, keyring: context.keyring};
}

function getAccountDisplayValue(account: Account) {
  return account.name ? account.name : account.address;
}

export {AccountsProvider, useAccounts, getAccountDisplayValue};
