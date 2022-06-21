/* eslint @typescript-eslint/no-explicit-any: off */

// import {ApiPromise, WsProvider} from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import {cryptoWaitReady, mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';
import {u8aToHex, hexToU8a} from '@polkadot/util';
import {keyringStore, initStore} from './keyringStore';
import {ACTION_TYPES, getResultType} from './action';

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

      case ACTION_TYPES.INIT_STORE: {
        initStore(payload.key, payload.value);
        break;
      }

      case ACTION_TYPES.INIT_KEYRING: {
        keyring.loadAll({type: 'sr25519', store: keyringStore});
        break;
      }

      case ACTION_TYPES.SET_SS58_FORMAT: {
        keyring.setSS58Format(payload.ss58Format);
        break;
      }

      case ACTION_TYPES.GENERATE_MNEMONIC: {
        const mnemonic = mnemonicGenerate(payload.length);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.GENERATE_MNEMONIC),
            payload: {mnemonic},
          }),
        );
        break;
      }

      case ACTION_TYPES.VALIDATE_MNEMONIC: {
        const isValid = mnemonicValidate(payload.mnemonic);
        let address;
        if (isValid) {
          const account = keyring.createFromUri(payload.mnemonic);
          address = account.address;
        }
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.VALIDATE_MNEMONIC),
            payload: {isValid, address},
          }),
        );
        break;
      }

      case ACTION_TYPES.GET_ACCOUNTS: {
        const accounts = keyring.getAccounts();
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.GET_ACCOUNTS),
            payload: {accounts},
          }),
        );
        break;
      }

      case ACTION_TYPES.GET_ACCOUNT: {
        const account = keyring.getAccount(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.GET_ACCOUNT),
            payload: {account},
          }),
        );
        break;
      }

      case ACTION_TYPES.CREATE_ACCOUNT: {
        const {address} = keyring.createFromUri(payload.mnemonic);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.CREATE_ACCOUNT),
            payload: {address},
          }),
        );
        break;
      }

      case ACTION_TYPES.ADD_ACCOUNT: {
        const {json, pair} = keyring.addUri(payload.mnemonic, payload.password, {
          name: payload.name,
          network: payload.network,
          isFavorite: payload.isFavorite,
          isExternal: payload.isExternal,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.ADD_ACCOUNT),
            payload: {account: json},
          }),
        );

        if (!pair.isLocked) {
          pair.lock();
        }
        break;
      }

      case ACTION_TYPES.RESTORE_ACCOUNT: {
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
              type: getResultType(ACTION_TYPES.RESTORE_ACCOUNT),
              payload: {account: json},
            }),
          );

          if (!pair.isLocked) {
            pair.lock();
          }
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: getResultType(ACTION_TYPES.RESTORE_ACCOUNT),
              payload: {isError: true, message: 'Unable to decode using the supplied password.'},
            }),
          );
        }
        break;
      }

      case ACTION_TYPES.EXPORT_ACCOUNT: {
        const pair = keyring.getPair(payload.address);
        try {
          const json = pair.toJson(payload.password);
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: getResultType(ACTION_TYPES.EXPORT_ACCOUNT),
              payload: {account: json},
            }),
          );

          if (!pair.isLocked) {
            pair.lock();
          }
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: getResultType(ACTION_TYPES.EXPORT_ACCOUNT),
              payload: {isError: true, message: 'Unable to decode using the supplied password.'},
            }),
          );
        }
        break;
      }

      case ACTION_TYPES.ADD_EXTERNAL_ACCOUNT: {
        const {json} = keyring.addExternal(payload.address, {
          network: payload.network,
          isFavorite: payload.isFavorite,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.ADD_EXTERNAL_ACCOUNT),
            payload: {account: json},
          }),
        );
        break;
      }

      case ACTION_TYPES.FORGET_ACCOUNT: {
        keyring.forgetAccount(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: getResultType(ACTION_TYPES.FORGET_ACCOUNT),
            payload: {address: payload.address},
          }),
        );
        break;
      }

      // case 'TOGGLE_FAVORITE': {
      //   const pair = keyring.getPair(payload.address);
      //   keyring.saveAccountMeta(pair, {...pair.meta, isFavorite: !pair.meta.isFavorite});
      //   window.ReactNativeWebView.postMessage(
      //     JSON.stringify({
      //       type: 'TOGGLE_FAVORITE',
      //       payload: {address: payload.address},
      //     }),
      //   );
      //   break;
      // }

      case ACTION_TYPES.VERIFY_CREDENTIALS: {
        const pair = keyring.getPair(payload.address);

        if (!pair.isLocked) {
          pair.lock();
        }

        try {
          pair.unlock(payload.password);
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: getResultType(ACTION_TYPES.VERIFY_CREDENTIALS),
              payload: {valid: true},
            }),
          );
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: getResultType(ACTION_TYPES.VERIFY_CREDENTIALS),
              payload: {valid: false},
            }),
          );
        }
        break;
      }

      case ACTION_TYPES.SIGN: {
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
              type: getResultType(ACTION_TYPES.SIGN),
              payload: {signed: u8aToHex(signed)},
            }),
          );
        } catch {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: getResultType(ACTION_TYPES.SIGN),
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
