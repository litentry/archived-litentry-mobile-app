import {useState, useEffect, useCallback} from 'react';
import {setItem, getItem} from 'src/service/AsyncStorage';
import {createLogger} from 'src/utils';

const logger = createLogger('usePersistedState');

export type PersistedStateKey = 'network' | 'accounts' | 'theme' | 'selected_push_topics';

export function usePersistedState<T>(
  key: PersistedStateKey,
  fallback?: T,
): [state: T | undefined, setState: (data: T) => void] {
  const [state, setState] = useState<T>();
  const persistState = useCallback(
    (newState: T) => {
      try {
        setState(newState);
        setItem(key, newState);
      } catch (e) {
        logger.error(`Error setting ${key} to AsyncStorage`, e);
      }
    },
    [key],
  );

  useEffect(() => {
    const getPersistedState = async () => {
      try {
        const persistedState = await getItem<T>(key);
        if (persistedState) {
          setState(persistedState);
        } else if (fallback) {
          setState(fallback);
        }
      } catch (e) {
        logger.error(`Error getting ${key} from AsyncStorage`, e);
      }
    };
    getPersistedState();
  }, [key, fallback]);

  return [state, persistState];
}
