import {useQueryClient, useQuery, useMutation} from 'react-query';
import * as AsyncStorage from 'src/service/AsyncStorage';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {usePushTopics} from './usePushTopics';

const PERMISSION_GRANTING_SCREEN_SHOWN = 'PERMISSION_GRANTING_SCREEN_SHOWN';

export function useGrantPermission() {
  const {toggleTopic, topics} = usePushTopics();
  const queryClient = useQueryClient();

  const {data: granted, isLoading} = useQuery('permission_granted', async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    return Platform.OS === 'ios' && permissionAllowed(await messaging().hasPermission());
  });

  const {mutate: grant} = useMutation(async () => {
    const status = await messaging().requestPermission();
    const allowed = permissionAllowed(status);

    if (allowed) {
      for (const topic of topics) {
        toggleTopic({id: topic.id, subscribe: true});
      }
    }

    return allowed;
  });

  const setPermissionGrantingToShown = async () => {
    await AsyncStorage.setItem(PERMISSION_GRANTING_SCREEN_SHOWN, true);
    queryClient.invalidateQueries('permission_granted');
  };

  return {grant, setPermissionGrantingToShown, granted, isLoading};
}

function permissionAllowed(status: FirebaseMessagingTypes.AuthorizationStatus) {
  return status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;
}

export function useShowPushPermissionScreen() {
  const {granted, isLoading} = useGrantPermission();

  return useQuery(
    'show_permission_granting_prompt',
    async () => {
      const hasBeenShown = await AsyncStorage.getItem(PERMISSION_GRANTING_SCREEN_SHOWN);

      return Platform.OS === 'ios' && !granted && !hasBeenShown;
    },
    {enabled: !isLoading},
  );
}
