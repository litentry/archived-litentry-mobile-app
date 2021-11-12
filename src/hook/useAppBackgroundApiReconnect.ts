import {useEffect} from 'react';
import {useApiReconnect} from 'context/ChainApiContext';
import {useNavigation} from '@react-navigation/core';
import {apiLoadingScreen} from 'src/navigation/routeKeys';
import {useAppState} from './useAppState';

export function useAppBackgroundApiReconnect() {
  const {canReconnect, reconnect} = useApiReconnect();
  const navigation = useNavigation();
  const {didAppCameToForeground, setDidAppCameToForeground} = useAppState();

  useEffect(() => {
    if (didAppCameToForeground && canReconnect) {
      /**
       * make it false once used, otherwise it will try to reconnect on any
       * type of disconnect event. Such as we don't want automatic reconnect
       * when the app is already in foreground.
       */
      setDidAppCameToForeground(false);

      reconnect();
      setTimeout(() => {
        navigation.navigate(apiLoadingScreen);
      }, 0);
    }
  }, [canReconnect, navigation, reconnect, didAppCameToForeground, setDidAppCameToForeground]);
}
