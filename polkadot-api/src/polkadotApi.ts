/* eslint @typescript-eslint/no-explicit-any: off */

// import {ApiPromise, WsProvider} from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import {cryptoWaitReady, mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';
import {u8aToHex, hexToU8a} from '@polkadot/util';
import {keyringStore, initStore} from './keyringStore';
import {
  ACTION_TYPES,
  initStore as initStoreAction,
  generateMnemonic,
  initKeyring,
  setSS58Format,
  validateMnemonic,
  getAccounts,
  getAccount,
  createAccount,
  addAccount,
  restoreAccount,
  exportAccount,
  addExternalAccount,
  forgetAccount,
  toggleFavorite,
  verifyCredentials,
  sign,
} from './action';

declare const window: any;
declare const document: any;

type Action = {
  type: ACTION_TYPES;
  payload: Record<string, any>;
};

cryptoWaitReady().then(function () {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  const windowDocument = userAgent.includes('iphone') ? window : document;
  // let api: ApiPromise | undefined;

  // const runApiListeners = () => {
  //   api?.on('connected', () => {
  //     window.ReactNativeWebView.postMessage(JSON.stringify({type: 'API_CONNECTED'}));
  //   });
  //   api?.on('ready', () => {
  //     window.ReactNativeWebView.postMessage(JSON.stringify({type: 'API_READY'}));
  //   });
  //   api?.on('disconnected', () => {
  //     window.ReactNativeWebView.postMessage(JSON.stringify({type: 'API_DISCONNECTED'}));
  //   });
  //   api?.on('error', (error) => {
  //     window.ReactNativeWebView.postMessage(JSON.stringify({type: 'API_ERROR', payload: {error}}));
  //   });
  // };

  function onMessageHandler(event: MessageEvent) {
    const action = JSON.parse(event.data) as Action;
    const {type, payload} = action;

    switch (type) {
      // case 'INIT_API':
      // case 'RECONNECT_API': {
      //   const provider = new WsProvider(payload.wsEndpoint, false);
      //   api = new ApiPromise({provider});
      //   api.connect();
      //   runApiListeners();
      //   break;
      // }

      // case 'GET_CHAIN_NAME': {
      //   api?.rpc.system.chain().then((chainName) => {
      //     window.ReactNativeWebView.postMessage(
      //       JSON.stringify({
      //         type: 'CHAIN_NAME',
      //         payload: {chainName},
      //       }),
      //     );
      //   });

      //   break;
      // }

      case initStoreAction.type: {
        initStore(payload.key, payload.value);
        break;
      }

      case initKeyring.type: {
        keyring.loadAll({type: 'sr25519', store: keyringStore});
        break;
      }

      case setSS58Format.type: {
        keyring.setSS58Format(payload.ss58Format);
        break;
      }

      case generateMnemonic.type: {
        const mnemonic = mnemonicGenerate(payload.length);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: generateMnemonic.resultType,
            payload: {mnemonic},
          }),
        );
        break;
      }

      case validateMnemonic.type: {
        const isValid = mnemonicValidate(payload.mnemonic);
        let address;
        if (isValid) {
          const account = keyring.createFromUri(payload.mnemonic);
          address = account.address;
        }
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: validateMnemonic.resultType,
            payload: {isValid, address},
          }),
        );
        break;
      }

      case getAccounts.type: {
        const accounts = keyring.getAccounts();
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getAccounts.resultType,
            payload: {accounts},
          }),
        );
        break;
      }

      case getAccount.type: {
        const account = keyring.getAccount(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getAccount.resultType,
            payload: {account},
          }),
        );
        break;
      }

      case createAccount.type: {
        const {address} = keyring.createFromUri(payload.mnemonic);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: createAccount.resultType,
            payload: {address},
          }),
        );
        break;
      }

      case addAccount.type: {
        const {json, pair} = keyring.addUri(payload.mnemonic, payload.password, {
          name: payload.name,
          network: payload.network,
          isFavorite: payload.isFavorite,
          isExternal: payload.isExternal,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: addAccount.resultType,
            payload: {account: json},
          }),
        );

        if (!pair.isLocked) {
          pair.lock();
        }
        break;
      }

      case restoreAccount.type: {
        try {
          const pair = keyring.restoreAccount(payload.json, payload.password);
          keyring.saveAccountMeta(pair, {
            network: payload.network,
            isExternal: false,
            isFavorite: payload.isFavorite,
          });
          const json = pair.toJson(payload.password);
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: restoreAccount.resultType,
              payload: {account: json},
            }),
          );

          if (!pair.isLocked) {
            pair.lock();
          }
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: restoreAccount.resultType,
              payload: {isError: true, message: 'Unable to decode using the supplied password.'},
            }),
          );
        }
        break;
      }

      case exportAccount.type: {
        const pair = keyring.getPair(payload.address);
        try {
          const json = pair.toJson(payload.password);
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: exportAccount.resultType,
              payload: {account: json},
            }),
          );

          if (!pair.isLocked) {
            pair.lock();
          }
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: exportAccount.resultType,
              payload: {isError: true, message: 'Unable to decode using the supplied password.'},
            }),
          );
        }
        break;
      }

      case addExternalAccount.type: {
        const {json} = keyring.addExternal(payload.address, {
          name: payload.name,
          network: payload.network,
          isFavorite: payload.isFavorite,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: addExternalAccount.resultType,
            payload: {account: json},
          }),
        );
        break;
      }

      case forgetAccount.type: {
        keyring.forgetAccount(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: forgetAccount.resultType,
            payload: {address: payload.address},
          }),
        );
        break;
      }

      case toggleFavorite.type: {
        const pair = keyring.getPair(payload.address);
        keyring.saveAccountMeta(pair, {...pair.meta, isFavorite: !pair.meta.isFavorite});
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: toggleFavorite.resultType,
            payload: {address: payload.address},
          }),
        );

        if (!pair.isLocked) {
          pair.lock();
        }
        break;
      }

      case verifyCredentials.type: {
        const pair = keyring.getPair(payload.address);

        if (!pair.isLocked) {
          pair.lock();
        }

        try {
          pair.unlock(payload.password);
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: verifyCredentials.resultType,
              payload: {valid: true},
            }),
          );
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: verifyCredentials.resultType,
              payload: {valid: false},
            }),
          );
        }
        break;
      }

      case sign.type: {
        const {message, credentials} = payload;
        const pair = keyring.getPair(credentials.address);

        if (!pair.isLocked) {
          pair.lock();
        }

        try {
          pair.unlock(credentials.password);
          const signed = pair.sign(hexToU8a(message), {withType: true});
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: sign.resultType,
              payload: {signed: u8aToHex(signed)},
            }),
          );
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: sign.resultType,
              payload: {isError: true, message: 'Unable to decode using the supplied password.'},
            }),
          );
        }
        break;
      }
    }
  }

  windowDocument.addEventListener('message', onMessageHandler);
});
