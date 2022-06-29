import {KeyringStore, KeyringJson} from '@polkadot/ui-keyring/types';
import store from 'store';

export const keyringStore: KeyringStore = {
  all: (cb: (key: string, value: KeyringJson) => void): void => {
    store.each((value: KeyringJson, key: string): void => {
      cb(key, value);
    });
  },

  get: (key: string, cb: (value: KeyringJson) => void): void => {
    cb(store.get(key) as KeyringJson);
  },

  remove: (key: string, cb?: () => void): void => {
    store.remove(key);
    cb && cb();
  },

  set: (key: string, value: KeyringJson, cb?: () => void): void => {
    store.set(key, value);
    cb && cb();
  },
};

export const initStore = (key: string, value: unknown) => {
  store.set(key, value);
};
