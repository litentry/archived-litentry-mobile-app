import React from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View, Platform, StyleSheet} from 'react-native';
import {decodeAddress} from '@polkadot/util-crypto';
import {u8aToHex} from '@polkadot/util';
import {useSetRecoilState} from 'recoil';
import RNFS from 'react-native-fs';
import {cryptoUtilState, keyringState /* apiState, txState */} from './atoms';
import {useNetwork} from '@atoms/network';
import {useAppAccounts} from './useAppAccounts';

import {
  addAccountMessage,
  AddAccountMessage,
  AddAccountResultMessage,
  createAddressFromMnemonicMessage,
  CreateAddressFromMnemonicResultMessage,
  generateMnemonicMessage,
  GenerateMnemonicResultMessage,
  initKeyringMessage,
  initStoreMessage,
  Message,
  MessageType,
  setSS58FormatMessage,
  validateMnemonicMessage,
  addExternalAccountMessage,
  AddExternalAccountMessage,
  AddExternalAccountResultMessage,
  forgetAccountMessage,
  restoreAccountMessage,
  RestoreAccountMessage,
  ValidateMnemonicResultMessage,
  VerifyCredentialsResultMessage,
  ErrorPayload,
  CreateAddressFromMnemonicMessage,
  KeyringAccount,
  GenerateMnemonicMessage,
  ValidateMnemonicMessage,
  ForgetAccountMessage,
  exportAccountMessage,
  ExportAccountMessage,
  UpdateAccountMetaMessage,
  updateAccountMetaMessage,
  VerifyCredentialsMessage,
  verifyCredentialsMessage,
  SignMessage,
  signMessageMessage,
  // initApiMessage,
  // reconnectApiMessage,
  KeyringAccountPayload,
  SignResultPayload,
} from 'polkadot-api';

type WebViewPromiseResponse<Payload> = {
  resolve: (_: Payload) => void;
  reject: (_: ErrorPayload) => void;
};

type PostMessage = (message: Message) => void;

type ResolversRef = React.MutableRefObject<{
  resolveMnemonic: (_result: GenerateMnemonicResultMessage['payload']) => void;
  resolveValidateMnemonic: (_result: ValidateMnemonicResultMessage['payload']) => void;
  resolveCreateAddressFromMnemonic: (_result: CreateAddressFromMnemonicResultMessage['payload']['address']) => void;
  resolveAddAccount: (_result: AddAccountResultMessage['payload']['account']) => void;
  resolveAddExternalAccount: (_result: AddExternalAccountResultMessage['payload']['account']) => void;
  resolveVerifyCredentials: (_result: VerifyCredentialsResultMessage['payload']) => void;
  restoreAccountPromise: WebViewPromiseResponse<KeyringAccountPayload['account']>;
  exportAccountPromise: WebViewPromiseResponse<KeyringAccountPayload['account']>;
  signPromise: WebViewPromiseResponse<SignResultPayload['signed']>;
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

function useInitWebViewStore(
  isWebviewLoaded: boolean,
  accounts: Record<string, KeyringAccount>,
  postMessage: PostMessage,
) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      Object.values(accounts).forEach((account) => {
        postMessage(
          initStoreMessage({
            key: getAccountKey(account.address),
            value: account,
          }),
        );
      });
    }
  }, [isWebviewLoaded, accounts, postMessage]);
}

function useInitKeyring(isWebviewLoaded: boolean, postMessage: PostMessage) {
  React.useEffect(() => {
    if (isWebviewLoaded) {
      postMessage(initKeyringMessage());
    }
  }, [isWebviewLoaded, postMessage]);
}

function useSetSS58Format(isWebviewLoaded: boolean, postMessage: PostMessage) {
  const {
    currentNetwork: {ss58Format},
  } = useNetwork();

  React.useEffect(() => {
    if (isWebviewLoaded) {
      postMessage(setSS58FormatMessage({ss58Format}));
    }
  }, [isWebviewLoaded, ss58Format, postMessage]);
}

function useCryptoUtils(isWebviewLoaded: boolean, postMessage: PostMessage, resolversRef: ResolversRef) {
  const setCryptoUtilState = useSetRecoilState(cryptoUtilState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setCryptoUtilState({
        generateMnemonic: (payload?: GenerateMnemonicMessage['payload']) =>
          new Promise((resolve) => {
            resolversRef.current.resolveMnemonic = resolve;
            postMessage(generateMnemonicMessage({length: payload?.length}));
          }),
        validateMnemonic: (payload: ValidateMnemonicMessage['payload']) =>
          new Promise((resolve) => {
            resolversRef.current.resolveValidateMnemonic = resolve;

            postMessage(validateMnemonicMessage(payload));
          }),
      });
    }
  }, [isWebviewLoaded, setCryptoUtilState, postMessage, resolversRef]);
}

function useKeyringUtils(isWebviewLoaded: boolean, postMessage: PostMessage, resolversRef: ResolversRef) {
  const setKeyringState = useSetRecoilState(keyringState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setKeyringState({
        createAddressFromMnemonic: (payload: CreateAddressFromMnemonicMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveCreateAddressFromMnemonic = resolve;
            postMessage(createAddressFromMnemonicMessage(payload));
          });
        },
        addAccount: (payload: AddAccountMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveAddAccount = resolve;
            postMessage(addAccountMessage(payload));
          });
        },
        addExternalAccount: (payload: AddExternalAccountMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveAddExternalAccount = resolve;
            postMessage(addExternalAccountMessage(payload));
          });
        },
        forgetAccount: (payload: ForgetAccountMessage['payload']) => {
          postMessage(forgetAccountMessage(payload));
        },
        restoreAccount: (payload: RestoreAccountMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.restoreAccountPromise.resolve = resolve;
            resolversRef.current.restoreAccountPromise.reject = reject;
            postMessage(restoreAccountMessage(payload));
          });
        },
        exportAccount: (payload: ExportAccountMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.exportAccountPromise.resolve = resolve;
            resolversRef.current.exportAccountPromise.reject = reject;
            postMessage(exportAccountMessage(payload));
          });
        },
        updateAccountMeta: (payload: UpdateAccountMetaMessage['payload']) => {
          postMessage(updateAccountMetaMessage(payload));
        },
        verifyCredentials: (payload: VerifyCredentialsMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveVerifyCredentials = resolve;
            postMessage(verifyCredentialsMessage(payload));
          });
        },
        sign: (payload: SignMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.signPromise.resolve = resolve;
            resolversRef.current.signPromise.reject = reject;
            postMessage(signMessageMessage(payload));
          });
        },
      });
    }
  }, [isWebviewLoaded, setKeyringState, postMessage, resolversRef]);
}

// function useInitApi(isWebviewLoaded: boolean, postMessage: PostMessage) {
//   const {currentNetwork} = useNetwork();
//   const setApiState = useSetRecoilState(apiState);

//   React.useEffect(() => {
//     if (isWebviewLoaded) {
//       postMessage(initApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
//       setApiState({isReady: false, isConnecting: true});
//     }
//   }, [isWebviewLoaded, postMessage, setApiState, currentNetwork.ws]);
// }

// function useTx(isWebviewLoaded: boolean, postMessage: PostMessage, resolversRef: ResolversRef) {
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
//   }, [isWebviewLoaded, setTxState, postMessage, resolversRef]);
// }

function useWebViewOnMessage(resolversRef: ResolversRef, postMessage: PostMessage) {
  const {accounts, setAccounts} = useAppAccounts();
  // const setApiState = useSetRecoilState(apiState);
  const {currentNetwork} = useNetwork();

  const webViewOnMessage = React.useCallback(
    (event: WebViewMessageEvent) => {
      console.info('WebView Response: ', event.nativeEvent.data);
      const data = JSON.parse(event.nativeEvent.data) as Message;

      const {
        resolveMnemonic,
        resolveValidateMnemonic,
        resolveCreateAddressFromMnemonic,
        resolveAddAccount,
        resolveAddExternalAccount,
        resolveVerifyCredentials,
        restoreAccountPromise,
        exportAccountPromise,
        signPromise,
        // resolveChainName,
      } = resolversRef.current;

      switch (data.type) {
        // case 'CHAIN_NAME': {
        //   resolveChainName(payload.chainName);
        //   break;
        // }

        case MessageType.GENERATE_MNEMONIC_RESULT: {
          resolveMnemonic(data.payload);
          break;
        }

        case MessageType.VALIDATE_MNEMONIC_RESULT: {
          resolveValidateMnemonic(data.payload);
          break;
        }

        case MessageType.CREATE_ADDRESS_FROM_MNEMONIC_RESULT: {
          resolveCreateAddressFromMnemonic(data.payload.address);
          break;
        }

        case MessageType.ADD_ACCOUNT_RESULT: {
          setAccounts((_accounts) => ({
            ..._accounts,
            [data.payload.account.address]: data.payload.account,
          }));
          resolveAddAccount(data.payload.account);
          break;
        }

        case MessageType.ADD_EXTERNAL_ACCOUNT_RESULT: {
          setAccounts((_accounts) => ({
            ..._accounts,
            [data.payload.account.address]: data.payload.account,
          }));
          resolveAddExternalAccount(data.payload.account);
          break;
        }

        case MessageType.FORGET_ACCOUNT_RESULT: {
          const {[data.payload.address]: _, ...rest} = accounts;
          setAccounts(rest);
          break;
        }

        case MessageType.RESTORE_ACCOUNT_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            restoreAccountPromise.reject(payload);
          } else {
            setAccounts((_accounts) => ({
              ..._accounts,
              [payload.account.address]: payload.account,
            }));
            restoreAccountPromise.resolve(payload.account);
          }
          break;
        }

        case MessageType.EXPORT_ACCOUNT_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            exportAccountPromise.reject(payload);
          } else {
            exportAccountPromise.resolve(payload.account);
          }
          break;
        }

        case MessageType.UPDATE_ACCOUNT_META_RESULT: {
          const account = accounts[data.payload.address];
          if (account) {
            const updatedAccount = {...account, meta: {...account.meta, ...data.payload.meta}};
            setAccounts((_accounts) => ({
              ..._accounts,
              [data.payload.address]: updatedAccount,
            }));
          }
          break;
        }

        case MessageType.VERIFY_CREDENTIALS_RESULT: {
          resolveVerifyCredentials(data.payload);
          break;
        }

        case MessageType.SIGN_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            signPromise.reject(payload);
          } else {
            signPromise.resolve(payload.signed);
          }
          break;
        }

        // case MessageType.API_CONNECTED: {
        //   setApiState((state) => ({...state, isConnecting: false}));
        //   break;
        // }
        // case MessageType.API_READY: {
        //   setApiState((state) => ({...state, isReady: true}));
        //   break;
        // }
        // case MessageType.API_DISCONNECTED: {
        //   postMessage(reconnectApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
        //   setApiState({isReady: false, isConnecting: true});
        //   break;
        // }

        // case MessageType.API_ERROR: {
        //   console.error('API ERROR', data.payload);
        //   postMessage(reconnectApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
        //   setApiState({isReady: false, isConnecting: true});
        //   break;
        // }
      }
    },
    [accounts, setAccounts, resolversRef /*, setApiState, postMessage, currentNetwork.ws */],
  );

  return {webViewOnMessage};
}

function initialResolver() {
  return;
}

export function PolkadotApiWebView() {
  const webViewRef = React.useRef<WebView>(null);
  const [html, setHtml] = React.useState('');
  const [isWebviewLoaded, setIsWebviewLoaded] = React.useState(false);
  const {accounts} = useAppAccounts();

  const resolversRef: ResolversRef = React.useRef({
    resolveMnemonic: initialResolver,
    resolveValidateMnemonic: initialResolver,
    resolveCreateAddressFromMnemonic: initialResolver,
    resolveAddAccount: initialResolver,
    resolveAddExternalAccount: initialResolver,
    resolveVerifyCredentials: initialResolver,
    restoreAccountPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    exportAccountPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    signPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    // resolveChainName: (_: string) => {
    //   return;
    // },
  });

  const postMessage = React.useCallback(
    (message: Message) => {
      webViewRef.current?.postMessage(JSON.stringify(message));
    },
    [webViewRef],
  );

  useLoadHtml(setHtml);
  useInitWebViewStore(isWebviewLoaded, accounts, postMessage);
  useInitKeyring(isWebviewLoaded, postMessage);
  // useInitApi(isWebviewLoaded, postMessage);
  // useTx(isWebviewLoaded, postMessage, resolversRef);
  useSetSS58Format(isWebviewLoaded, postMessage);
  useCryptoUtils(isWebviewLoaded, postMessage, resolversRef);
  useKeyringUtils(isWebviewLoaded, postMessage, resolversRef);
  const {webViewOnMessage} = useWebViewOnMessage(resolversRef, postMessage);

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
