import keyring from '@polkadot/ui-keyring';
import {KeyringPair$Json, KeyringPair$Meta} from '@polkadot/keyring/types';

type KeyringAccount = ReturnType<typeof keyring.getAccount>;

type KeyringAccounts = ReturnType<typeof keyring.getAccounts>;

type HexString = `0x${string}`;

type ErrorPayload = {
  isError: true;
  message: string;
};

export type SignCredentials = {
  address: string;
  password: string;
};

export enum MessageType {
  INIT_STORE = 'INIT_STORE',

  INIT_KEYRING = 'INIT_KEYRING',

  SET_SS58_FORMAT = 'SET_SS58_FORMAT',

  GENERATE_MNEMONIC = 'GENERATE_MNEMONIC',
  GENERATE_MNEMONIC_RESULT = 'GENERATE_MNEMONIC_RESULT',

  VALIDATE_MNEMONIC = 'VALIDATE_MNEMONIC',
  VALIDATE_MNEMONIC_RESULT = 'VALIDATE_MNEMONIC_RESULT',

  GET_ACCOUNTS = 'GET_ACCOUNTS',
  GET_ACCOUNTS_RESULT = 'GET_ACCOUNTS_RESULT',

  GET_ACCOUNT = 'GET_ACCOUNT',
  GET_ACCOUNT_RESULT = 'GET_ACCOUNT_RESULT',

  CREATE_ADDRESS_FROM_MNEMONIC = 'CREATE_ADDRESS_FROM_MNEMONIC',
  CREATE_ADDRESS_FROM_MNEMONIC_RESULT = 'CREATE_ADDRESS_FROM_MNEMONIC_RESULT',

  ADD_ACCOUNT = 'ADD_ACCOUNT',
  ADD_ACCOUNT_RESULT = 'ADD_ACCOUNT_RESULT',

  RESTORE_ACCOUNT = 'RESTORE_ACCOUNT',
  RESTORE_ACCOUNT_RESULT = 'RESTORE_ACCOUNT_RESULT',

  EXPORT_ACCOUNT = 'EXPORT_ACCOUNT',
  EXPORT_ACCOUNT_RESULT = 'EXPORT_ACCOUNT_RESULT',

  ADD_EXTERNAL_ACCOUNT = 'ADD_EXTERNAL_ACCOUNT',
  ADD_EXTERNAL_ACCOUNT_RESULT = 'ADD_EXTERNAL_ACCOUNT_RESULT',

  FORGET_ACCOUNT = 'FORGET_ACCOUNT',
  FORGET_ACCOUNT_RESULT = 'FORGET_ACCOUNT_RESULT',

  UPDATE_META = 'UPDATE_META',
  UPDATE_META_RESULT = 'UPDATE_META_RESULT',

  VERIFY_CREDENTIALS = 'VERIFY_CREDENTIALS',
  VERIFY_CREDENTIALS_RESULT = 'VERIFY_CREDENTIALS_RESULT',

  SIGN = 'SIGN',
  SIGN_RESULT = 'SIGN_RESULT',

  INIT_API = 'INIT_API',

  RECONNECT_API = 'RECONNECT_API',

  API_CONNECTED = 'API_CONNECTED',

  API_READY = 'API_READY',

  API_DISCONNECTED = 'API_DISCONNECTED',

  API_ERROR = 'API_ERROR',
}

type InitStoreMessage = {
  type: MessageType.INIT_STORE;
  payload: {
    key: string;
    value: unknown;
  };
};

type InitKeyringMessage = {
  type: MessageType.INIT_KEYRING;
};

type SetSS58FormatMessage = {
  type: MessageType.SET_SS58_FORMAT;
  payload: {
    ss58Format: number;
  };
};

type GenerateMnemonicMessage = {
  type: MessageType.GENERATE_MNEMONIC;
  payload: {
    numOfWords?: 12 | 15 | 18 | 21 | 24;
  };
};

type GenerateMnemonicResultMessage = {
  type: MessageType.GENERATE_MNEMONIC_RESULT;
  payload: {
    mnemonic: string;
  };
};

type ValidateMnemonicMessage = {
  type: MessageType.VALIDATE_MNEMONIC;
  payload: {
    mnemonic: string;
  };
};

type ValidateMnemonicResultMessage = {
  type: MessageType.VALIDATE_MNEMONIC_RESULT;
  payload: {
    isValid: boolean;
  };
};

type GetAccountsMessage = {
  type: MessageType.GET_ACCOUNTS;
};

type GetAccountsResultMessage = {
  type: MessageType.GET_ACCOUNTS_RESULT;
  payload: {
    accounts: KeyringAccounts;
  };
};

type GetAccountMessage = {
  type: MessageType.GET_ACCOUNT;
  payload: {
    address: string;
  };
};

type GetAccountResultMessage = {
  type: MessageType.GET_ACCOUNT_RESULT;
  payload: {
    account: KeyringAccount;
  };
};

type CreateAddressFromMnemonicMessage = {
  type: MessageType.CREATE_ADDRESS_FROM_MNEMONIC;
  payload: {
    mnemonic: string;
  };
};

type CreateAddressFromMnemonicResultMessage = {
  type: MessageType.CREATE_ADDRESS_FROM_MNEMONIC_RESULT;
  payload: {
    address: string;
  };
};

type AddAccountMessage = {
  type: MessageType.ADD_ACCOUNT;
  payload: {
    mnemonic: string;
    password: string;
    name: string;
    network: string;
    isFavorite: boolean;
    isExternal: boolean;
  };
};

type AddAccountResultMessage = {
  type: MessageType.ADD_ACCOUNT_RESULT;
  payload: {
    account: KeyringPair$Json;
  };
};

type RestoreAccountMessage = {
  type: MessageType.RESTORE_ACCOUNT;
  payload: {
    json: KeyringPair$Json;
    password: string;
    network: string;
  };
};

type RestoreAccountResultMessage = {
  type: MessageType.RESTORE_ACCOUNT_RESULT;
  payload: {
    account: KeyringPair$Json;
  };
};

type ExportAccountMessage = {
  type: MessageType.EXPORT_ACCOUNT;
  payload: {
    address: string;
    password: string;
  };
};

type ExportAccountResultMessage =
  | {
      type: MessageType.EXPORT_ACCOUNT_RESULT;
      payload: {
        account: KeyringPair$Json;
      };
    }
  | {
      type: MessageType.EXPORT_ACCOUNT_RESULT;
      payload: ErrorPayload;
    };

type AddExternalAccountMessage = {
  type: MessageType.ADD_EXTERNAL_ACCOUNT;
  payload: {
    address: string;
    name: string;
    network: string;
  };
};

type AddExternalAccountResultMessage = {
  type: MessageType.ADD_EXTERNAL_ACCOUNT_RESULT;
  payload: {
    account: KeyringPair$Json;
  };
};

type ForgetAccountMessage = {
  type: MessageType.FORGET_ACCOUNT;
  payload: {
    address: string;
  };
};

type ForgetAccountResultMessage = {
  type: MessageType.FORGET_ACCOUNT_RESULT;
  payload: {
    address: string;
  };
};

type UpdateMetaMessage = {
  type: MessageType.UPDATE_META;
  payload: {
    address: string;
    meta: KeyringPair$Meta;
  };
};

type UpdateMetaResultMessage = {
  type: MessageType.UPDATE_META_RESULT;
  payload: {
    address: string;
    meta: KeyringPair$Meta;
  };
};

type VerifyCredentialsMessage = {
  type: MessageType.VERIFY_CREDENTIALS;
  payload: {
    address: string;
    password: string;
  };
};

type VerifyCredentialsResultMessage = {
  type: MessageType.VERIFY_CREDENTIALS_RESULT;
  payload: {
    valid: boolean;
  };
};

type SignMessage = {
  type: MessageType.SIGN;
  payload: {
    message: string;
    credentials: SignCredentials;
  };
};

type SignResultMessage =
  | {
      type: MessageType.SIGN_RESULT;
      payload: {
        signed: HexString;
      };
    }
  | {
      type: MessageType.SIGN_RESULT;
      payload: ErrorPayload;
    };

type InitApiMessage = {
  type: MessageType.INIT_API;
  payload: {
    wsEndpoint: string;
  };
};

type ReconnectApiMessage = {
  type: MessageType.RECONNECT_API;
};

type ApiConnectedMessage = {
  type: MessageType.API_CONNECTED;
};

type ApiReadyMessage = {
  type: MessageType.API_READY;
};

type ApiDisconnectedMessage = {
  type: MessageType.API_DISCONNECTED;
};

type ApiErrorMessage = {
  type: MessageType.API_ERROR;
  payload: {
    error: string;
  };
};

export type Message =
  | InitStoreMessage
  | InitKeyringMessage
  | SetSS58FormatMessage
  | GenerateMnemonicMessage
  | GenerateMnemonicResultMessage
  | ValidateMnemonicMessage
  | ValidateMnemonicResultMessage
  | GetAccountsMessage
  | GetAccountsResultMessage
  | GetAccountMessage
  | GetAccountResultMessage
  | CreateAddressFromMnemonicMessage
  | CreateAddressFromMnemonicResultMessage
  | AddAccountMessage
  | AddAccountResultMessage
  | RestoreAccountMessage
  | RestoreAccountResultMessage
  | ExportAccountMessage
  | ExportAccountResultMessage
  | AddExternalAccountMessage
  | AddExternalAccountResultMessage
  | ForgetAccountMessage
  | ForgetAccountResultMessage
  | UpdateMetaMessage
  | UpdateMetaResultMessage
  | VerifyCredentialsMessage
  | VerifyCredentialsResultMessage
  | SignMessage
  | SignResultMessage
  | InitApiMessage
  | ReconnectApiMessage
  | ApiConnectedMessage
  | ApiReadyMessage
  | ApiDisconnectedMessage
  | ApiErrorMessage;

export function initStoreMessage(payload: InitStoreMessage['payload']): InitStoreMessage {
  return {
    type: MessageType.INIT_STORE,
    payload,
  };
}

export function initKeyringMessage(): InitKeyringMessage {
  return {
    type: MessageType.INIT_KEYRING,
  };
}

export function setSS58FormatMessage(payload: SetSS58FormatMessage['payload']): SetSS58FormatMessage {
  return {
    type: MessageType.SET_SS58_FORMAT,
    payload,
  };
}

export function generateMnemonicMessage(payload: GenerateMnemonicMessage['payload']): GenerateMnemonicMessage {
  return {
    type: MessageType.GENERATE_MNEMONIC,
    payload,
  };
}

export function generateMnemonicResultMessage(
  payload: GenerateMnemonicResultMessage['payload'],
): GenerateMnemonicResultMessage {
  return {
    type: MessageType.GENERATE_MNEMONIC_RESULT,
    payload,
  };
}

export function validateMnemonicMessage(payload: ValidateMnemonicMessage['payload']): ValidateMnemonicMessage {
  return {
    type: MessageType.VALIDATE_MNEMONIC,
    payload,
  };
}

export function validateMnemonicResultMessage(
  payload: ValidateMnemonicResultMessage['payload'],
): ValidateMnemonicResultMessage {
  return {
    type: MessageType.VALIDATE_MNEMONIC_RESULT,
    payload,
  };
}

export function getAccountsMessage(): GetAccountsMessage {
  return {
    type: MessageType.GET_ACCOUNTS,
  };
}

export function getAccountsResultMessage(payload: GetAccountsResultMessage['payload']): GetAccountsResultMessage {
  return {
    type: MessageType.GET_ACCOUNTS_RESULT,
    payload,
  };
}

export function getAccountMessage(payload: GetAccountMessage['payload']): GetAccountMessage {
  return {
    type: MessageType.GET_ACCOUNT,
    payload,
  };
}

export function getAccountResultMessage(payload: GetAccountResultMessage['payload']): GetAccountResultMessage {
  return {
    type: MessageType.GET_ACCOUNT_RESULT,
    payload,
  };
}

export function createAddressFromMnemonicMessage(
  payload: CreateAddressFromMnemonicMessage['payload'],
): CreateAddressFromMnemonicMessage {
  return {
    type: MessageType.CREATE_ADDRESS_FROM_MNEMONIC,
    payload,
  };
}

export function createAddressFromMnemonicResultMessage(
  payload: CreateAddressFromMnemonicResultMessage['payload'],
): CreateAddressFromMnemonicResultMessage {
  return {
    type: MessageType.CREATE_ADDRESS_FROM_MNEMONIC_RESULT,
    payload,
  };
}

export function addAccountMessage(payload: AddAccountMessage['payload']): AddAccountMessage {
  return {
    type: MessageType.ADD_ACCOUNT,
    payload,
  };
}

export function addAccountResultMessage(payload: AddAccountResultMessage['payload']): AddAccountResultMessage {
  return {
    type: MessageType.ADD_ACCOUNT_RESULT,
    payload,
  };
}

export function restoreAccountMessage(payload: RestoreAccountMessage['payload']): RestoreAccountMessage {
  return {
    type: MessageType.RESTORE_ACCOUNT,
    payload,
  };
}

export function restoreAccountResultMessage(
  payload: RestoreAccountResultMessage['payload'],
): RestoreAccountResultMessage {
  return {
    type: MessageType.RESTORE_ACCOUNT_RESULT,
    payload,
  };
}

export function exportAccountMessage(payload: ExportAccountMessage['payload']): ExportAccountMessage {
  return {
    type: MessageType.EXPORT_ACCOUNT,
    payload,
  };
}

export function exportAccountResultMessage(payload: ExportAccountResultMessage['payload']): ExportAccountResultMessage {
  if ('isError' in payload) {
    return {
      type: MessageType.EXPORT_ACCOUNT_RESULT,
      payload: {
        isError: true,
        message: payload.message,
      },
    };
  }
  return {
    type: MessageType.EXPORT_ACCOUNT_RESULT,
    payload,
  };
}

export function addExternalAccountMessage(payload: AddExternalAccountMessage['payload']): AddExternalAccountMessage {
  return {
    type: MessageType.ADD_EXTERNAL_ACCOUNT,
    payload,
  };
}

export function addExternalAccountResultMessage(
  payload: AddExternalAccountResultMessage['payload'],
): AddExternalAccountResultMessage {
  return {
    type: MessageType.ADD_EXTERNAL_ACCOUNT_RESULT,
    payload,
  };
}

export function forgetAccountMessage(payload: ForgetAccountMessage['payload']): ForgetAccountMessage {
  return {
    type: MessageType.FORGET_ACCOUNT,
    payload,
  };
}

export function forgetAccountResultMessage(payload: ForgetAccountResultMessage['payload']): ForgetAccountResultMessage {
  return {
    type: MessageType.FORGET_ACCOUNT_RESULT,
    payload,
  };
}

export function updateMetaMessage(payload: UpdateMetaMessage['payload']): UpdateMetaMessage {
  return {
    type: MessageType.UPDATE_META,
    payload,
  };
}

export function updateMetaResultMessage(payload: UpdateMetaResultMessage['payload']): UpdateMetaResultMessage {
  return {
    type: MessageType.UPDATE_META_RESULT,
    payload,
  };
}

export function verifyCredentialsMessage(payload: VerifyCredentialsMessage['payload']): VerifyCredentialsMessage {
  return {
    type: MessageType.VERIFY_CREDENTIALS,
    payload,
  };
}

export function verifyCredentialsResultMessage(
  payload: VerifyCredentialsResultMessage['payload'],
): VerifyCredentialsResultMessage {
  return {
    type: MessageType.VERIFY_CREDENTIALS_RESULT,
    payload,
  };
}

export function signMessageMessage(payload: SignMessage['payload']): SignMessage {
  return {
    type: MessageType.SIGN,
    payload,
  };
}

export function signMessageResultMessage(payload: SignResultMessage['payload']): SignResultMessage {
  if ('isError' in payload) {
    return {
      type: MessageType.SIGN_RESULT,
      payload: {
        isError: true,
        message: payload.message,
      },
    };
  }

  return {
    type: MessageType.SIGN_RESULT,
    payload,
  };
}

export function initApiMessage(payload: InitApiMessage['payload']): InitApiMessage {
  return {
    type: MessageType.INIT_API,
    payload,
  };
}

export function reconnectApiMessage(): ReconnectApiMessage {
  return {
    type: MessageType.RECONNECT_API,
  };
}

export function apiConnectedMessage(): ApiConnectedMessage {
  return {
    type: MessageType.API_CONNECTED,
  };
}

export function ApiReadyMessage(): ApiReadyMessage {
  return {
    type: MessageType.API_READY,
  };
}

export function ApiDisconnectedMessage(): ApiDisconnectedMessage {
  return {
    type: MessageType.API_DISCONNECTED,
  };
}

export function ApiErrorMessage(payload: ApiErrorMessage['payload']): ApiErrorMessage {
  return {
    type: MessageType.API_ERROR,
    payload,
  };
}
