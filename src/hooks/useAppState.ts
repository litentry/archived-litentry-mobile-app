import {useRef, useEffect, useState} from 'react';
import {AppState} from 'react-native';

export function useAppState() {
  const appStateRef = useRef(AppState.currentState);
  const [appState, setAppState] = useState({
    isAppActive: true,
    didAppCameToForeground: false,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      const isNextStateActive = nextAppState === 'active';
      setAppState({
        isAppActive: isNextStateActive,
        didAppCameToForeground: Boolean(appStateRef.current.match(/inactive|background/)) && isNextStateActive,
      });
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
}
