import {useQueryClient, useQuery, useMutation} from 'react-query';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {usePushTopics} from './usePushTopics';
import {usePersistedState} from './usePersistedState';

export function usePushNotificationsPermissions() {
  const {subscribeToAllTopics} = usePushTopics();
  const queryClient = useQueryClient();

  const {pushAuthorizationStatus} = usePushAuthorizationStatus();

  const {mutate: requestPermissions} = useMutation(
    async () => {
      const status = await messaging().requestPermission();
      const allowed = permissionAllowed(status);

      if (allowed) {
        subscribeToAllTopics();
      }

      return allowed;
    },
    {
      onSettled() {
        queryClient.invalidateQueries('push_authorization_status');
      },
    },
  );

  return {
    requestPermissions,
    hasPermissions: pushAuthorizationStatus && permissionAllowed(pushAuthorizationStatus),
  };
}

function permissionAllowed(status: FirebaseMessagingTypes.AuthorizationStatus) {
  return status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;
}

export function usePushAuthorizationStatus() {
  const [isPnPermissionSkipped, setIsPnPermissionSkipped] = usePersistedState('is_pn_permission_skipped', '0');
  const {data: pushAuthorizationStatus, isLoading} = useQuery('push_authorization_status', () =>
    messaging().hasPermission(),
  );

  const isSkipped = Boolean(Number(isPnPermissionSkipped));

  return {
    isLoading,
    pushAuthorizationStatus,
    isPnPromptNeeded: !isSkipped && pushAuthorizationStatus === messaging.AuthorizationStatus.NOT_DETERMINED,
    isPnPermissionSkipped: isSkipped,
    skipPnPermission: () => {
      setIsPnPermissionSkipped('1');
    },
  };
}
