import React from 'react';
import {Platform} from 'react-native';
import {usePushTopics} from './usePushTopics';
import {isFirstAppStart} from 'src/utils/firstAppStart';

export function useTurnOnAllNotificationsOnAppStartForAndroid() {
  const {subscribeToAllTopics, isLoading: topicsLoading} = usePushTopics();

  const isRunnedOnceRef = React.useRef(false);
  const shouldToggle = !topicsLoading && isFirstAppStart && Platform.OS === 'android' && !isRunnedOnceRef.current;

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
