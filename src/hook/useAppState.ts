import {useRef, useEffect, useState} from 'react';
import {AppState} from 'react-native';

export function useAppState() {
  const appStateRef = useRef(AppState.currentState);
  const [appState, setAppState] = useState({
    isActive: false,
    didAppCameToForeground: false,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      const isNextStateActive = nextAppState === 'active';
      setAppState({...appState, isActive: true});
      if (appStateRef.current.match(/inactive|background/) && isNextStateActive) {
        setAppState({...appState, didAppCameToForeground: true});
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return appState;
}
