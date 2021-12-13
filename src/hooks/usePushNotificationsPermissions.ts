import {useQueryClient, useQuery, useMutation} from 'react-query';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {usePushTopics} from './usePushTopics';

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
  // use query is used here to ensure the query is invalidated when the user changes permissions
  const {data: pushAuthorizationStatus, isLoading} = useQuery('push_authorization_status', () =>
    messaging().hasPermission(),
  );

  return {pushAuthorizationStatus, isLoading};
}
