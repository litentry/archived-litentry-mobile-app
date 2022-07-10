import React from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View, Platform, StyleSheet} from 'react-native';
import {useSetRecoilState} from 'recoil';
import RNFS from 'react-native-fs';
import {cryptoUtilState, keyringState, apiState, txState} from './atoms';
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
  initApiMessage,
  reconnectApiMessage,
  KeyringAccountPayload,
  SignResultPayload,
  GetTxInfoResultPayload,
  GetTxInfoMessage,
  getTxInfoMessage,
  SendTxMessage,
  sendTxMessage,
  GetTxMethodArgsLengthMessage,
  GetTxMethodArgsLengthResultMessage,
  getTxMethodArgsLengthMessage,
  DecodeAddressResultMessage,
  DecodeAddressMessage,
  decodeAddressMessage,
  CheckAddressResultMessage,
  CheckAddressMessage,
  checkAddressMessage,
  GetTxPayloadResultPayload,
  GetTxSignablePayloadResultPayload,
  getTxPayloadMessage,
  GetTxPayloadMessage,
  GetTxSignablePayloadMessage,
  getTxSignablePayloadMessage,
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
  getTxInfoPromise: WebViewPromiseResponse<GetTxInfoResultPayload['txInfo']>;
  getTxPayloadPromise: WebViewPromiseResponse<GetTxPayloadResultPayload['txPayload']>;
  getTxSignablePayloadPromise: WebViewPromiseResponse<GetTxSignablePayloadResultPayload['signablePayload']>;
  sendTxPromise: WebViewPromiseResponse<void>;
  resolveGetTxMethodArgsLength: (_result: GetTxMethodArgsLengthResultMessage['payload']) => void;
  resolveDecodeAddress: (_result: DecodeAddressResultMessage['payload']) => void;
  resolveCheckAddress: (_result: CheckAddressResultMessage['payload']) => void;
}>;

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
            key: account.address,
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
        generateMnemonic: (payload?: GenerateMnemonicMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveMnemonic = resolve;
            postMessage(generateMnemonicMessage({length: payload?.length}));
          });
        },
        validateMnemonic: (payload: ValidateMnemonicMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveValidateMnemonic = resolve;
            postMessage(validateMnemonicMessage(payload));
          });
        },
        decodeAddress: (payload: DecodeAddressMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveDecodeAddress = resolve;
            postMessage(decodeAddressMessage(payload));
          });
        },
        checkAddress: (payload: CheckAddressMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveCheckAddress = resolve;
            postMessage(checkAddressMessage(payload));
          });
        },
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

function useInitApi(isWebviewLoaded: boolean, postMessage: PostMessage) {
  const {currentNetwork} = useNetwork();
  const setApiState = useSetRecoilState(apiState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      postMessage(initApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
      setApiState({isReady: false, isConnecting: true});
    }
  }, [isWebviewLoaded, postMessage, setApiState, currentNetwork.ws]);
}

function useApiTx(isWebviewLoaded: boolean, postMessage: PostMessage, resolversRef: ResolversRef) {
  const setTxState = useSetRecoilState(txState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setTxState({
        getTxInfo: (payload: GetTxInfoMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.getTxInfoPromise.resolve = resolve;
            resolversRef.current.getTxInfoPromise.reject = reject;
            postMessage(getTxInfoMessage(payload));
          });
        },
        getTxPayload: (payload: GetTxPayloadMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.getTxPayloadPromise.resolve = resolve;
            resolversRef.current.getTxPayloadPromise.reject = reject;
            postMessage(getTxPayloadMessage(payload));
          });
        },
        getTxSignablePayload: (payload: GetTxSignablePayloadMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.getTxSignablePayloadPromise.resolve = resolve;
            resolversRef.current.getTxSignablePayloadPromise.reject = reject;
            postMessage(getTxSignablePayloadMessage(payload));
          });
        },
        sendTx: (payload: SendTxMessage['payload']) => {
          return new Promise((resolve, reject) => {
            resolversRef.current.sendTxPromise.resolve = resolve;
            resolversRef.current.sendTxPromise.reject = reject;
            postMessage(sendTxMessage(payload));
          });
        },
        getTxMethodArgsLength: (payload: GetTxMethodArgsLengthMessage['payload']) => {
          return new Promise((resolve) => {
            resolversRef.current.resolveGetTxMethodArgsLength = resolve;
            postMessage(getTxMethodArgsLengthMessage(payload));
          });
        },
      });
    }
  }, [isWebviewLoaded, setTxState, postMessage, resolversRef]);
}

function useWebViewOnMessage(resolversRef: ResolversRef, postMessage: PostMessage) {
  const {accounts, setAccounts} = useAppAccounts();
  const setApiState = useSetRecoilState(apiState);
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
        getTxInfoPromise,
        sendTxPromise,
        resolveGetTxMethodArgsLength,
        resolveDecodeAddress,
        resolveCheckAddress,
        getTxPayloadPromise,
        getTxSignablePayloadPromise,
      } = resolversRef.current;

      switch (data.type) {
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

        case MessageType.API_CONNECTED: {
          setApiState((state) => ({...state, isConnecting: false}));
          break;
        }
        case MessageType.API_READY: {
          setApiState((state) => ({...state, isReady: true}));
          break;
        }
        case MessageType.API_DISCONNECTED: {
          postMessage(reconnectApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
          setApiState({isReady: false, isConnecting: true});
          break;
        }

        case MessageType.API_ERROR: {
          console.error('API ERROR', data.payload);
          postMessage(reconnectApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
          setApiState({isReady: false, isConnecting: true});
          break;
        }

        case MessageType.GET_TX_INFO_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            getTxInfoPromise.reject(payload);
          } else {
            getTxInfoPromise.resolve(payload.txInfo);
          }
          break;
        }

        case MessageType.GET_TX_PAYLOAD_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            getTxPayloadPromise.reject(payload);
          } else {
            getTxPayloadPromise.resolve(payload.txPayload);
          }
          break;
        }

        case MessageType.GET_TX_SIGNABLE_PAYLOAD_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            getTxSignablePayloadPromise.reject(payload);
          } else {
            getTxSignablePayloadPromise.resolve(payload.signablePayload);
          }
          break;
        }

        case MessageType.SEND_TX_RESULT: {
          const payload = data.payload;
          if (payload.error) {
            sendTxPromise.reject(payload);
          } else {
            sendTxPromise.resolve();
          }
          break;
        }

        case MessageType.GET_TX_METHOD_ARGS_LENGTH_RESULT: {
          resolveGetTxMethodArgsLength(data.payload);
          break;
        }

        case MessageType.DECODE_ADDRESS_RESULT: {
          resolveDecodeAddress(data.payload);
          break;
        }

        case MessageType.CHECK_ADDRESS_RESULT: {
          resolveCheckAddress(data.payload);
          break;
        }
      }
    },
    [accounts, setAccounts, resolversRef, setApiState, postMessage, currentNetwork.ws],
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
    getTxInfoPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    getTxPayloadPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    getTxSignablePayloadPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    sendTxPromise: {
      resolve: initialResolver,
      reject: initialResolver,
    },
    resolveGetTxMethodArgsLength: initialResolver,
    resolveDecodeAddress: initialResolver,
    resolveCheckAddress: initialResolver,
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
  useInitApi(isWebviewLoaded, postMessage);
  useApiTx(isWebviewLoaded, postMessage, resolversRef);
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
