import keyring from '@polkadot/ui-keyring';
import {cryptoWaitReady, mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';
import store from 'store';

cryptoWaitReady().then(() => {

  const userAgent = navigator.userAgent.toLocaleLowerCase()
  const windowDocument = userAgent.includes('iphone') ? window : document

  windowDocument.addEventListener('message', function(event){
    const {type, payload} = JSON.parse(event.data)

    switch(type) {
      case 'SET_LOCAL_STORAGE':
        store.set(payload.key, payload.value)
        break

      case 'LOAD_ALL':
        keyring.loadAll({type: 'sr25519'})
        break
      
      case 'SET_SS58_FORMAT':
        keyring.setSS58Format(payload.ss58Format)
        break

      case 'MNEMONIC_GENERATE':
        const mnemonic = mnemonicGenerate()
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'MNEMONIC',
          payload: {mnemonic}
        }))
        break

      case 'GET_ALL_ACCOUNTS':
        const accounts = keyring.getPairs()
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'ALL_ACCOUNTS',
          payload: {accounts}
        }))
        break

      case 'ADD_ACCOUNT': {
        const {json} = keyring.addUri(payload.mnemonic, payload.password, {
          name: payload.name,
          network: payload.network,
          isFavorite: payload.isFavorite,
          isExternal: payload.isExternal
        });
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'ADD_ACCOUNT',
          payload: {account: json}
        }))
        break
      }

      case 'RESTORE_ACCOUNT': {
        const pair = keyring.restoreAccount(payload.json, payload.password)
        keyring.saveAccountMeta(pair, {network: payload.network, isExternal: payload.isExternal, isFavorite: payload.isFavorite});
        const json = pair.toJson(payload.password)
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'RESTORE_ACCOUNT',
          payload: {account: json}
        }))
        break
      }

      case 'ADD_EXTERNAL_ACCOUNT': {
        const {json} = keyring.addExternal(payload.address, {
          network: payload.network,
          isFavorite: payload.isFavorite
        });
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'ADD_EXTERNAL_ACCOUNT',
          payload: {account: json}
        }))
        break
      }
      
      case 'CREATE_ACCOUNT': {
        const {address} = keyring.createFromUri(payload.mnemonic)
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'CREATE_ACCOUNT',
          payload: {address}
        }))
        break
      }

      case 'MNEMONIC_VALIDATE':
        const isValid = mnemonicValidate(payload.mnemonic);
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'MNEMONIC_VALIDATE',
          payload: {isValid}
        }))

      case 'TOGGLE_FAVORITE': {
        const pair = keyring.getPair(payload.address);
        keyring.saveAccountMeta(pair, {...pair.meta, isFavorite: !pair.meta.isFavorite});
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'TOGGLE_FAVORITE'
        }))
      }
    }
  })
})

