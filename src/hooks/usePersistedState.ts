import {useState, useCallback} from 'react';
import {setItem, getItem} from 'src/service/PersistedObjectStorage';
import {createLogger} from 'src/utils/logger';

const logger = createLogger('usePersistedState');

export type PersistedStateKey =
  | 'network'
  | 'accounts'
  | 'activeAccount'
  | 'theme'
  | 'selected_push_topics'
  | 'is_pn_permission_skipped'
  | 'onboarding_seen';

export function usePersistedState<T>(key: PersistedStateKey): [T | undefined, (newState: T) => void];
export function usePersistedState<T>(key: PersistedStateKey, initialState: T): [T, (newState: T) => void];

export function usePersistedState<T>(
  key: PersistedStateKey,
  initialState?: T,
): [state: T | undefined, setState: (data: T) => void] {
  const [state, setState] = useState(() => getItem<T>(key) ?? initialState);

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

  return [state, persistState];
}
