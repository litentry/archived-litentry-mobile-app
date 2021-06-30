import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {useInAppNotification, InAppNotificationContent} from 'src/context/InAppNotificationContext';
import {useLinkTo} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

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

  React.useEffect(() => {
    // TODO: IOS would need permission
    // requestUserPermission();

    messaging()
      .getToken()
      .then((token) => console.log(`FCM TOKEN:`, token));

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data?.deeplink) {
          linkTo(remoteMessage.data.deeplink.replace('litentry://', '/'));
        }
      })
      .catch(console.error);

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      trigger({
        type: 'Component',
        renderContent: () => (
          <TouchableOpacity
            onPress={() => {
              if (remoteMessage.data?.deeplink) {
                linkTo(remoteMessage.data.deeplink.replace('litentry://', '/'));
              }
            }}>
            <InAppNotificationContent
              title={remoteMessage.notification?.title ?? ''}
              message={remoteMessage.notification?.body ?? ''}
            />
          </TouchableOpacity>
        ),
      });
    });

    return unsubscribe;
  }, [linkTo, trigger]);
}
