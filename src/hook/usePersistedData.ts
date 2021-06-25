import {useState, useEffect, useCallback} from 'react';
import {setItem, getItem} from 'src/service/AsyncStorage';
import {AsyncStorageKeyType} from 'src/types';
import {createLogger} from 'src/utils';

const logger = createLogger('usePersistedData');

export function usePersistedData<T>(
  key: AsyncStorageKeyType,
): [persistedData: T | undefined, persistData: (data: T) => void] {
  const [data, setData] = useState<T>();
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
      } catch (e) {
        logger.error(`Error getting ${key} from AsyncStorage`, e);
      }
    };
    loadPersistedData();
  }, [key]);

  return [data, persistData];
}
