import {SupportedNetworkType} from 'src/types';

export type MnemonicLength = 12 | 15 | 18 | 21 | 24;

export type WebViewError = {
  isError: boolean;
  message: string;
};

export type AddAccountPayload = {
  mnemonic: string;
  password: string;
  name: string;
  network: SupportedNetworkType;
  isFavorite: boolean;
};

export type AddExternalAccountPayload = {
  address: string;
  name: string;
  isFavorite: boolean;
  network: SupportedNetworkType;
};

export type RestoreAccountPayload = {
  json: Record<string, string>;
  password: string;
  network: SupportedNetworkType;
  isFavorite: boolean;
  isExternal: boolean;
};

export type ExportAccountPayload = {
  address: string;
  password: string;
};

export type Account = {
  address: string;
  encoded: string;
  meta: {
    name: string;
    isFavorite: boolean;
    network: SupportedNetworkType;
    isExternal: boolean;
  };
};

export type Accounts = Record<string, Account>;

export type SignCredentials = {
  address: string;
  password: string;
};
