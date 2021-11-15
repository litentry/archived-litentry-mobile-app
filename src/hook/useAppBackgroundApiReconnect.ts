import {useEffect, useRef} from 'react';
import {useApiReconnect} from 'context/ChainApiContext';
import {useNavigation} from '@react-navigation/core';
import {apiLoadingScreen} from 'src/navigation/routeKeys';
import {useAppState} from 'src/hook/useAppState';

export function useAppBackgroundApiReconnect() {
  const {canReconnect, reconnect} = useApiReconnect();
  const navigation = useNavigation();
  const appState = useAppState();
  const didAppCameToForegroundOnce = useRef(false);

  useEffect(() => {
    didAppCameToForegroundOnce.current = appState.didAppCameToForeground;
  }, [appState]);

  useEffect(() => {
    if (didAppCameToForegroundOnce.current && canReconnect) {
      reconnect();
      setTimeout(() => {
        navigation.navigate(apiLoadingScreen);
      }, 0);

      didAppCameToForegroundOnce.current = false;
    }
  }, [canReconnect, navigation, reconnect, appState]);
}
