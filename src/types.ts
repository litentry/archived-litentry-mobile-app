import {DeriveAccountRegistration} from '@polkadot/api-derive/types';
import {Registration} from '@polkadot/types/interfaces';
export type ThemeType = 'light' | 'dark';

export type SupportedNetworkType = 'ethereum' | 'polkadot' | 'kusama' | 'litentry_test';

export type ThemeContextValueType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export type DeviceType = {
  firebase_token: string;
  device_model: string;
  device_identifier: string;
  owner: number;
  notifications_enabled: boolean;
  operating_system: number;
  operating_system_version: string;
  app_version: string;
  app_bundle_id: string;
};

export type NetworkType = {
  name: string;
  key?: SupportedNetworkType | null;
  ws?: string[];
  isTestnet?: boolean;
  color?: string;
};

export type NetworkContextValueType = {
  currentNetwork?: NetworkType;
  availableNetworks: NetworkType[];
  select: (network: NetworkType) => void;
};

export type AsyncStorageKeyType = 'network';

export type DataContextValueType = {
  asyncStorage: {
    get: <T>(key: AsyncStorageKeyType, defaultValue: T) => Promise<T>;
    set: (key: AsyncStorageKeyType, value: string) => Promise<void>;
  };
};

export type QRScannedPayload = {
  bounds: {
    origin: {x: string; y: string};
    size: {height: string; width: string};
  };
  data: string;
  rawData: string;
  target: number;
  type: string;
};

export type AccountAddressType = {
  address: string;
  protocol?: string;
  name: string;
};

export type AddressDetailType =
  | {network: 'ethereum'; data: null}
  | {
      network: 'polkadot' | 'kusama' | 'litentry_test';
      data?: Registration;
    };

export type HapticFeedbackType = 'success' | 'warn' | 'error';

// Polkadot specific
export interface AddressIdentity extends DeriveAccountRegistration {
  isGood: boolean;
  isBad: boolean;
  isKnownGood: boolean;
  isReasonable: boolean;
  isErroneous: boolean;
  isLowQuality: boolean;
  isExistent: boolean;
  waitCount: number;
}

export type IdentityInfo = {
  display: {raw: string} | {none: null};
  legal: {raw: string} | {none: null};
  email: {raw: string} | {none: null};
  riot: {raw: string} | {none: null};
  twitter: {raw: string} | {none: null};
  web: {raw: string} | {none: null};
};
