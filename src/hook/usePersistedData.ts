import {useState, useEffect, useCallback} from 'react';
import {setItem, getItem} from 'src/service/AsyncStorage';
import {AsyncStorageKeyType} from 'src/types';
import {createLogger} from 'src/utils';

const logger = createLogger('usePersistedData');

export function usePersistedData<T>(key: AsyncStorageKeyType) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const persistData = useCallback(
    (data: T) => {
      try {
        setItem(key, data);
      } catch (e) {
        logger.error(`Error setting ${key} to AsyncStorage`, e);
      }
    },
    [key],
  );

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const persistedData = await getItem<T>(key);
        if (persistedData) {
          setData(persistedData);
        }
        setIsLoading(false);
      } catch (e) {
        logger.error(`Error getting ${key} from AsyncStorage`, e);
      }
    };
    loadPersistedData();
  }, [key]);

  return {
    data,
    persistData,
    isLoading,
  };
}
