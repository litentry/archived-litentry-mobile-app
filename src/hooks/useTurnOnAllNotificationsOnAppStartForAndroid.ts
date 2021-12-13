import React from 'react';
import {Platform} from 'react-native';
import {usePushTopics} from './usePushTopics';
import {useIsFirstAppStart} from '@hooks/useIsFirstAppStart';

export function useTurnOnAllNotificationsOnAppStartForAndroid() {
  const {subscribeToAllTopics, isLoading: topicsLoading} = usePushTopics();
  const {data: isFirstAppStart, isLoading: firstAppStartLoading} = useIsFirstAppStart();

  const isRunnedOnceRef = React.useRef(false);

  const isLoaded = !firstAppStartLoading && !topicsLoading;
  const shouldToggle = isLoaded && isFirstAppStart && Platform.OS === 'android' && !isRunnedOnceRef.current;

  // toggle all topics to true on first app start
  // on IOS we will do that after push permission granted
  React.useEffect(() => {
    (async () => {
      if (shouldToggle) {
        isRunnedOnceRef.current = true;
        subscribeToAllTopics();
      }
    })();
  }, [shouldToggle, subscribeToAllTopics]);
}
