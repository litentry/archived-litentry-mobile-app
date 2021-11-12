import {useRef, useEffect, useState} from 'react';
import {AppState} from 'react-native';

export function useAppState() {
  const appState = useRef(AppState.currentState);
  const [isActive, setIsActive] = useState(false);
  const [didAppCameToForeground, setDidAppCameToForeground] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      const isNextStateActive = nextAppState === 'active';
      setIsActive(isNextStateActive);

      if (appState.current.match(/inactive|background/) && isNextStateActive) {
        setDidAppCameToForeground(true);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    isActive,
    didAppCameToForeground,
    setDidAppCameToForeground,
  };
}
