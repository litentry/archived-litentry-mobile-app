import {atom, RecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import {
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
  TxInfo,
  GetTxMethodArgsLengthMessage,
  DecodeAddressMessage,
  DecodeAddressResultMessage,
  CheckAddressMessage,
  CheckAddressResultMessage,
  GetTxPayloadMessage,
  TxHash,
  SignAndSendTxMessage,
  TxPayloadData,
  Blake2AsHexMessage,
  Blake2AsHexResultMessage,
} from 'polkadot-api';

export const webViewReadyState = atom({
  key: 'webViewReadyState',
  default: false,
});

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
    decodeAddress: (_: DecodeAddressMessage['payload']) => {
      return Promise.resolve<DecodeAddressResultMessage['payload']>('0x000');
    },
    blake2AsHex: (_: Blake2AsHexMessage['payload']) => {
      return Promise.resolve<Blake2AsHexResultMessage['payload']>('0x000');
    },
    checkAddress: (_: CheckAddressMessage['payload']) => {
      return Promise.resolve<CheckAddressResultMessage['payload']>({isValid: false, reason: ''});
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
    getTxPayload: (_: GetTxPayloadMessage['payload']) => {
      return Promise.resolve<TxPayloadData>({} as TxPayloadData);
    },
    sendTx: (_: SendTxMessage['payload']) => {
      return Promise.resolve<TxHash>({} as TxHash);
    },
    signAndSendTx: (_: SignAndSendTxMessage['payload']) => {
      return Promise.resolve<TxHash>({} as TxHash);
    },
    getTxMethodArgsLength: (_: GetTxMethodArgsLengthMessage['payload']) => {
      return Promise.resolve(0);
    },
  },
});
