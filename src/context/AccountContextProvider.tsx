import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {AccountAddressType} from 'src/types';
import {ChainApiContext} from './ChainApiContext';
import {Registration} from '@polkadot/types/interfaces';

type AccountContextValueType = {
  accounts: AccountAddressType[] | null;
  setAccount: (account: AccountAddressType | null) => void;
  currentIdentity: Registration | null;
};

type PropTypes = {
  children: React.ReactNode;
};

export const AccountContext = createContext<AccountContextValueType>({
  accounts: [],
  setAccount: () => undefined,
  currentIdentity: null,
});

function AccountContextProvider({children}: PropTypes) {
  const {getItem, setItem, removeItem} = useAsyncStorage('accounts');
  const [accounts, setAccounts] = useState<AccountAddressType[] | null>(null);
  const {status, api} = useContext(ChainApiContext);
  const [currentIdentity, setCurrentIdentity] = useState<Registration | null>(
    null,
  );

  useEffect(() => {
    getItem((_, result) => {
      // hack: this string check is added to prevent infinite rerenders
      if (result && JSON.stringify(accounts) !== result) {
        setAccounts(JSON.parse(result));
      }
    });
  }, [getItem, accounts]);

  useEffect(() => {
    if (status && api && accounts?.[0]) {
      const account = accounts[0];
      api?.query.identity?.identityOf(account.address).then((registration) => {
        setCurrentIdentity(registration.unwrap());
      });
    }
  }, [status, api, accounts]);

  const setAccount = useCallback(
    (account: AccountAddressType | null) => {
      if (account) {
        setItem(JSON.stringify([account]), () => {
          setAccounts([account]);
        });
      } else {
        removeItem(() => {
          setAccounts(null);
        });
      }
    },
    [setItem, removeItem],
  );

  const value = useMemo(
    () => ({
      accounts,
      setAccount,
      currentIdentity,
    }),
    [accounts, setAccount, currentIdentity],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export default AccountContextProvider;
