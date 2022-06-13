import {SupportedNetworkType} from 'src/types';

export type AddAccountPayload = {
  mnemonic: string;
  password: string;
  name: string;
  network: SupportedNetworkType;
  isFavorite: boolean;
  isExternal: boolean;
};

export type AddExternalAccountPayload = {
  address: string;
  isFavorite: boolean;
  network: SupportedNetworkType;
};

export type InternalAccount = {
  encoded: string;
  address: string;
  meta: {
    name: string;
    isFavorite: boolean;
    network: SupportedNetworkType;
  };
  isExternal: false;
};

export type ExternalAccount = {
  address: string;
  meta: {
    name: string;
    isFavorite: boolean;
    network: SupportedNetworkType;
  };
  isExternal: true;
};

export type Account = InternalAccount | ExternalAccount;

export type Accounts = Record<string, Account>;
