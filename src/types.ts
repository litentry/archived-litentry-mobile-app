import {Registration} from '@polkadot/types/interfaces';

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

export type AccountAddressType = {
  address: string;
  protocol?: string;
  name: string;
};

export type AddressDetailType =
  | {network: 'ethereum'; data: null}
  | {
      network: 'polkadot' | 'kusama' | 'litentry_test' | 'litmus';
      data?: Registration;
    };

export type HapticFeedbackType = 'success' | 'warn' | 'error';
