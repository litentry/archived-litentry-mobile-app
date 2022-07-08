import {ApiPromise, WsProvider} from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import {cryptoWaitReady, mnemonicGenerate, mnemonicValidate, decodeAddress} from '@polkadot/util-crypto';
import {u8aToHex, hexToU8a} from '@polkadot/util';
import {keyringStore, initStore} from './keyringStore';
import {
  addAccountResultMessage,
  addExternalAccountResultMessage,
  apiConnectedMessage,
  apiDisconnectedMessage,
  apiErrorMessage,
  apiReadyMessage,
  createAddressFromMnemonicResultMessage,
  decodeAddressResultMessage,
  exportAccountResultMessage,
  forgetAccountResultMessage,
  generateMnemonicResultMessage,
  getTxInfoResultMessage,
  getTxMethodArgsLengthResultMessage,
  KeyringAccount,
  Message,
  MessageType,
  restoreAccountResultMessage,
  sendTxResultMessage,
  signMessageResultMessage,
  updateAccountMetaResultMessage,
  validateMnemonicResultMessage,
  verifyCredentialsResultMessage,
} from './messages';
import {getTxInfo, sendTx, getTxMethodArgsLength} from './txUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const document: any;

function postMessage(message: Message): void {
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
}

cryptoWaitReady().then(function () {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  const windowDocument = userAgent.includes('iphone') ? window : document;
  let api: ApiPromise | undefined;

  const runApiListeners = () => {
    api?.on('connected', () => {
      postMessage(apiConnectedMessage());
    });
    api?.on('ready', () => {
      postMessage(apiReadyMessage());
    });
    api?.on('disconnected', () => {
      postMessage(apiDisconnectedMessage());
    });
    api?.on('error', (error) => {
      postMessage(apiErrorMessage({error}));
    });
  };

  function onMessageHandler(event: MessageEvent) {
    const message = JSON.parse(event.data) as Message;

    switch (message.type) {
      case MessageType.INIT_API:
      case MessageType.RECONNECT_API: {
        const provider = new WsProvider(message.payload?.wsEndpoint, false);
        api = new ApiPromise({provider});
        api.connect();
        runApiListeners();
        break;
      }

      case MessageType.GET_TX_INFO: {
        const {address, txConfig} = message.payload;
        if (api) {
          getTxInfo(api, address, txConfig)
            .then((txInfo) => {
              postMessage(getTxInfoResultMessage({error: false, txInfo}));
            })
            .catch((error: Error) => {
              postMessage(getTxInfoResultMessage({error: true, message: error.message}));
            });
        }
        break;
      }

      case MessageType.SEND_TX: {
        const {address, txConfig, txPayload, signature} = message.payload;
        if (api) {
          sendTx(api, address, txConfig, txPayload, signature)
            .then(() => {
              postMessage(sendTxResultMessage({error: false}));
            })
            .catch((error) => {
              postMessage(sendTxResultMessage({error}));
            });
        }
        break;
      }

      case MessageType.GET_TX_METHOD_ARGS_LENGTH: {
        if (api) {
          const length = getTxMethodArgsLength(api, message.payload);
          postMessage(getTxMethodArgsLengthResultMessage(length));
        }
        break;
      }

      case MessageType.INIT_STORE: {
        initStore(message.payload.key, message.payload.value);
        break;
      }

      case MessageType.INIT_KEYRING: {
        keyring.loadAll({type: 'sr25519', store: keyringStore});
        break;
      }

      case MessageType.SET_SS58_FORMAT: {
        keyring.setSS58Format(message.payload.ss58Format);
        break;
      }

      case MessageType.GENERATE_MNEMONIC: {
        const mnemonic = mnemonicGenerate(message.payload.length);
        postMessage(generateMnemonicResultMessage({mnemonic}));
        break;
      }

      case MessageType.VALIDATE_MNEMONIC: {
        const isValid = mnemonicValidate(message.payload.mnemonic);
        let address = '';
        if (isValid) {
          const account = keyring.createFromUri(message.payload.mnemonic);
          address = account.address;
        }
        postMessage(validateMnemonicResultMessage({isValid, address}));
        break;
      }

      case MessageType.CREATE_ADDRESS_FROM_MNEMONIC: {
        const {address} = keyring.createFromUri(message.payload.mnemonic);
        postMessage(createAddressFromMnemonicResultMessage({address}));
        break;
      }

      case MessageType.ADD_ACCOUNT: {
        const {json, pair} = keyring.addUri(message.payload.mnemonic, message.payload.password, {
          name: message.payload.name,
          network: message.payload.network,
          isFavorite: false,
          isExternal: false,
        });
        postMessage(addAccountResultMessage({account: json as KeyringAccount}));

        if (!pair.isLocked) {
          pair.lock();
        }
        break;
      }

      case MessageType.RESTORE_ACCOUNT: {
        try {
          const pair = keyring.restoreAccount(message.payload.json, message.payload.password);
          keyring.saveAccountMeta(pair, {
            network: message.payload.network,
            isExternal: false,
            isFavorite: false,
          });
          const json = pair.toJson(message.payload.password);
          postMessage(restoreAccountResultMessage({account: json as KeyringAccount, error: false}));

          if (!pair.isLocked) {
            pair.lock();
          }
        } catch {
          postMessage(
            restoreAccountResultMessage({
              error: true,
              message: 'Unable to decode using the supplied password.',
            }),
          );
        }
        break;
      }

      case MessageType.EXPORT_ACCOUNT: {
        const pair = keyring.getPair(message.payload.address);
        try {
          const json = pair.toJson(message.payload.password);
          postMessage(exportAccountResultMessage({account: json as KeyringAccount, error: false}));

          if (!pair.isLocked) {
            pair.lock();
          }
        } catch {
          postMessage(
            exportAccountResultMessage({
              error: true,
              message: 'Unable to decode using the supplied password.',
            }),
          );
        }
        break;
      }

      case MessageType.ADD_EXTERNAL_ACCOUNT: {
        const {json} = keyring.addExternal(message.payload.address, {
          name: message.payload.name,
          network: message.payload.network,
          isFavorite: false,
        });
        postMessage(addExternalAccountResultMessage({account: json as KeyringAccount}));
        break;
      }

      case MessageType.FORGET_ACCOUNT: {
        keyring.forgetAccount(message.payload.address);
        postMessage(forgetAccountResultMessage({address: message.payload.address}));
        break;
      }

      case MessageType.UPDATE_ACCOUNT_META: {
        const {address, meta} = message.payload;
        const pair = keyring.getPair(address);
        keyring.saveAccountMeta(pair, {...pair.meta, ...meta});
        postMessage(updateAccountMetaResultMessage({address, meta}));

        if (!pair.isLocked) {
          pair.lock();
        }
        break;
      }

      case MessageType.VERIFY_CREDENTIALS: {
        const pair = keyring.getPair(message.payload.address);

        if (!pair.isLocked) {
          pair.lock();
        }

        try {
          pair.unlock(message.payload.password);
          postMessage(verifyCredentialsResultMessage({valid: true}));
        } catch {
          postMessage(verifyCredentialsResultMessage({valid: false}));
        }
        break;
      }

      case MessageType.SIGN: {
        const pair = keyring.getPair(message.payload.credentials.address);

        if (!pair.isLocked) {
          pair.lock();
        }

        try {
          pair.unlock(message.payload.credentials.password);
          const signed = pair.sign(hexToU8a(message.payload.message), {withType: true});
          postMessage(signMessageResultMessage({signed: u8aToHex(signed), error: false}));
        } catch {
          postMessage(
            signMessageResultMessage({
              error: true,
              message: 'Unable to decode using the supplied password.',
            }),
          );
        }
        break;
      }

      case MessageType.DECODE_ADDRESS: {
        const {encoded, ignoreChecksum, ss58Format} = message.payload;
        const decoded = decodeAddress(encoded, ignoreChecksum, ss58Format);
        postMessage(decodeAddressResultMessage(decoded));
        break;
      }
    }
  }

  windowDocument.addEventListener('message', onMessageHandler);
});
