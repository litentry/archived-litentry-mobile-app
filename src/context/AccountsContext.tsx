import React, {useContext, createContext, useState, useRef, useEffect} from 'react';
import {View, Platform} from 'react-native'
import {SupportedNetworkType} from 'src/types';
import {NetworkContext} from 'src/context/NetworkContext';
import RNFS from 'react-native-fs';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {decodeAddress} from '@polkadot/keyring';
import {u8aToHex} from '@polkadot/util';
import {mmkvStorage} from 'service/MMKVStorage'

const KEYRING_ACCOUNTS = 'KEYRING_ACCOUNTS'

export type Account = {
  address: string;
  name: string;
  isFavorite: boolean;
  isExternal: boolean;
  network: SupportedNetworkType;
};

type AddAccountPayload = {
  mnemonic: string
  password: string
  name: string
  network: SupportedNetworkType
  isFavorite: boolean
  isExternal: boolean
}

type AddExternalAccountPayload = {
  address: string
  network: SupportedNetworkType
  isFavorite: boolean
}

type RestoreAccountPayload = {
  json: any
  password: string
  network: SupportedNetworkType
  isExternal: boolean,
  isFavorite: boolean
}

type Accounts = Record<string, Account>;

type AccountsContext = {
  accounts: Accounts
  setCallback: (cb: (data: Record<string, string>) => void) => void
  mnemonicGenerate: () => void
  createAccount: (mnemonic: string) => void
  addAccount: (payload: AddAccountPayload) => void
  getAllAccounts: () => void
  mnemonicValidate: (mnemonic: string) => void
  addExternalAccount: (payload: AddExternalAccountPayload) => void
  restoreAccount: (payload: RestoreAccountPayload) => void
}

export const AccountsContext = createContext<AccountsContext>({
  accounts: {},
  setCallback: () => ({}),
  mnemonicGenerate: () => ({}),
  createAccount: () => ({}),
  addAccount: () => ({}),
  getAllAccounts: () => ({}),
  mnemonicValidate: () => ({}),
  addExternalAccount: () => ({}),
  restoreAccount: () => ({})
});

function addressToHex (address: string): string {
  return u8aToHex(decodeAddress(address, true));
}

async function loadHtml(setHtml: (html: string) => void) {
  const html = Platform.OS === 'android' ? await RNFS.readFileAssets('index.html', 'utf8') : await RNFS.readFile(`${RNFS.MainBundlePath}/litentry-keyring/index.html`, 'utf8')
  setHtml(html)
}

function AccountsProvider({children}: {children: React.ReactNode}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [accounts, setAccounts] = useState<Accounts>({});
  const [localStoreAccounts, setLocalStoreAccounts] = useState<{key: string, value: any}[]>([])
  
  const webviewRef = useRef(null)
  const [html, setHtml] = useState('');
  loadHtml(setHtml)

  // to pass webview onMessage data to child components
  let callback: (data: Record<string, string>) => void = () => ({})
  const setCallback = (cb: (data: Record<string, string>) => void) => {
    callback = cb
  }

  const prepareAccounts = (accounts) => {
    // console.log(accounts)
    setAccounts(accounts.filter((account) => account.meta.network === currentNetwork.key).map((account) => {
      const {address, meta: {name, isExternal, isFavorite, network}} = account
      return {
        address: address,
        name: name,
        isFavorite: Boolean(isFavorite),
        isExternal: Boolean(isExternal),
        network: network
      }
    }))
  }

  useEffect(() => {
    if(html) {
      setSS58Format(currentNetwork.ss58Format)
      getAllAccounts()
    }
  }, [currentNetwork, html])

  useEffect(() => {
    const webviewAccounts = mmkvStorage.getString(KEYRING_ACCOUNTS)
    if(webviewAccounts) {
      const localStorAccounts = JSON.parse(webviewAccounts)
      setLocalStoreAccounts(localStorAccounts)
    }
  }, [])

  useEffect(() => {
    if(localStoreAccounts.length > 0) {
      mmkvStorage.set(KEYRING_ACCOUNTS, JSON.stringify(localStoreAccounts))
    }
  }, [localStoreAccounts])

  useEffect(() => {
    if(html) {
      setTimeout(() => {
        localStoreAccounts.forEach((account) => {
          webviewRef.current.postMessage(JSON.stringify({
            type: 'SET_LOCAL_STORAGE',
            payload: {
              key: account.key,
              value: account.value
            }
          }))
        });
        
        webviewRef.current.postMessage(JSON.stringify({
          type: 'LOAD_ALL'
        }))
  
        setSS58Format(currentNetwork.ss58Format)
        
        getAllAccounts()

      }, 1000)
    }
  }, [html])

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data)
    const {type, payload} = data

    switch(type) {
      case 'ALL_ACCOUNTS':
        prepareAccounts(payload.accounts)
        break
      case 'ADD_ACCOUNT':
      case 'ADD_EXTERNAL_ACCOUNT':
      case 'RESTORE_ACCOUNT':
        setLocalStoreAccounts([...localStoreAccounts, {
          key: `account:${addressToHex(payload.account.address)}`,
          value: payload.account
        }])
        getAllAccounts()
        callback(data)
        break
      default:
        callback(data)
    }
  };

  const mnemonicGenerate = () => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'MNEMONIC_GENERATE'
    }))
  }

  const createAccount = (mnemonic: string) => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'CREATE_ACCOUNT',
      payload: {mnemonic}
    }))
  }

  const addAccount = (payload: AddAccountPayload) => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'ADD_ACCOUNT',
      payload
    }))
  }

  const getAllAccounts = () => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'GET_ALL_ACCOUNTS'
    }))
  }

  const setSS58Format = (ss58Format: number) => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'SET_SS58_FORMAT',
      payload: {ss58Format}
    }))
  }

  const mnemonicValidate = (mnemonic: string) => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'MNEMONIC_VALIDATE',
      payload: {mnemonic}
    }))
  }

  const addExternalAccount = (payload: AddExternalAccountPayload) => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'ADD_EXTERNAL_ACCOUNT',
      payload
    }))
  }

  const restoreAccount = (payload: RestoreAccountPayload) => {
    webviewRef.current.postMessage(JSON.stringify({
      type: 'RESTORE_ACCOUNT',
      payload
    }))
  }


  return (
    <AccountsContext.Provider value={{
      accounts,
      setCallback,
      mnemonicGenerate,
      createAccount,
      addAccount,
      getAllAccounts,
      mnemonicValidate,
      addExternalAccount,
      restoreAccount
    }}>
      {children}
      <View style={{height: 0}}>
        {html ? (
          <WebView
            style={{height: 0}}
            ref={webviewRef}
            onMessage={onMessage}
            originWhitelist={['*']}
            source={{html}}
          />
        ) : null}
      </View>
    </AccountsContext.Provider>
  )
}

function useAccounts() {
  const {accounts} = useContext(AccountsContext);

  if (!accounts) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }

  return {accounts: Object.values(accounts)};
}

function getAccountDisplayValue(account: Account) {
  return account.name ? account.name : account.address;
}

export {AccountsProvider, useAccounts, getAccountDisplayValue};
