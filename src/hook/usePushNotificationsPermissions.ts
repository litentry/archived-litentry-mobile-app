import {useQueryClient, useQuery, useMutation, UseMutationOptions} from 'react-query';
import * as AsyncStorage from 'src/service/AsyncStorage';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {usePushTopics} from './usePushTopics';

const PERMISSION_GRANTING_SCREEN_SHOWN = 'PERMISSION_GRANTING_SCREEN_SHOWN';

export function usePushNotificationsPermissions(options?: UseMutationOptions<boolean, unknown, void, unknown>) {
  const {subscribeToAllTopics} = usePushTopics();
  const queryClient = useQueryClient();

  const {data: hasPermissions, isLoading} = useQuery('permission_granted', async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    return Platform.OS === 'ios' && permissionAllowed(await messaging().hasPermission());
  });

  const {mutate: requestPermissions} = useMutation(async () => {
    const status = await messaging().requestPermission();
    const allowed = permissionAllowed(status);

    if (allowed) {
      subscribeToAllTopics();
    }

    return allowed;
  }, options);

  const setPermissionGrantingToShown = async () => {
    await AsyncStorage.setItem(PERMISSION_GRANTING_SCREEN_SHOWN, true);
    queryClient.invalidateQueries('permission_granted');
  };

  return {requestPermissions, setPermissionGrantingToShown, hasPermissions, isLoading};
}

function permissionAllowed(status: FirebaseMessagingTypes.AuthorizationStatus) {
  return status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;
}

export function useShouldShowPushPermissionScreen() {
  const {hasPermissions, isLoading} = usePushNotificationsPermissions();

  return useQuery(
    'should_show_permission_granting_prompt',
    async () => {
      const hasBeenShown = await AsyncStorage.getItem(PERMISSION_GRANTING_SCREEN_SHOWN);

      return Platform.OS === 'ios' && !hasPermissions && !hasBeenShown;
    },
    {enabled: !isLoading},
  );
}
