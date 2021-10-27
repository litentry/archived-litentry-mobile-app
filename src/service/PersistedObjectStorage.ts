import {mmkvStorage} from 'src/service/MMKVStorage';

export function getItem<T>(key: string, defaultValue: T | null = null): T | null {
  const item = mmkvStorage.getString(key);

  if (item) {
    return JSON.parse(item);
  }

  return defaultValue;
}

export async function setItem(key: string, value: unknown) {
  return mmkvStorage.set(key, JSON.stringify(value));
}

export const removeItem = (key: string) => mmkvStorage.delete(key);
