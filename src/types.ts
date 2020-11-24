export type ThemeType = 'light' | 'dark';

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
  ws: string;
  isTestnet?: boolean;
  color: string;
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

export type HapticFeedbackType = 'success' | 'warn' | 'error';
