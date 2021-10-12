import {MMKV} from 'react-native-mmkv';
import {KeyringStore} from '@polkadot/ui-keyring/types';

const storage = new MMKV();

export const keyringStore: KeyringStore = {
  all: (cb) => {
    const allKeys = storage.getAllKeys();
    allKeys.forEach((key) => {
      const storedValue = storage.getString(key);
      if (storedValue) {
        cb(key, JSON.parse(storedValue));
      }
    });
  },
  get: (key, cb) => {
    const storedValue = storage.getString(key);
    if (storedValue) {
      cb(JSON.parse(storedValue));
    }
  },
  remove: (key, cb) => {
    storage.delete(key);
    cb && cb();
  },
  set: (key, value, cb) => {
    storage.set(key, JSON.stringify(value));
    cb && cb();
  },
};
