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
} from './types';
import {useNetwork} from 'context/NetworkContext';
import {useAppAccounts} from './useAppAccounts';

type WebViewPromiseResponse = {
  resolve: (_: Record<string, unknown>) => void;
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
  signPromise: WebViewPromiseResponse;
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
          JSON.stringify({
            type: 'INIT_STORE',
            payload: {
              key: getAccountKey(account.address),
              value: account,
            },
          }),
        );
      });
    }
  }, [isWebviewLoaded, accounts, webViewRef]);
}

function useInitKeyring(isWebviewLoaded: boolean, webViewRef: WebViewRef) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: 'INIT_KEYRING',
        }),
      );
    }
  }, [isWebviewLoaded, webViewRef]);
}

function useSetSS58Format(isWebviewLoaded: boolean, webViewRef: WebViewRef) {
  const {
    currentNetwork: {ss58Format},
  } = useNetwork();

  React.useEffect(() => {
    if (isWebviewLoaded) {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: 'SET_SS58_FORMAT',
          payload: {ss58Format},
        }),
      );
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
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'GENERATE_MNEMONIC',
                payload: {length},
              }),
            );
          }),
        verifyMnemonic: (mnemonic: string) =>
          new Promise((resolve) => {
            resolversRef.current.resolveVerifyMnemonic = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'VALIDATE_MNEMONIC',
                payload: {mnemonic},
              }),
            );
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
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'CREATE_ACCOUNT',
                payload: {mnemonic},
              }),
            );
          }),
        addAccount: (payload: AddAccountPayload) =>
          new Promise((resolve) => {
            resolversRef.current.resolveAddAccount = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'ADD_ACCOUNT',
                payload,
              }),
            );
          }),
        addExternalAccount: (payload: AddExternalAccountPayload) =>
          new Promise((resolve) => {
            resolversRef.current.resolveAddExternalAccount = resolve;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'ADD_EXTERNAL_ACCOUNT',
                payload,
              }),
            );
          }),
        forgetAccount: (address: string) => {
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: 'FORGET_ACCOUNT',
              payload: {address},
            }),
          );
        },
        restoreAccount: (payload: RestoreAccountPayload) =>
          new Promise((resolve, reject) => {
            resolversRef.current.restoreAccountPromise.resolve = resolve;
            resolversRef.current.restoreAccountPromise.reject = reject;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'RESTORE_ACCOUNT',
                payload,
              }),
            );
          }),
        exportAccount: (payload: ExportAccountPayload) =>
          new Promise((resolve, reject) => {
            resolversRef.current.exportAccountPromise.resolve = resolve;
            resolversRef.current.exportAccountPromise.reject = reject;
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'EXPORT_ACCOUNT',
                payload,
              }),
            );
          }),
        sign: (message: string, credentials: SignCredentials) =>
          new Promise((resolve, reject) => {
            resolversRef.current.signPromise.resolve = resolve;
            resolversRef.current.signPromise.reject = reject;
            webViewRef.current?.postMessage(JSON.stringify({type: 'SIGN', payload: {message, credentials}}));
          }),
        verifyCrendentials: (credentials: SignCredentials) =>
          new Promise((resolve) => {
            resolversRef.current.resolveVerifyCredentials = resolve;
            webViewRef.current?.postMessage(JSON.stringify({type: 'VERIFY_CREDENTIALS', payload: credentials}));
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
      const data = JSON.parse(event.nativeEvent.data);
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

        case 'GENERATE_MNEMONIC': {
          resolveMnemonic(payload.mnemonic);
          break;
        }

        case 'VALIDATE_MNEMONIC': {
          resolveVerifyMnemonic(payload);
          break;
        }

        case 'CREATE_ACCOUNT': {
          resolveCreateAccount(payload.address);
          break;
        }

        case 'ADD_ACCOUNT': {
          setAccounts({
            ...accounts,
            [payload.account.address]: payload.account,
          });
          resolveAddAccount(payload.account);
          break;
        }

        case 'ADD_EXTERNAL_ACCOUNT': {
          setAccounts({
            ...accounts,
            [payload.account.address]: payload.account,
          });
          resolveAddExternalAccount(payload.account);
          break;
        }

        case 'FORGET_ACCOUNT': {
          const {[payload.address]: _, ...rest} = accounts;
          setAccounts(rest);
          break;
        }

        case 'RESTORE_ACCOUNT': {
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

        case 'EXPORT_ACCOUNT': {
          if (payload.isError) {
            exportAccountPromise.reject(payload);
          } else {
            exportAccountPromise.resolve(payload.account);
          }
          break;
        }

        case 'SIGN_RESULT': {
          if (payload.isError) {
            signPromise.reject(payload);
          } else {
            signPromise.resolve(payload.signed);
          }
          break;
        }

        case 'VERIFY_CREDENTIALS_RESULT': {
          resolveVerifyCredentials(payload);
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
      resolve: (_: Record<string, unknown>) => {
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
