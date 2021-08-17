import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import React, {useContext} from 'react';
import {useInAppNotification, InAppNotificationContent} from 'src/context/InAppNotificationContext';
import {useLinkTo} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useCallback} from 'react';
import {pathToRegexp} from 'path-to-regexp';
import {NetworkContext} from 'context/NetworkContext';

function getParamsFromDeeplink(deeplink: string) {
  const path = deeplink.replace('litentry://', '/');
  const re = pathToRegexp('/api/:network/:redirectTo?');
  const match = re.exec(path);
  if (match) {
    const [, network, redirectTo] = match;
    return {network, redirectTo};
  }
}

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
  const {currentNetwork, select, availableNetworks} = useContext(NetworkContext);

  if (!trigger) {
    throw new Error('InAppNotificationContext most be provided!');
  }

  const handleNotifiction = useCallback(
    async (message: FirebaseMessagingTypes.RemoteMessage | null) => {
      const deeplink = message?.data?.deeplink;
      if (deeplink) {
        const params = getParamsFromDeeplink(deeplink);
        if (!params) {
          linkTo('/');
        } else {
          if (params.network !== currentNetwork.key) {
            const selectedNetwork = availableNetworks.find((n) => n.key === params.network) ?? currentNetwork;
            select(selectedNetwork);
          }

          linkTo(`/${params.redirectTo ?? ''}`);
        }
      }
    },
    [linkTo, currentNetwork, availableNetworks, select],
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
