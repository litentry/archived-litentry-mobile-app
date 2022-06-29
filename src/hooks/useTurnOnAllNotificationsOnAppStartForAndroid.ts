import React from 'react';
import {Platform} from 'react-native';
import {usePushTopics} from '@atoms/pushNotification';
import {isFirstAppStart} from 'src/utils/firstAppStart';

export function useTurnOnAllNotificationsOnAppStartForAndroid() {
  const {subscribeToAllTopics} = usePushTopics();

  const isRunnedOnceRef = React.useRef(false);
  const shouldToggle = isFirstAppStart && Platform.OS === 'android' && !isRunnedOnceRef.current;

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
