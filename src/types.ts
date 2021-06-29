import {DeriveAccountRegistration} from '@polkadot/api-derive/types';
import {Registration} from '@polkadot/types/interfaces';
import {BarCodeReadEvent} from 'react-native-camera';

export type SupportedNetworkType = 'ethereum' | 'polkadot' | 'kusama' | 'litentry_test';

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
  key: SupportedNetworkType;
  ws: string[];
  isTestnet?: boolean;
  color?: string;
};

export type NetworkContextValueType = {
  currentNetwork: NetworkType;
  availableNetworks: NetworkType[];
  select: (network: NetworkType) => void;
};

export interface QRScannedPayload extends BarCodeReadEvent {
  bounds: {
    origin: {x: string; y: string};
    size: {height: string; width: string};
  };
  data: string;
  rawData: string;
}

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
