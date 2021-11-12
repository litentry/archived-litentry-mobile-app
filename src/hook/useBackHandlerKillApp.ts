import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import * as routeKeys from 'src/navigation/routeKeys';

export function useBackHandlerKillApp() {
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      const handler = () => {
        if (route.name === routeKeys.dashboardScreen) {
          BackHandler.exitApp();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', handler);

      return () => BackHandler.removeEventListener('hardwareBackPress', handler);
    }, [route]),
  );
}
