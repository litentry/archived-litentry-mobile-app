import SecureInfo from 'react-native-sensitive-info';

const IOS = 'litentryKeychain';
const ANDROID = 'litentrySharedPrefs';

const storageConfig = {
  sharedPreferencesName: ANDROID,
  keychainService: IOS,
};

export const setItem = async (key: string, value: string) => SecureInfo.setItem(key, value, storageConfig);

export const getItem = async (key: string) => SecureInfo.getItem(key, storageConfig);

export const deleteItem = async (key: string) => SecureInfo.deleteItem(key, storageConfig);
