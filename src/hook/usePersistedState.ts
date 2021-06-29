import {useState, useEffect, useCallback} from 'react';
import {setItem, getItem} from 'src/service/AsyncStorage';
import {createLogger} from 'src/utils';

const logger = createLogger('usePersistedState');

export type PersistedStateKey = 'network' | 'accounts' | 'theme' | 'selected_push_topics';

export function usePersistedState<T>(key: PersistedStateKey): [state: T | undefined, setState: (data: T) => void];
export function usePersistedState<T>(key: PersistedStateKey, initialState: T): [state: T, setState: (data: T) => void];

export function usePersistedState<T>(
  key: PersistedStateKey,
  initialState?: T,
): [state: T | undefined, setState: (data: T) => void] {
  const [state, setState] = useState(initialState);
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
        }
      } catch (e) {
        logger.error(`Error getting ${key} from AsyncStorage`, e);
      }
    };
    getPersistedState();
  }, [key]);

  return [state, persistState];
}
