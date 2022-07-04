import {KeyringPair$Json} from '@polkadot/keyring/types';

export type AccountMeta = {
  name: string;
  network: string;
  isFavorite: boolean;
  isExternal: boolean;
};

export type KeyringAccount = KeyringPair$Json & {
  meta: AccountMeta;
};

export type HexString = `0x${string}`;

export type MnemonicLength = 12 | 15 | 18 | 21 | 24;

export type ErrorPayload = {
  error: true;
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

  UPDATE_ACCOUNT_META = 'UPDATE_ACCOUNT_META',
  UPDATE_ACCOUNT_META_RESULT = 'UPDATE_ACCOUNT_META_RESULT',

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

export type GenerateMnemonicMessage = {
  type: MessageType.GENERATE_MNEMONIC;
  payload: {
    length?: MnemonicLength;
  };
};

export type GenerateMnemonicResultMessage = {
  type: MessageType.GENERATE_MNEMONIC_RESULT;
  payload: {
    mnemonic: string;
  };
};

export type ValidateMnemonicMessage = {
  type: MessageType.VALIDATE_MNEMONIC;
  payload: {
    mnemonic: string;
  };
};

export type ValidateMnemonicResultMessage = {
  type: MessageType.VALIDATE_MNEMONIC_RESULT;
  payload: {
    isValid: boolean;
    address: string;
  };
};

export type CreateAddressFromMnemonicMessage = {
  type: MessageType.CREATE_ADDRESS_FROM_MNEMONIC;
  payload: {
    mnemonic: string;
  };
};

export type CreateAddressFromMnemonicResultMessage = {
  type: MessageType.CREATE_ADDRESS_FROM_MNEMONIC_RESULT;
  payload: {
    address: string;
  };
};

export type AddAccountMessage = {
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

export type AddAccountResultMessage = {
  type: MessageType.ADD_ACCOUNT_RESULT;
  payload: {
    account: KeyringAccount;
  };
};

export type RestoreAccountMessage = {
  type: MessageType.RESTORE_ACCOUNT;
  payload: {
    json: KeyringAccount;
    password: string;
    network: string;
  };
};

export type KeyringAccountPayload = {
  account: KeyringAccount;
  error: false;
};

export type RestoreAccountResultMessage = {
  type: MessageType.RESTORE_ACCOUNT_RESULT;
  payload: KeyringAccountPayload | ErrorPayload;
};

export type ExportAccountMessage = {
  type: MessageType.EXPORT_ACCOUNT;
  payload: {
    address: string;
    password: string;
  };
};

export type ExportAccountResultMessage = {
  type: MessageType.EXPORT_ACCOUNT_RESULT;
  payload: KeyringAccountPayload | ErrorPayload;
};

export type AddExternalAccountMessage = {
  type: MessageType.ADD_EXTERNAL_ACCOUNT;
  payload: {
    address: string;
    name: string;
    network: string;
  };
};

export type AddExternalAccountResultMessage = {
  type: MessageType.ADD_EXTERNAL_ACCOUNT_RESULT;
  payload: {
    account: KeyringAccount;
  };
};

export type ForgetAccountMessage = {
  type: MessageType.FORGET_ACCOUNT;
  payload: {
    address: string;
  };
};

export type ForgetAccountResultMessage = {
  type: MessageType.FORGET_ACCOUNT_RESULT;
  payload: {
    address: string;
  };
};

export type UpdateAccountMetaMessage = {
  type: MessageType.UPDATE_ACCOUNT_META;
  payload: {
    address: string;
    meta: AccountMeta;
  };
};

export type UpdateAccountMetaResultMessage = {
  type: MessageType.UPDATE_ACCOUNT_META_RESULT;
  payload: {
    address: string;
    meta: AccountMeta;
  };
};

export type VerifyCredentialsMessage = {
  type: MessageType.VERIFY_CREDENTIALS;
  payload: {
    address: string;
    password: string;
  };
};

export type VerifyCredentialsResultMessage = {
  type: MessageType.VERIFY_CREDENTIALS_RESULT;
  payload: {
    valid: boolean;
  };
};

export type SignMessage = {
  type: MessageType.SIGN;
  payload: {
    message: string;
    credentials: SignCredentials;
  };
};

export type SignResultPayload = {
  signed: HexString;
  error: false;
};

export type SignResultMessage = {
  type: MessageType.SIGN_RESULT;
  payload: SignResultPayload | ErrorPayload;
};

type InitApiMessage = {
  type: MessageType.INIT_API;
  payload: {
    wsEndpoint: string;
  };
};

type ReconnectApiMessage = {
  type: MessageType.RECONNECT_API;
  payload: {
    wsEndpoint: string;
  };
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
  | UpdateAccountMetaMessage
  | UpdateAccountMetaResultMessage
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

export function updateAccountMetaMessage(payload: UpdateAccountMetaMessage['payload']): UpdateAccountMetaMessage {
  return {
    type: MessageType.UPDATE_ACCOUNT_META,
    payload,
  };
}

export function updateAccountMetaResultMessage(
  payload: UpdateAccountMetaResultMessage['payload'],
): UpdateAccountMetaResultMessage {
  return {
    type: MessageType.UPDATE_ACCOUNT_META_RESULT,
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

export function reconnectApiMessage(payload: ReconnectApiMessage['payload']): ReconnectApiMessage {
  return {
    type: MessageType.RECONNECT_API,
    payload,
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