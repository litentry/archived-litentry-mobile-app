import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import * as routeKeys from '@ui/navigation/routeKeys';

export function useCustomBackHandler() {
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
