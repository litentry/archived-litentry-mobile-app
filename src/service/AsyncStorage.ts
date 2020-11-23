import AsyncStorage from '@react-native-community/async-storage';

export const setItem = async (key: string, value: string) =>
  AsyncStorage.setItem(key, value);

export const getItem = async (key: string) => AsyncStorage.getItem(key);

export const deleteItem = async (key: string) => AsyncStorage.removeItem(key);
