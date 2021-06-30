// eslint-disable-next-line no-restricted-imports
import AsyncStorage from '@react-native-community/async-storage';

export async function getItem<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
  const item = await AsyncStorage.getItem(key);

  if (item !== null) {
    return JSON.parse(item);
  }

  return defaultValue;
}

export async function setItem(key: string, value: unknown) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export const removeItem = (key: string) => AsyncStorage.removeItem(key);
