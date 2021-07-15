import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import React from 'react';
import {useInAppNotification, InAppNotificationContent} from 'src/context/InAppNotificationContext';
import {useLinkTo} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useCallback} from 'react';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export function useFirebase() {
  const linkTo = useLinkTo();
  const {trigger} = useInAppNotification();

  if (!trigger) {
    throw new Error('InAppNotificationContext most be provided!');
  }

  const handleNotifiction = useCallback(
    async (message: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (message?.data?.deeplink) {
        linkTo(message.data.deeplink.replace('litentry://', '/'));
      }
    },
    [linkTo],
  );

  React.useEffect(() => {
    // TODO: IOS would need permission
    // requestUserPermission();

    messaging()
      .getToken()
      .then((token) => console.log(`FCM TOKEN:`, token));

    messaging().getInitialNotification().then(handleNotifiction).catch(console.error);

    const unsubscribeFromOnNotification = messaging().onNotificationOpenedApp(handleNotifiction);

    const unsubscribeFromOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log('onMessage', remoteMessage);
      trigger({
        type: 'Component',
        renderContent: () => (
          <TouchableOpacity
            onPress={() => {
              handleNotifiction(remoteMessage);
            }}>
            <InAppNotificationContent
              title={remoteMessage.notification?.title ?? ''}
              message={remoteMessage.notification?.body ?? ''}
            />
          </TouchableOpacity>
        ),
      });
    });

    return () => {
      unsubscribeFromOnNotification();
      unsubscribeFromOnMessage();
    };
  }, [handleNotifiction, trigger]);
}
