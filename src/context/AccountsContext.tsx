import React, {useContext, createContext, useState, useRef, useEffect} from 'react';
import {View} from 'react-native'
import {SupportedNetworkType} from 'src/types';
import {NetworkContext} from 'src/context/NetworkContext';
import RNFS from 'react-native-fs';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
// import {useApi} from './ChainApiContext';

export type Account = {
  address: string;
  name: string;
  isFavorite: boolean;
  isExternal: boolean;
  network: SupportedNetworkType;
};

type Accounts = Record<string, Account>;

type AccountsContext = {
  accounts: Accounts
  webviewRef: unknown
  setCallback: (cb: (data: Record<string, string>) => void) => void
}

export const AccountsContext = createContext<AccountsContext>({accounts: {}, webviewRef: null, setCallback: () => ({})});

function AccountsProvider({children}: {children: React.ReactNode}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [accounts, setAccounts] = useState<Accounts>({});
  // const {api} = useApi()
  
  const webviewRef = useRef(null)
  const [html, setHtml] = useState('');

  useEffect(() => {
    if(webviewRef.current != null) {
      console.log('load all')
      webviewRef.current.postMessage(JSON.stringify({
        type: 'LOAD_ALL'
      }))
    }
  }, [webviewRef])

  useEffect(() => {
    if(webviewRef.current != null) {
      console.log('set format')
      webviewRef.current.postMessage(JSON.stringify({
        type: 'SET_SS58_FORMAT',
        payload: {ss58Format: currentNetwork.ss58Format}
      }))
    }
  }, [webviewRef, currentNetwork])

  // to pass webview onMessage data to child components
  let callback: (data: Record<string, string>) => void
  const setCallback = (cb: (data: Record<string, string>) => void) => {
    callback = cb
  }

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data)
    console.log('msg from webview ::: ', data)
    const {type, payload} = data

    switch(type) {
      case 'ALL_ACCOUNTS':
        console.log('all accounts :::: ', payload.accounts)
        setAccounts(payload.accounts)
        break
      default:
        callback(data)
    }
  };

  // ios
  // RNFS.readFile(`${RNFS.MainBundlePath}/litentry-keyring/index.html`, 'utf8').then((html) => {
  //   setHtml(html);
  // });

  // android
  RNFS.readFileAssets('index.html', 'utf8').then((html) => {
    setHtml(html)
  })


  return (
    <AccountsContext.Provider value={{accounts, webviewRef, setCallback}}>
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
