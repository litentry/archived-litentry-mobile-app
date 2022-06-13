import {atom, RecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import type {AddAccountPayload, AddExternalAccountPayload, Accounts} from './types';
import * as Storage from 'src/service/PersistedObjectStorage';

const {persistAtom} = recoilPersist({
  key: 'recoil-persist',
  storage: Storage,
});

export const appAccountsState: RecoilState<Accounts> = atom({
  key: 'appAccounts',
  default: {},
  effects: [persistAtom],
});

export const mnemonicState = atom({
  key: 'mnemonic',
  default: {
    mnemonic: '',
    generate: () => {
      return;
    },
  },
});

export const addressState = atom({
  key: 'address',
  default: {
    address: '',
    generate: (_: string) => {
      return;
    },
  },
});

export const accountState = atom({
  key: 'account',
  default: {
    account: {},
    create: (_: AddAccountPayload) => {
      return;
    },
  },
});

export const externalAccountState = atom({
  key: 'externalAccount',
  default: {
    account: {},
    add: (_: AddExternalAccountPayload) => {
      return;
    },
  },
});
