import React, {useContext, useReducer, createContext, useMemo, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SupportedNetworkType} from 'src/types';
import {NetworkContext} from 'src/context/NetworkContext';
import {createLogger} from 'src/utils';

const logger = createLogger('AccountsContext');

type Account = {
  address: string;
  name: string;
};

type State = {
  [key in SupportedNetworkType]?: Array<Account>;
};

type AccountPayload = {network: SupportedNetworkType; account: Account};

type Action =
  | {
      type: 'ADD_ACCOUNT';
      payload: AccountPayload;
    }
  | {
      type: 'REMOVE_ACCOUNT';
      payload: AccountPayload;
    }
  | {
      type: 'INIT_STATE';
      payload: State;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      const networkAccounts = state[action.payload.network];
      return {
        ...state,
        [action.payload.network]: networkAccounts
          ? [...networkAccounts, action.payload.account]
          : [action.payload.account],
      };
    case 'REMOVE_ACCOUNT': {
      return {
        ...state,
        [action.payload.network]: state[action.payload.network]?.filter(
          (account) => account.address !== action.payload.account.address,
        ),
      };
    }
    case 'INIT_STATE': {
      return action.payload;
    }
    default:
      throw new Error(`Action not supported`);
  }
}

type AccountsContextValue = {
  isLoading: boolean;
  accounts: Account[];
  addAccount: (network: SupportedNetworkType, account: Account) => void;
  removeAccount: (network: SupportedNetworkType, account: Account) => void;
};

const initialState: State = {
  polkadot: [],
  kusama: [],
  litentry_test: [],
};

const STORAGE_KEY = 'accounts_state';

const AccountsContext = createContext<AccountsContextValue>({
  accounts: [],
  isLoading: true,
  addAccount: () => undefined,
  removeAccount: () => undefined,
});

function AccountsProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const networkState = useContext(NetworkContext);
  const currentNetwork = networkState.currentNetwork.key;

  useEffect(() => {
    try {
      AsyncStorage.getItem(STORAGE_KEY).then((persistedState) => {
        if (persistedState) {
          dispatch({type: 'INIT_STATE', payload: JSON.parse(persistedState)});
        }
        setIsLoading(false);
      });
    } catch (e) {
      logger.error(`Error getting ${STORAGE_KEY} from AsyncStorage`, e);
    }
  }, []);

  useEffect(() => {
    if (state) {
      try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        logger.error(`Error setting ${STORAGE_KEY} to AsyncStorage`, e);
      }
    }
  }, [state]);

  const accountsContextValue = useMemo(() => {
    return {
      accounts: state[currentNetwork] || [],
      isLoading,
      addAccount: (network: SupportedNetworkType, account: Account) => {
        dispatch({type: 'ADD_ACCOUNT', payload: {network, account}});
      },
      removeAccount: (network: SupportedNetworkType, account: Account) => {
        dispatch({type: 'REMOVE_ACCOUNT', payload: {network, account}});
      },
    };
  }, [currentNetwork, state, isLoading]);

  return <AccountsContext.Provider value={accountsContextValue}>{children}</AccountsContext.Provider>;
}

function useAccounts() {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }

  return context;
}

export {AccountsProvider, useAccounts};
