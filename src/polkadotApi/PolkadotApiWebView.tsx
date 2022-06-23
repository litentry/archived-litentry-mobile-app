import React from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View, Platform, StyleSheet} from 'react-native';
import {decodeAddress} from '@polkadot/util-crypto';
import {u8aToHex} from '@polkadot/util';
import {useSetRecoilState} from 'recoil';
import RNFS from 'react-native-fs';
import {cryptoUtilState, keyringState /* apiState, txState */} from './atoms';
import type {
  MnemonicLength,
  AddAccountPayload,
  AddExternalAccountPayload,
  RestoreAccountPayload,
  ExportAccountPayload,
  WebViewError,
  Accounts,
  SignCredentials,
  SignedMessage,
} from './types';
import {useNetwork} from '@atoms/network';
import {useAppAccounts} from './useAppAccounts';

import {
  ACTION_TYPES,
  initStore,
  initKeyring,
  setSS58Format,
  generateMnemonic,
  validateMnemonic,
  createAccount,
  addAccount,
  addExternalAccount,
  forgetAccount,
  restoreAccount,
  exportAccount,
  toggleFavorite,
  sign,
  verifyCredentials,
} from 'polkadot-api';

type WebViewResult = {
  type: `${ACTION_TYPES}_RESULT`;
  payload: any;
};

type WebViewPromiseResponse = {
  resolve: (_: Record<string, unknown>) => void;
  reject: (_: WebViewError) => void;
};

type WebViewSignPromiseResponse = {
  resolve: (_: SignedMessage) => void;
  reject: (_: WebViewError) => void;
};

type WebViewRef = React.RefObject<WebView<Record<string, unknown>>>;

type ResolversRef = React.MutableRefObject<{
  resolveMnemonic: (_: string) => void;
  resolveVerifyMnemonic: (_: {isValid: false; address: undefined}) => void;
  resolveCreateAccount: (_: string) => void;
  resolveAddAccount: (_: Record<string, unknown>) => void;
  resolveAddExternalAccount: (_: Record<string, unknown>) => void;
  resolveVerifyCredentials: (_: {valid: boolean}) => void;
  restoreAccountPromise: WebViewPromiseResponse;
  exportAccountPromise: WebViewPromiseResponse;
  signPromise: WebViewSignPromiseResponse;
  // resolveChainName: (_: string) => void;
}>;

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

function useInitWebViewStore(isWebviewLoaded: boolean, accounts: Accounts, webViewRef: WebViewRef) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      Object.values(accounts).forEach((account) => {
        webViewRef.current?.postMessage(
          initStore.getAction({
            key: getAccountKey(account.address),
            value: account,
          }),
        );
      });
    }
  }, [isWebviewLoaded, accounts, webViewRef]);
}

function useInitKeyring(isWebviewLoaded: boolean, webViewRef: WebViewRef) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      webViewRef.current?.postMessage(initKeyring.getAction());
    }
  }, [isWebviewLoaded, webViewRef]);
}

function useSetSS58Format(isWebviewLoaded: boolean, webViewRef: WebViewRef) {
  const {
    currentNetwork: {ss58Format},
  } = useNetwork();

  React.useEffect(() => {
    if (isWebviewLoaded) {
      webViewRef.current?.postMessage(setSS58Format.getAction({ss58Format}));
    }
  }, [isWebviewLoaded, ss58Format, webViewRef]);
}

function useCryptoUtils(isWebviewLoaded: boolean, webViewRef: WebViewRef, resolversRef: ResolversRef) {
  const setCryptoUtilState = useSetRecoilState(cryptoUtilState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setCryptoUtilState({
        generateMnemonic: (length?: MnemonicLength) =>
          new Promise((resolve) => {
            resolversRef.current.resolveMnemonic = resolve;
            webViewRef.current?.postMessage(generateMnemonic.getAction({length}));
          }),
        verifyMnemonic: (mnemonic: string) =>
          new Promise((resolve) => {
            resolversRef.current.resolveVerifyMnemonic = resolve;
            webViewRef.current?.postMessage(validateMnemonic.getAction({mnemonic}));
          }),
      });
    }
  }, [isWebviewLoaded, setCryptoUtilState, webViewRef, resolversRef]);
}

function useKeyringUtils(isWebviewLoaded: boolean, webViewRef: WebViewRef, resolversRef: ResolversRef) {
  const setKeyringState = useSetRecoilState(keyringState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setKeyringState({
        createAccount: (mnemonic: string) =>
          new Promise((resolve) => {
            resolversRef.current.resolveCreateAccount = resolve;
            webViewRef.current?.postMessage(createAccount.getAction({mnemonic}));
          }),
        addAccount: (payload: AddAccountPayload) =>
          new Promise((resolve) => {
            resolversRef.current.resolveAddAccount = resolve;
            webViewRef.current?.postMessage(addAccount.getAction(payload));
          }),
        addExternalAccount: (payload: AddExternalAccountPayload) =>
          new Promise((resolve) => {
            resolversRef.current.resolveAddExternalAccount = resolve;
            webViewRef.current?.postMessage(addExternalAccount.getAction(payload));
          }),
        forgetAccount: (address: string) => {
          webViewRef.current?.postMessage(forgetAccount.getAction({address}));
        },
        restoreAccount: (payload: RestoreAccountPayload) =>
          new Promise((resolve, reject) => {
            resolversRef.current.restoreAccountPromise.resolve = resolve;
            resolversRef.current.restoreAccountPromise.reject = reject;
            webViewRef.current?.postMessage(restoreAccount.getAction(payload));
          }),
        exportAccount: (payload: ExportAccountPayload) =>
          new Promise((resolve, reject) => {
            resolversRef.current.exportAccountPromise.resolve = resolve;
            resolversRef.current.exportAccountPromise.reject = reject;
            webViewRef.current?.postMessage(exportAccount.getAction(payload));
          }),
        toggleFavorite: (address: string) => {
          webViewRef.current?.postMessage(toggleFavorite.getAction({address}));
        },
        verifyCredentials: (credentials: SignCredentials) =>
          new Promise((resolve) => {
            resolversRef.current.resolveVerifyCredentials = resolve;
            webViewRef.current?.postMessage(verifyCredentials.getAction(credentials));
          }),
        sign: (message: string, credentials: SignCredentials) =>
          new Promise((resolve, reject) => {
            resolversRef.current.signPromise.resolve = resolve;
            resolversRef.current.signPromise.reject = reject;
            webViewRef.current?.postMessage(sign.getAction({message, credentials}));
          }),
      });
    }
  }, [isWebviewLoaded, setKeyringState, webViewRef, resolversRef]);
}

// function useInitApi(isWebviewLoaded: boolean, webViewRef: WebViewRef) {
//   const {currentNetwork} = useNetwork();
//   const setApiState = useSetRecoilState(apiState);

//   React.useEffect(() => {
//     if (isWebviewLoaded) {
//       webViewRef.current?.postMessage(
//         JSON.stringify({
//           type: 'INIT_API',
//           payload: {wsEndpoint: currentNetwork.ws},
//         }),
//       );
//       setApiState({isReady: false, isConnecting: true});
//     }
//   }, [isWebviewLoaded, webViewRef, setApiState, currentNetwork.ws]);
// }

// function useTx(isWebviewLoaded: boolean, webViewRef: WebViewRef, resolversRef: ResolversRef) {
//   const setTxState = useSetRecoilState(txState);

//   React.useEffect(() => {
//     if (isWebviewLoaded) {
//       setTxState({
//         // example method: add here all tx methods (e.g: setIdentity)
//         getChainName: () => {
//           return new Promise((resolve) => {
//             resolversRef.current.resolveChainName = resolve;
//             webViewRef.current?.postMessage(
//               JSON.stringify({
//                 type: 'GET_CHAIN_NAME',
//               }),
//             );
//           });
//         },
//       });
//     }
//   }, [isWebviewLoaded, setTxState, webViewRef, resolversRef]);
// }

function useWebViewOnMessage(resolversRef: ResolversRef, webViewRef: WebViewRef) {
  const {accounts, setAccounts} = useAppAccounts();
  // const setApiState = useSetRecoilState(apiState);

  const webViewOnMessage = React.useCallback(
    (event: WebViewMessageEvent) => {
      console.info('WebView Response: ', event.nativeEvent.data);
      const data = JSON.parse(event.nativeEvent.data) as WebViewResult;
      const {type, payload} = data;

      const {
        resolveMnemonic,
        resolveVerifyMnemonic,
        resolveCreateAccount,
        resolveAddAccount,
        resolveAddExternalAccount,
        resolveVerifyCredentials,
        restoreAccountPromise,
        exportAccountPromise,
        signPromise,
        // resolveChainName,
      } = resolversRef.current;

      switch (type) {
        // case 'CHAIN_NAME': {
        //   resolveChainName(payload.chainName);
        //   break;
        // }

        case generateMnemonic.resultType: {
          resolveMnemonic(payload.mnemonic);
          break;
        }

        case validateMnemonic.resultType: {
          resolveVerifyMnemonic(payload);
          break;
        }

        case createAccount.resultType: {
          resolveCreateAccount(payload.address);
          break;
        }

        case addAccount.resultType: {
          setAccounts({
            ...accounts,
            [payload.account.address]: payload.account,
          });
          resolveAddAccount(payload.account);
          break;
        }

        case addExternalAccount.resultType: {
          setAccounts({
            ...accounts,
            [payload.account.address]: payload.account,
          });
          resolveAddExternalAccount(payload.account);
          break;
        }

        case forgetAccount.resultType: {
          const {[payload.address]: _, ...rest} = accounts;
          setAccounts(rest);
          break;
        }

        case restoreAccount.resultType: {
          if (payload.isError) {
            restoreAccountPromise.reject(payload);
          } else {
            setAccounts({
              ...accounts,
              [payload.account.address]: payload.account,
            });
            restoreAccountPromise.resolve(payload.account);
          }
          break;
        }

        case exportAccount.resultType: {
          if (payload.isError) {
            exportAccountPromise.reject(payload);
          } else {
            exportAccountPromise.resolve(payload.account);
          }
          break;
        }

        case toggleFavorite.resultType: {
          const account = accounts[payload.address];
          setAccounts({
            ...accounts,
            [payload.address]: {
              ...account,
              meta: {
                ...account?.meta,
                isFavorite: !account?.meta.isFavorite,
              },
            },
          });
          break;
        }

        case verifyCredentials.resultType: {
          resolveVerifyCredentials(payload);
          break;
        }

        case sign.resultType: {
          if (payload.isError) {
            signPromise.reject(payload);
          } else {
            signPromise.resolve(payload);
          }
          break;
        }

        // case 'API_CONNECTED': {
        //   setApiState((state) => ({...state, isConnecting: false}));
        //   break;
        // }
        // case 'API_READY': {
        //   setApiState((state) => ({...state, isReady: true}));
        //   break;
        // }
        // case 'API_DISCONNECTED': {
        //   webViewRef.current?.postMessage(
        //     JSON.stringify({
        //       type: 'RECONNECT_API',
        //     }),
        //   );
        //   setApiState({isReady: false, isConnecting: true});
        //   break;
        // }

        // case 'API_ERROR': {
        //   console.error(`API ERROR`, payload);
        // }
      }
    },
    [accounts, setAccounts, resolversRef],
  );

  return {webViewOnMessage};
}

export function PolkadotApiWebView() {
  const webViewRef = React.useRef<WebView>(null);
  const [html, setHtml] = React.useState('');
  const [isWebviewLoaded, setIsWebviewLoaded] = React.useState(false);
  const {accounts} = useAppAccounts();

  const resolversRef = React.useRef({
    resolveMnemonic: (_: string) => {
      return;
    },
    resolveVerifyMnemonic: (_: {isValid: false; address: undefined}) => {
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
    resolveVerifyCredentials: (_: {valid: boolean}) => {
      return;
    },
    restoreAccountPromise: {
      resolve: (_: Record<string, unknown>) => {
        return;
      },
      reject: (_: WebViewError) => {
        return;
      },
    },
    exportAccountPromise: {
      resolve: (_: Record<string, unknown>) => {
        return;
      },
      reject: (_: WebViewError) => {
        return;
      },
    },
    signPromise: {
      resolve: (_: SignedMessage) => {
        return;
      },
      reject: (_: WebViewError) => {
        return;
      },
    },
    // resolveChainName: (_: string) => {
    //   return;
    // },
  });

  useLoadHtml(setHtml);
  useInitWebViewStore(isWebviewLoaded, accounts, webViewRef);
  useInitKeyring(isWebviewLoaded, webViewRef);
  // useInitApi(isWebviewLoaded, webViewRef);
  // useTx(isWebviewLoaded, webViewRef, resolversRef);
  useSetSS58Format(isWebviewLoaded, webViewRef);
  useCryptoUtils(isWebviewLoaded, webViewRef, resolversRef);
  useKeyringUtils(isWebviewLoaded, webViewRef, resolversRef);
  const {webViewOnMessage} = useWebViewOnMessage(resolversRef, webViewRef);

  return (
    <View style={styles.webview}>
      {html ? (
        <WebView
          ref={webViewRef}
          onMessage={webViewOnMessage}
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
