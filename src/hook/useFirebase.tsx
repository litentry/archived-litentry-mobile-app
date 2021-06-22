import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {useInAppNotification, InAppNotificationContent} from 'src/context/InAppNotificationContext';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export function useFirebase() {
  const {trigger} = useInAppNotification();
  React.useEffect(() => {
    // TODO: IOS would need permission
    // requestUserPermission();

    messaging()
      .getToken()
      .then((token) => console.log(`FCM TOKEN:`, token));

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      trigger({
        type: 'Component',
        renderContent: () => (
          <InAppNotificationContent
            title={remoteMessage.notification?.title ?? ''}
            message={remoteMessage.notification?.body ?? ''}
          />
        ),
      });
    });

    return unsubscribe;
  }, [trigger]);
}
