import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorageKeyType} from 'src/types';

export async function getItem<T>(key: AsyncStorageKeyType, defaultValue: T | null = null): Promise<T | null> {
  const item = await AsyncStorage.getItem(key);

  if (item !== null) {
    return JSON.parse(item);
  }

  return defaultValue;
}

export async function setItem(key: AsyncStorageKeyType, value: unknown) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export const remoteItem = (key: string) => AsyncStorage.removeItem(key);
