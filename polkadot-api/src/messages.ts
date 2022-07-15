import {KeyringPair$Json} from '@polkadot/keyring/types';
import type {SignerPayloadJSON} from '@polkadot/types/types';
import {TxInfo} from './txUtils';
import type {TxConfig, TxHash} from './txTypes';

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

export type TxPayload = SignerPayloadJSON;

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

  SIGN_AND_SEND_TX = 'SIGN_AND_SEND_TX',
  SIGN_AND_SEND_TX_RESULT = 'SIGN_AND_SEND_TX_RESULT',

  GET_TX_INFO = 'GET_TX_INFO',
  GET_TX_INFO_RESULT = 'GET_TX_INFO_RESULT',

  SEND_TX = 'SEND_TX',
  SEND_TX_RESULT = 'SEND_TX_RESULT',

  GET_TX_METHOD_ARGS_LENGTH = 'GET_TX_METHOD_ARGS_LENGTH',
  GET_TX_METHOD_ARGS_LENGTH_RESULT = 'GET_TX_METHOD_ARGS_LENGTH_RESULT',

  DECODE_ADDRESS = 'DECODE_ADDRESS',
  DECODE_ADDRESS_RESULT = 'DECODE_ADDRESS_RESULT',

  CHECK_ADDRESS = 'CHECK_ADDRESS',
  CHECK_ADDRESS_RESULT = 'CHECK_ADDRESS_RESULT',

  GET_TX_PAYLOAD = 'GET_TX_PAYLOAD',
  GET_TX_PAYLOAD_RESULT = 'GET_TX_PAYLOAD_RESULT',

  GET_TX_SIGNABLE_PAYLOAD = 'GET_TX_SIGNABLE_PAYLOAD',
  GET_TX_SIGNABLE_PAYLOAD_RESULT = 'GET_TX_SIGNABLE_PAYLOAD_RESULT',

  BLAKE2_AS_HEX = 'BLAKE2_AS_HEX',
  BLAKE2_AS_HEX_RESULT = 'BLAKE2_AS_HEX_RESULT',
}

type InitStoreMessage = {
  type: MessageType.INIT_STORE;
  payload: {
    key: string;
    value: KeyringAccount;
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
  payload: {
    wsEndpoint: string;
  };
};

type ApiReadyMessage = {
  type: MessageType.API_READY;
  payload: {
    wsEndpoint: string;
  };
};

type ApiDisconnectedMessage = {
  type: MessageType.API_DISCONNECTED;
  payload: {
    wsEndpoint: string;
  };
};

type ApiErrorMessage = {
  type: MessageType.API_ERROR;
  payload: {
    wsEndpoint: string;
    error: string;
  };
};

export type GetTxInfoMessage = {
  type: MessageType.GET_TX_INFO;
  payload: {
    address: string;
    txConfig: TxConfig;
  };
};

export type GetTxInfoResultPayload = {
  txInfo: TxInfo;
  error: false;
};

export type GetTxInfoResultMessage = {
  type: MessageType.GET_TX_INFO_RESULT;
  payload: GetTxInfoResultPayload | ErrorPayload;
};

export type GetTxPayloadMessage = {
  type: MessageType.GET_TX_PAYLOAD;
  payload: {
    address: string;
    txConfig: TxConfig;
  };
};

export type TxPayloadData = {txPayload: TxPayload; signablePayload: HexString};

export type GetTxPayloadResultPayload = TxPayloadData & {
  error: false;
};

export type GetTxPayloadResultMessage = {
  type: MessageType.GET_TX_PAYLOAD_RESULT;
  payload: GetTxPayloadResultPayload | ErrorPayload;
};

export type TxSuccessful = {
  txHash: TxHash;
  error: false;
};

export type SendTxMessage = {
  type: MessageType.SEND_TX;
  payload: {
    address: string;
    txConfig: TxConfig;
    txPayload: TxPayload;
    signature: HexString;
  };
};

export type SendTxResultMessage = {
  type: MessageType.SEND_TX_RESULT;
  payload: TxSuccessful | ErrorPayload;
};

export type SignAndSendTxMessage = {
  type: MessageType.SIGN_AND_SEND_TX;
  payload: {
    txConfig: TxConfig;
    credentials: SignCredentials;
  };
};

export type SignAndSendTxResultMessage = {
  type: MessageType.SIGN_AND_SEND_TX_RESULT;
  payload: TxSuccessful | ErrorPayload;
};

export type GetTxMethodArgsLengthMessage = {
  type: MessageType.GET_TX_METHOD_ARGS_LENGTH;
  payload: TxConfig['method'];
};

export type GetTxMethodArgsLengthResultMessage = {
  type: MessageType.GET_TX_METHOD_ARGS_LENGTH_RESULT;
  payload: number;
};

export type DecodeAddressMessage = {
  type: MessageType.DECODE_ADDRESS;
  payload: {
    encoded: HexString | string | null;
    ignoreChecksum?: boolean;
    ss58Format?: number;
  };
};

export type DecodeAddressResultMessage = {
  type: MessageType.DECODE_ADDRESS_RESULT;
  payload: HexString;
};

export type Blake2AsHexMessage = {
  type: MessageType.BLAKE2_AS_HEX;
  payload: {
    data: string;
    bitLength?: 256 | 512 | 64 | 128 | 384;
  };
};

export type Blake2AsHexResultMessage = {
  type: MessageType.BLAKE2_AS_HEX_RESULT;
  payload: HexString;
};

export type CheckAddressMessage = {
  type: MessageType.CHECK_ADDRESS;
  payload: {
    address: HexString | string;
    prefix: number;
  };
};

type ValidAddressPayload = {
  isValid: true;
};

type InvalidAddressPayload = {
  isValid: false;
  reason: string;
};

export type CheckAddressResultMessage = {
  type: MessageType.CHECK_ADDRESS_RESULT;
  payload: ValidAddressPayload | InvalidAddressPayload;
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
  | SignAndSendTxMessage
  | SignAndSendTxResultMessage
  | InitApiMessage
  | ReconnectApiMessage
  | ApiConnectedMessage
  | ApiReadyMessage
  | ApiDisconnectedMessage
  | ApiErrorMessage
  | GetTxInfoMessage
  | GetTxInfoResultMessage
  | SendTxMessage
  | SendTxResultMessage
  | GetTxMethodArgsLengthMessage
  | GetTxMethodArgsLengthResultMessage
  | DecodeAddressMessage
  | DecodeAddressResultMessage
  | Blake2AsHexMessage
  | Blake2AsHexResultMessage
  | CheckAddressMessage
  | CheckAddressResultMessage
  | GetTxPayloadMessage
  | GetTxPayloadResultMessage;

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

export function apiConnectedMessage(payload: ApiConnectedMessage['payload']): ApiConnectedMessage {
  return {
    type: MessageType.API_CONNECTED,
    payload,
  };
}

export function apiReadyMessage(payload: ApiReadyMessage['payload']): ApiReadyMessage {
  return {
    type: MessageType.API_READY,
    payload,
  };
}

export function apiDisconnectedMessage(payload: ApiDisconnectedMessage['payload']): ApiDisconnectedMessage {
  return {
    type: MessageType.API_DISCONNECTED,
    payload,
  };
}

export function apiErrorMessage(payload: ApiErrorMessage['payload']): ApiErrorMessage {
  return {
    type: MessageType.API_ERROR,
    payload,
  };
}

export function getTxInfoMessage(payload: GetTxInfoMessage['payload']): GetTxInfoMessage {
  return {
    type: MessageType.GET_TX_INFO,
    payload,
  };
}

export function getTxInfoResultMessage(payload: GetTxInfoResultMessage['payload']): GetTxInfoResultMessage {
  return {
    type: MessageType.GET_TX_INFO_RESULT,
    payload,
  };
}

export function sendTxMessage(payload: SendTxMessage['payload']): SendTxMessage {
  return {
    type: MessageType.SEND_TX,
    payload,
  };
}

export function sendTxResultMessage(payload: SendTxResultMessage['payload']): SendTxResultMessage {
  return {
    type: MessageType.SEND_TX_RESULT,
    payload,
  };
}

export function signAndSendTxMessage(payload: SignAndSendTxMessage['payload']): SignAndSendTxMessage {
  return {
    type: MessageType.SIGN_AND_SEND_TX,
    payload,
  };
}

export function signAndSendTxResultMessage(payload: SignAndSendTxResultMessage['payload']): SignAndSendTxResultMessage {
  return {
    type: MessageType.SIGN_AND_SEND_TX_RESULT,
    payload,
  };
}

export function getTxMethodArgsLengthMessage(
  payload: GetTxMethodArgsLengthMessage['payload'],
): GetTxMethodArgsLengthMessage {
  return {
    type: MessageType.GET_TX_METHOD_ARGS_LENGTH,
    payload,
  };
}

export function getTxMethodArgsLengthResultMessage(
  payload: GetTxMethodArgsLengthResultMessage['payload'],
): GetTxMethodArgsLengthResultMessage {
  return {
    type: MessageType.GET_TX_METHOD_ARGS_LENGTH_RESULT,
    payload,
  };
}

export function decodeAddressMessage(payload: DecodeAddressMessage['payload']): DecodeAddressMessage {
  return {
    type: MessageType.DECODE_ADDRESS,
    payload,
  };
}

export function decodeAddressResultMessage(payload: DecodeAddressResultMessage['payload']): DecodeAddressResultMessage {
  return {
    type: MessageType.DECODE_ADDRESS_RESULT,
    payload,
  };
}

export function blake2AsHexMessage(payload: Blake2AsHexMessage['payload']): Blake2AsHexMessage {
  return {
    type: MessageType.BLAKE2_AS_HEX,
    payload,
  };
}

export function blake2AsHexResultMessage(payload: Blake2AsHexResultMessage['payload']): Blake2AsHexResultMessage {
  return {
    type: MessageType.BLAKE2_AS_HEX_RESULT,
    payload,
  };
}

export function checkAddressMessage(payload: CheckAddressMessage['payload']): CheckAddressMessage {
  return {
    type: MessageType.CHECK_ADDRESS,
    payload,
  };
}

export function checkAddressResultMessage(payload: CheckAddressResultMessage['payload']): CheckAddressResultMessage {
  return {
    type: MessageType.CHECK_ADDRESS_RESULT,
    payload,
  };
}

export function getTxPayloadMessage(payload: GetTxPayloadMessage['payload']): GetTxPayloadMessage {
  return {
    type: MessageType.GET_TX_PAYLOAD,
    payload,
  };
}

export function getTxPayloadResultMessage(payload: GetTxPayloadResultMessage['payload']): GetTxPayloadResultMessage {
  return {
    type: MessageType.GET_TX_PAYLOAD_RESULT,
    payload,
  };
}
