import React from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View, Platform, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import {useSetRecoilState} from 'recoil';
import {cryptoUtilState, keyringState} from './atoms';
import type {MnemonicLength, AddAccountPayload, AddExternalAccountPayload, Accounts} from './types';
import {useNetwork} from 'context/NetworkContext';
import {decodeAddress} from '@polkadot/keyring';
import {u8aToHex} from '@polkadot/util';
import {useAppAccounts} from './useAppAccounts';

type WebViewRef = React.RefObject<WebView<Record<string, unknown>>>;

function getAccountKey(address: string) {
  return `account:${u8aToHex(decodeAddress(address, true))}`;
}

async function loadHtml() {
  return Platform.OS === 'android'
    ? await RNFS.readFileAssets('polkadotApi.html', 'utf8')
    : await RNFS.readFile(`${RNFS.MainBundlePath}/polkadotApi.html`, 'utf8');
}

function useLoadHtml(setHtml: (html: string) => void) {
  React.useEffect(() => {
    loadHtml().then(setHtml);
  }, [setHtml]);
}

const initWebviewStore = (_webViewRef: WebViewRef) => (accounts: Accounts) => {
  Object.values(accounts).forEach((account) => {
    _webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'INIT_STORE',
        payload: {
          key: getAccountKey(account.address),
          value: account,
        },
      }),
    );
  });
};

const initKeyring = (_webViewRef: WebViewRef) => () => {
  _webViewRef.current?.postMessage(
    JSON.stringify({
      type: 'INIT_KEYRING',
    }),
  );
};

const setSS58Format = (_webViewRef: WebViewRef) => (ss58Format: number) => {
  _webViewRef.current?.postMessage(
    JSON.stringify({
      type: 'SET_SS58_FORMAT',
      payload: {ss58Format},
    }),
  );
};

function useInitWebViewStore(isWebviewLoaded: boolean, accounts: Accounts, _initWebviewStore: (_: Accounts) => void) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      _initWebviewStore(accounts);
    }
  }, [isWebviewLoaded, accounts, _initWebviewStore]);
}

function useInitKeyring(isWebviewLoaded: boolean, _initKeyring: () => void) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      _initKeyring();
    }
  }, [isWebviewLoaded, _initKeyring]);
}

function useSetSS58Format(isWebviewLoaded: boolean, _setSS58Format: (_: number) => void) {
  const {currentNetwork} = useNetwork();
  React.useEffect(() => {
    if (isWebviewLoaded) {
      _setSS58Format(currentNetwork.ss58Format);
    }
  }, [isWebviewLoaded, currentNetwork.ss58Format, _setSS58Format]);
}

export function PolkadotApiWebView() {
  const webViewRef = React.useRef<WebView>(null);
  const [html, setHtml] = React.useState('');
  const [isWebviewLoaded, setIsWebviewLoaded] = React.useState(false);
  const {accounts, setAccounts} = useAppAccounts();
  const setCryptoUtilState = useSetRecoilState(cryptoUtilState);
  const setKeyringState = useSetRecoilState(keyringState);

  useLoadHtml(setHtml);
  useInitWebViewStore(isWebviewLoaded, accounts, initWebviewStore(webViewRef));
  useInitKeyring(isWebviewLoaded, initKeyring(webViewRef));
  useSetSS58Format(isWebviewLoaded, setSS58Format(webViewRef));

  const resolveRef = React.useRef({
    resolveMnemonic: (_: string) => {
      return;
    },
    resolveCreateAccount: (_: string) => {
      return;
    },
    resolveAddAccount: (_: Record<string, unknown>) => {
      return;
    },
    resolveAddExternalAccount: (_: Record<string, unknown>) => {
      return;
    },
  });

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setCryptoUtilState({
        generateMnemonic: (length?: MnemonicLength) =>
          new Promise((resolve) => {
            resolveRef.current.resolveMnemonic = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'GENERATE_MNEMONIC',
                payload: {length},
              }),
            );
          }),
      });
    }
  }, [isWebviewLoaded, setCryptoUtilState]);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setKeyringState({
        createAccount: (mnemonic: string) =>
          new Promise((resolve) => {
            resolveRef.current.resolveCreateAccount = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'CREATE_ACCOUNT',
                payload: {mnemonic},
              }),
            );
          }),
        addAccount: (payload: AddAccountPayload) =>
          new Promise((resolve) => {
            resolveRef.current.resolveAddAccount = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'ADD_ACCOUNT',
                payload,
              }),
            );
          }),
        addExternalAccount: (payload: AddExternalAccountPayload) =>
          new Promise((resolve) => {
            resolveRef.current.resolveAddExternalAccount = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'ADD_EXTERNAL_ACCOUNT',
                payload,
              }),
            );
          }),
      });
    }
  }, [isWebviewLoaded, setKeyringState]);

  const onMessage = (event: WebViewMessageEvent) => {
    console.log('WebView Response :::: ', event.nativeEvent.data);

    const data = JSON.parse(event.nativeEvent.data);
    const {type, payload} = data;

    const {resolveMnemonic, resolveCreateAccount, resolveAddAccount, resolveAddExternalAccount} = resolveRef.current;

    switch (type) {
      case 'GENERATE_MNEMONIC':
        resolveMnemonic(payload.mnemonic);
        break;

      case 'CREATE_ACCOUNT':
        resolveCreateAccount(payload.address);
        break;

      case 'ADD_ACCOUNT':
        setAccounts({
          ...accounts,
          [payload.account.address]: payload.account,
        });
        resolveAddAccount(payload.account);
        break;

      case 'ADD_EXTERNAL_ACCOUNT':
        setAccounts({
          ...accounts,
          [payload.account.address]: payload.account,
        });
        resolveAddExternalAccount(payload.account);
        break;
    }
  };

  return (
    <View style={styles.webview}>
      {html ? (
        <WebView
          ref={webViewRef}
          onMessage={onMessage}
          onLoadEnd={() => {
            setIsWebviewLoaded(true);
          }}
          originWhitelist={['*']}
          source={{html}}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  webview: {
    height: 0,
  },
});
