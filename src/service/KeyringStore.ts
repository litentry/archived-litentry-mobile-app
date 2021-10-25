import {KeyringStore} from '@polkadot/ui-keyring/types';
import {mmkvStorage} from 'src/service/MMKVStorage';

export const keyringStore: KeyringStore = {
  all: (cb) => {
    const allKeys = mmkvStorage.getAllKeys();
    allKeys.forEach((key) => {
      const storedValue = mmkvStorage.getString(key);
      if (storedValue) {
        cb(key, JSON.parse(storedValue));
      }
    });
  },
  get: (key, cb) => {
    const storedValue = mmkvStorage.getString(key);
    if (storedValue) {
      cb(JSON.parse(storedValue));
    }
  },
  remove: (key, cb) => {
    mmkvStorage.delete(key);
    cb && cb();
  },
  set: (key, value, cb) => {
    mmkvStorage.set(key, JSON.stringify(value));
    cb && cb();
  },
};
