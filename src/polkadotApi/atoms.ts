import {atom, RecoilState} from 'recoil';
import type {
  MnemonicLength,
  AddAccountPayload,
  AddExternalAccountPayload,
  RestoreAccountPayload,
  ExportAccountPayload,
  Accounts,
  SignCredentials,
  SignedMessage,
} from './types';
import {persistAtom} from '@atoms/persist';

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
    toggleFavorite: (_: string) => {
      return;
    },
    restoreAccount: (_: RestoreAccountPayload) => Promise.resolve<Record<string, unknown>>({}),
    exportAccount: (_: ExportAccountPayload) => Promise.resolve<Record<string, unknown>>({}),
    sign: (_: string, __: SignCredentials) => Promise.resolve<SignedMessage>({signed: '0x...'}),
    verifyCredentials: (_: SignCredentials) => Promise.resolve({valid: false}),
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
