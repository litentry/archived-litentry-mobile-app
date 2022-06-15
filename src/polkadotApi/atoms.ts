import {atom, RecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import type {
  MnemonicLength,
  AddAccountPayload,
  AddExternalAccountPayload,
  RestoreAccountPayload,
  ExportAccountPayload,
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
    exportAccount: (_: ExportAccountPayload) => Promise.resolve<Record<string, unknown>>({}),
  },
});

// export const apiState = atom({
//   key: 'polkadot-api',
//   default: {
//     isConnecting: false,
//     isReady: false,
//   },
// });

// export const txState = atom({
//   key: 'tx',
//   default: {
//     getChainName: () => Promise.resolve(''),
//   },
// });
