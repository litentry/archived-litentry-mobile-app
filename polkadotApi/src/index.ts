/* eslint @typescript-eslint/no-explicit-any: off */

import keyring from '@polkadot/ui-keyring';
import {cryptoWaitReady, mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';
import {keyringStore, initStore} from './keyringStore';

declare const window: any;
declare const document: any;

cryptoWaitReady().then(function () {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  const windowDocument = userAgent.includes('iphone') ? window : document;

  windowDocument.addEventListener('message', function (event: MessageEvent) {
    const {type, payload} = JSON.parse(event.data);

    switch (type) {
      case 'INIT_STORE': {
        initStore(payload.key, payload.value);
        break;
      }

      case 'INIT_KEYRING': {
        keyring.loadAll({type: 'sr25519', store: keyringStore});
        break;
      }

      case 'SET_SS58_FORMAT': {
        keyring.setSS58Format(payload.ss58Format);
        break;
      }

      case 'GENERATE_MNEMONIC': {
        const mnemonic = mnemonicGenerate();
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'GENERATE_MNEMONIC',
            payload: {mnemonic},
          }),
        );
        break;
      }

      case 'VALIDATE_MNEMONIC': {
        const isValid = mnemonicValidate(payload.mnemonic);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'VALIDATE_MNEMONIC',
            payload: {isValid},
          }),
        );
        break;
      }

      case 'GET_ACCOUNTS': {
        const accounts = keyring.getAccounts();
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'GET_ACCOUNTS',
            payload: {accounts},
          }),
        );
        break;
      }

      case 'GET_ACCOUNT': {
        const account = keyring.getAccount(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'GET_ACCOUNT',
            payload: {account},
          }),
        );
        break;
      }

      case 'GET_PAIRS': {
        const pairs = keyring.getPairs();
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'GET_PAIRS',
            payload: {pairs},
          }),
        );
        break;
      }

      case 'GET_PAIR': {
        const pair = keyring.getPair(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'GET_PAIR',
            payload: {pair},
          }),
        );
        break;
      }

      case 'ADD_ACCOUNT': {
        const {json} = keyring.addUri(payload.mnemonic, payload.password, {
          name: payload.name,
          network: payload.network,
          isFavorite: payload.isFavorite,
          isExternal: payload.isExternal,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'ADD_ACCOUNT',
            payload: {account: json},
          }),
        );
        break;
      }

      case 'RESTORE_ACCOUNT': {
        const pair = keyring.restoreAccount(payload.json, payload.password);
        keyring.saveAccountMeta(pair, {
          network: payload.network,
          isExternal: payload.isExternal,
          isFavorite: payload.isFavorite,
        });
        const json = pair.toJson(payload.password);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'RESTORE_ACCOUNT',
            payload: {account: json},
          }),
        );
        break;
      }

      case 'ADD_EXTERNAL_ACCOUNT': {
        const {json} = keyring.addExternal(payload.address, {
          network: payload.network,
          isFavorite: payload.isFavorite,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'ADD_EXTERNAL_ACCOUNT',
            payload: {account: json},
          }),
        );
        break;
      }

      case 'FORGET_ACCOUNT': {
        keyring.forgetAccount(payload.address);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'FORGET_ACCOUNT',
            payload: {address: payload.address},
          }),
        );
        break;
      }

      case 'CREATE_ACCOUNT': {
        const {address} = keyring.createFromUri(payload.mnemonic);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'CREATE_ACCOUNT',
            payload: {address},
          }),
        );
        break;
      }

      case 'TOGGLE_FAVORITE': {
        const pair = keyring.getPair(payload.address);
        keyring.saveAccountMeta(pair, {...pair.meta, isFavorite: !pair.meta.isFavorite});
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'TOGGLE_FAVORITE',
            payload: {address: payload.address},
          }),
        );
        break;
      }
    }
  } as (e: Event) => void);
});
