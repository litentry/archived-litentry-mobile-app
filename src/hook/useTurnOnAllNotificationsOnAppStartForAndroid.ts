import React from 'react';
import * as AsyncStorage from 'src/service/AsyncStorage';
import {Platform} from 'react-native';
import {usePushTopics} from './usePushTopics';

export function useTurnOnAllNotificationsOnAppStartForAndroid() {
  const {toggleTopic, topics} = usePushTopics();
  // toggle all topics to true on first app start
  // on IOS we will do that after push permission granted
  React.useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && topics.length > 0) {
        const isFirstAppStart = await AsyncStorage.getItem('is_first_app_start', false);

        if (!isFirstAppStart) {
          for (const topic of topics) {
            toggleTopic({id: topic.id, subscribe: true});
          }
          AsyncStorage.setItem('is_first_app_start', true);
        }
      }
    })();
  }, [toggleTopic, topics]);
}
