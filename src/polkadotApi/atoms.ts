import {atom, RecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import type {
  MnemonicLength,
  AddAccountPayload,
  AddExternalAccountPayload,
  RestoreAccountPayload,
  Accounts,
} from './types';
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

export const cryptoUtilState = atom({
  key: 'cryptoUtil',
  default: {
    generateMnemonic: (_?: MnemonicLength) => Promise.resolve(''),
    verifyMnemonic: (_: string) => Promise.resolve({isValid: false, address: undefined}),
  },
});

export const keyringState = atom({
  key: 'keyring',
  default: {
    createAccount: (_: string) => Promise.resolve(''),
    addAccount: (_: AddAccountPayload) => Promise.resolve<Record<string, unknown>>({}),
    addExternalAccount: (_: AddExternalAccountPayload) => Promise.resolve<Record<string, unknown>>({}),
    forgetAccount: (_: string) => {
      return;
    },
    restoreAccount: (_: RestoreAccountPayload) => Promise.resolve<Record<string, unknown>>({}),
  },
});
