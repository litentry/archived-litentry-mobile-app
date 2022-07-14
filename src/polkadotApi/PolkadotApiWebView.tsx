import React from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View, Platform, StyleSheet} from 'react-native';
import {useSetRecoilState} from 'recoil';
import RNFS from 'react-native-fs';
import {v4 as uuid4} from 'uuid';
import {webViewReadyState, cryptoUtilState, keyringState, apiState, txState} from './atoms';
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
  getTxPayloadMessage,
  GetTxPayloadMessage,
  SignAndSendTxMessage,
  TxSuccessful,
  signAndSendTxMessage,
  TxPayloadData,
  Blake2AsHexResultMessage,
  Blake2AsHexMessage,
  blake2AsHexMessage,
} from 'polkadot-api';

type PostMessage = (message: Message, id?: string) => void;

type MessageResolver<MessageResultPayload> = Record<string, (_result: MessageResultPayload) => void>;

type WebViewPromiseResponse<Payload> = {
  resolve: MessageResolver<Payload>;
  reject: MessageResolver<ErrorPayload>;
};

type ResolversRef = React.MutableRefObject<{
  resolveMnemonic: MessageResolver<GenerateMnemonicResultMessage['payload']>;
  resolveValidateMnemonic: MessageResolver<ValidateMnemonicResultMessage['payload']>;
  resolveCreateAddressFromMnemonic: MessageResolver<CreateAddressFromMnemonicResultMessage['payload']['address']>;
  resolveAddAccount: MessageResolver<AddAccountResultMessage['payload']['account']>;
  resolveAddExternalAccount: MessageResolver<AddExternalAccountResultMessage['payload']['account']>;
  resolveVerifyCredentials: MessageResolver<VerifyCredentialsResultMessage['payload']>;
  restoreAccountPromise: WebViewPromiseResponse<KeyringAccountPayload['account']>;
  exportAccountPromise: WebViewPromiseResponse<KeyringAccountPayload['account']>;
  signPromise: WebViewPromiseResponse<SignResultPayload['signed']>;
  getTxInfoPromise: WebViewPromiseResponse<GetTxInfoResultPayload['txInfo']>;
  getTxPayloadPromise: WebViewPromiseResponse<TxPayloadData>;
  sendTxPromise: WebViewPromiseResponse<TxSuccessful['txHash']>;
  signAndSendTxPromise: WebViewPromiseResponse<TxSuccessful['txHash']>;
  resolveGetTxMethodArgsLength: MessageResolver<GetTxMethodArgsLengthResultMessage['payload']>;
  resolveDecodeAddress: MessageResolver<DecodeAddressResultMessage['payload']>;
  resolveBlake2AsHex: MessageResolver<Blake2AsHexResultMessage['payload']>;
  resolveCheckAddress: MessageResolver<CheckAddressResultMessage['payload']>;
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

function useIsWebViewReady(isWebviewLoaded: boolean) {
  const setIsReady = useSetRecoilState(webViewReadyState);

  React.useEffect(() => {
    if (isWebviewLoaded) {
      setIsReady(isWebviewLoaded);
    }
  }, [isWebviewLoaded, setIsReady]);
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
          const id = uuid4();
          return new Promise((resolve) => {
            resolversRef.current.resolveMnemonic[id] = resolve;
            postMessage(generateMnemonicMessage({length: payload?.length}), id);
          });
        },
        validateMnemonic: (payload: ValidateMnemonicMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveValidateMnemonic[id] = resolve;
            postMessage(validateMnemonicMessage(payload), id);
          });
        },
        decodeAddress: (payload: DecodeAddressMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveDecodeAddress[id] = resolve;
            postMessage(decodeAddressMessage(payload), id);
          });
        },
        blake2AsHex: (payload: Blake2AsHexMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveBlake2AsHex[id] = resolve;
            postMessage(blake2AsHexMessage(payload), id);
          });
        },
        checkAddress: (payload: CheckAddressMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveCheckAddress[id] = resolve;
            postMessage(checkAddressMessage(payload), id);
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
            const id = uuid4();
            resolversRef.current.resolveCreateAddressFromMnemonic[id] = resolve;
            postMessage(createAddressFromMnemonicMessage(payload), id);
          });
        },
        addAccount: (payload: AddAccountMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveAddAccount[id] = resolve;
            postMessage(addAccountMessage(payload), id);
          });
        },
        addExternalAccount: (payload: AddExternalAccountMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveAddExternalAccount[id] = resolve;
            postMessage(addExternalAccountMessage(payload), id);
          });
        },
        forgetAccount: (payload: ForgetAccountMessage['payload']) => {
          postMessage(forgetAccountMessage(payload));
        },
        restoreAccount: (payload: RestoreAccountMessage['payload']) => {
          return new Promise((resolve, reject) => {
            const id = uuid4();
            resolversRef.current.restoreAccountPromise.resolve[id] = resolve;
            resolversRef.current.restoreAccountPromise.reject[id] = reject;
            postMessage(restoreAccountMessage(payload), id);
          });
        },
        exportAccount: (payload: ExportAccountMessage['payload']) => {
          return new Promise((resolve, reject) => {
            const id = uuid4();
            resolversRef.current.exportAccountPromise.resolve[id] = resolve;
            resolversRef.current.exportAccountPromise.reject[id] = reject;
            postMessage(exportAccountMessage(payload), id);
          });
        },
        updateAccountMeta: (payload: UpdateAccountMetaMessage['payload']) => {
          postMessage(updateAccountMetaMessage(payload));
        },
        verifyCredentials: (payload: VerifyCredentialsMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveVerifyCredentials[id] = resolve;
            postMessage(verifyCredentialsMessage(payload), id);
          });
        },
        sign: (payload: SignMessage['payload']) => {
          return new Promise((resolve, reject) => {
            const id = uuid4();
            resolversRef.current.signPromise.resolve[id] = resolve;
            resolversRef.current.signPromise.reject[id] = reject;
            postMessage(signMessageMessage(payload), id);
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
            const id = uuid4();
            resolversRef.current.getTxInfoPromise.resolve[id] = resolve;
            resolversRef.current.getTxInfoPromise.reject[id] = reject;
            postMessage(getTxInfoMessage(payload), id);
          });
        },
        getTxPayload: (payload: GetTxPayloadMessage['payload']) => {
          return new Promise((resolve, reject) => {
            const id = uuid4();
            resolversRef.current.getTxPayloadPromise.resolve[id] = resolve;
            resolversRef.current.getTxPayloadPromise.reject[id] = reject;
            postMessage(getTxPayloadMessage(payload), id);
          });
        },
        sendTx: (payload: SendTxMessage['payload']) => {
          return new Promise((resolve, reject) => {
            const id = uuid4();
            resolversRef.current.sendTxPromise.resolve[id] = resolve;
            resolversRef.current.sendTxPromise.reject[id] = reject;
            postMessage(sendTxMessage(payload), id);
          });
        },
        signAndSendTx: (payload: SignAndSendTxMessage['payload']) => {
          return new Promise((resolve, reject) => {
            const id = uuid4();
            resolversRef.current.signAndSendTxPromise.resolve[id] = resolve;
            resolversRef.current.signAndSendTxPromise.reject[id] = reject;
            postMessage(signAndSendTxMessage(payload), id);
          });
        },
        getTxMethodArgsLength: (payload: GetTxMethodArgsLengthMessage['payload']) => {
          return new Promise((resolve) => {
            const id = uuid4();
            resolversRef.current.resolveGetTxMethodArgsLength[id] = resolve;
            postMessage(getTxMethodArgsLengthMessage(payload), id);
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
      const {message, id} = JSON.parse(event.nativeEvent.data) as {message: Message; id: string};

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
        signAndSendTxPromise,
        resolveGetTxMethodArgsLength,
        resolveDecodeAddress,
        resolveBlake2AsHex,
        resolveCheckAddress,
        getTxPayloadPromise,
      } = resolversRef.current;

      switch (message.type) {
        case MessageType.GENERATE_MNEMONIC_RESULT: {
          resolveMnemonic[id]?.(message.payload);
          delete resolveMnemonic[id];
          break;
        }

        case MessageType.VALIDATE_MNEMONIC_RESULT: {
          resolveValidateMnemonic[id]?.(message.payload);
          delete resolveValidateMnemonic[id];
          break;
        }

        case MessageType.CREATE_ADDRESS_FROM_MNEMONIC_RESULT: {
          resolveCreateAddressFromMnemonic[id]?.(message.payload.address);
          delete resolveCreateAddressFromMnemonic[id];
          break;
        }

        case MessageType.ADD_ACCOUNT_RESULT: {
          setAccounts((_accounts) => ({
            ..._accounts,
            [message.payload.account.address]: message.payload.account,
          }));
          resolveAddAccount[id]?.(message.payload.account);
          delete resolveAddAccount[id];
          break;
        }

        case MessageType.ADD_EXTERNAL_ACCOUNT_RESULT: {
          setAccounts((_accounts) => ({
            ..._accounts,
            [message.payload.account.address]: message.payload.account,
          }));
          resolveAddExternalAccount[id]?.(message.payload.account);
          delete resolveAddExternalAccount[id];
          break;
        }

        case MessageType.FORGET_ACCOUNT_RESULT: {
          const {[message.payload.address]: _, ...rest} = accounts;
          setAccounts(rest);
          break;
        }

        case MessageType.RESTORE_ACCOUNT_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            restoreAccountPromise.reject[id]?.(payload);
          } else {
            setAccounts((_accounts) => ({
              ..._accounts,
              [payload.account.address]: payload.account,
            }));
            restoreAccountPromise.resolve[id]?.(payload.account);
          }
          delete restoreAccountPromise.resolve[id];
          delete restoreAccountPromise.reject[id];
          break;
        }

        case MessageType.EXPORT_ACCOUNT_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            exportAccountPromise.reject[id]?.(payload);
          } else {
            exportAccountPromise.resolve[id]?.(payload.account);
          }
          delete exportAccountPromise.resolve[id];
          delete exportAccountPromise.reject[id];
          break;
        }

        case MessageType.UPDATE_ACCOUNT_META_RESULT: {
          const account = accounts[message.payload.address];
          if (account) {
            const updatedAccount = {...account, meta: {...account.meta, ...message.payload.meta}};
            setAccounts((_accounts) => ({
              ..._accounts,
              [message.payload.address]: updatedAccount,
            }));
          }
          break;
        }

        case MessageType.VERIFY_CREDENTIALS_RESULT: {
          resolveVerifyCredentials[id]?.(message.payload);
          delete resolveVerifyCredentials[id];
          break;
        }

        case MessageType.SIGN_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            signPromise.reject[id]?.(payload);
          } else {
            signPromise.resolve[id]?.(payload.signed);
          }
          delete signPromise.resolve[id];
          delete signPromise.reject[id];
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
          console.warn('API ERROR', message.payload);
          postMessage(reconnectApiMessage({wsEndpoint: currentNetwork.ws[0] as string}));
          setApiState({isReady: false, isConnecting: true});
          break;
        }

        case MessageType.GET_TX_INFO_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            getTxInfoPromise.reject[id]?.(payload);
          } else {
            getTxInfoPromise.resolve[id]?.(payload.txInfo);
          }
          delete getTxInfoPromise.resolve[id];
          delete getTxInfoPromise.reject[id];
          break;
        }

        case MessageType.GET_TX_PAYLOAD_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            getTxPayloadPromise.reject[id]?.(payload);
          } else {
            getTxPayloadPromise.resolve[id]?.({txPayload: payload.txPayload, signablePayload: payload.signablePayload});
          }
          delete getTxPayloadPromise.resolve[id];
          delete getTxPayloadPromise.reject[id];
          break;
        }

        case MessageType.SEND_TX_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            sendTxPromise.reject[id]?.(payload);
          } else {
            sendTxPromise.resolve[id]?.(payload.txHash);
          }
          delete sendTxPromise.resolve[id];
          delete sendTxPromise.reject[id];
          break;
        }

        case MessageType.SIGN_AND_SEND_TX_RESULT: {
          const payload = message.payload;
          if (payload.error) {
            signAndSendTxPromise.reject[id]?.(payload);
          } else {
            signAndSendTxPromise.resolve[id]?.(payload.txHash);
          }
          delete signAndSendTxPromise.resolve[id];
          delete signAndSendTxPromise.reject[id];
          break;
        }

        case MessageType.GET_TX_METHOD_ARGS_LENGTH_RESULT: {
          resolveGetTxMethodArgsLength[id]?.(message.payload);
          delete resolveGetTxMethodArgsLength[id];
          break;
        }

        case MessageType.DECODE_ADDRESS_RESULT: {
          resolveDecodeAddress[id]?.(message.payload);
          delete resolveDecodeAddress[id];
          break;
        }

        case MessageType.BLAKE2_AS_HEX_RESULT: {
          resolveBlake2AsHex[id]?.(message.payload);
          delete resolveBlake2AsHex[id];
          break;
        }

        case MessageType.CHECK_ADDRESS_RESULT: {
          resolveCheckAddress[id]?.(message.payload);
          delete resolveCheckAddress[id];
          break;
        }
      }
    },
    [accounts, setAccounts, resolversRef, setApiState, postMessage, currentNetwork.ws],
  );

  return {webViewOnMessage};
}

export function PolkadotApiWebView() {
  const webViewRef = React.useRef<WebView>(null);
  const [html, setHtml] = React.useState('');
  const [isWebviewLoaded, setIsWebviewLoaded] = React.useState(false);
  const {accounts} = useAppAccounts();

  const resolversRef: ResolversRef = React.useRef({
    resolveMnemonic: {},
    resolveValidateMnemonic: {},
    resolveCreateAddressFromMnemonic: {},
    resolveAddAccount: {},
    resolveAddExternalAccount: {},
    resolveVerifyCredentials: {},
    restoreAccountPromise: {
      resolve: {},
      reject: {},
    },
    exportAccountPromise: {
      resolve: {},
      reject: {},
    },
    signPromise: {
      resolve: {},
      reject: {},
    },
    getTxInfoPromise: {
      resolve: {},
      reject: {},
    },
    getTxPayloadPromise: {
      resolve: {},
      reject: {},
    },
    getTxSignablePayloadPromise: {
      resolve: {},
      reject: {},
    },
    sendTxPromise: {
      resolve: {},
      reject: {},
    },
    signAndSendTxPromise: {
      resolve: {},
      reject: {},
    },
    resolveGetTxMethodArgsLength: {},
    resolveDecodeAddress: {},
    resolveBlake2AsHex: {},
    resolveCheckAddress: {},
  });

  const postMessage = React.useCallback(
    (message: Message, id?: string) => {
      webViewRef.current?.postMessage(JSON.stringify({message, id}));
    },
    [webViewRef],
  );

  useLoadHtml(setHtml);
  useIsWebViewReady(isWebviewLoaded);
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
