import {atom, RecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import type {
  KeyringAccount,
  AddAccountMessage,
  AddExternalAccountMessage,
  CreateAddressFromMnemonicMessage,
  ExportAccountMessage,
  ForgetAccountMessage,
  GenerateMnemonicMessage,
  GenerateMnemonicResultMessage,
  RestoreAccountMessage,
  SignMessage,
  UpdateAccountMetaMessage,
  ValidateMnemonicMessage,
  ValidateMnemonicResultMessage,
  VerifyCredentialsMessage,
  VerifyCredentialsResultMessage,
  HexString,
  GetTxInfoMessage,
  SendTxMessage,
} from 'polkadot-api';
import {TxInfo} from 'polkadot-api/src/txUtils';

export const appAccountsState: RecoilState<Record<string, KeyringAccount>> = atom({
  key: 'appAccounts',
  default: {},
  effects: [persistAtom],
});

export const cryptoUtilState = atom({
  key: 'cryptoUtil',
  default: {
    generateMnemonic: (_?: GenerateMnemonicMessage['payload']) => {
      return Promise.resolve<GenerateMnemonicResultMessage['payload']>({mnemonic: ''});
    },
    validateMnemonic: (_: ValidateMnemonicMessage['payload']) => {
      return Promise.resolve<ValidateMnemonicResultMessage['payload']>({isValid: false, address: ''});
    },
  },
});

const emptyAccountJson: KeyringAccount = {
  address: '',
  meta: {
    name: '',
    network: '',
    isFavorite: false,
    isExternal: false,
  },
  encoded: '',
  encoding: {content: [''], type: 'none', version: '0'},
};

export const keyringState = atom({
  key: 'keyring',
  default: {
    createAddressFromMnemonic: (_: CreateAddressFromMnemonicMessage['payload']) => {
      return Promise.resolve<string>('');
    },
    addAccount: (_: AddAccountMessage['payload']) => {
      return Promise.resolve<KeyringAccount>(emptyAccountJson);
    },
    addExternalAccount: (_: AddExternalAccountMessage['payload']) => {
      return Promise.resolve<KeyringAccount>(emptyAccountJson);
    },
    forgetAccount: (_: ForgetAccountMessage['payload']) => {
      return;
    },
    updateAccountMeta: (_: UpdateAccountMetaMessage['payload']) => {
      return;
    },
    restoreAccount: (_: RestoreAccountMessage['payload']) => {
      return Promise.resolve<KeyringAccount>(emptyAccountJson);
    },
    exportAccount: (_: ExportAccountMessage['payload']) => {
      return Promise.resolve<KeyringAccount>(emptyAccountJson);
    },
    sign: (_: SignMessage['payload']) => {
      return Promise.resolve<HexString>('0x00000');
    },
    verifyCredentials: (_: VerifyCredentialsMessage['payload']) => {
      return Promise.resolve<VerifyCredentialsResultMessage['payload']>({valid: false});
    },
  },
});

export const apiState = atom({
  key: 'polkadot-api-state',
  default: {
    isConnecting: false,
    isReady: false,
  },
});

export const txState = atom({
  key: 'tx',
  default: {
    getTxInfo: (_: GetTxInfoMessage['payload']) => {
      return Promise.resolve<TxInfo>({} as TxInfo);
    },
    sendTx: (_: SendTxMessage['payload']) => {
      return Promise.resolve();
    },
  },
});
