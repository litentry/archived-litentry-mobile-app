import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import React from 'react';
import {useInAppNotification, InAppNotificationContent} from 'src/context/InAppNotificationContext';
import {useLinkTo} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useCallback} from 'react';
import {pathToRegexp} from 'path-to-regexp';
import {useNetwork} from 'context/NetworkContext';

function getParamsFromDeeplink(deeplink: string) {
  const path = deeplink.replace('litentry://', '/');
  const re = pathToRegexp('/api/:network/:redirectTo?');
  const match = re.exec(path);
  if (match) {
    const [, network, redirectTo] = match;
    return {network, redirectTo};
  }
}

export function useFirebase() {
  const linkTo = useLinkTo();
  const {trigger} = useInAppNotification();
  const {currentNetwork, select, availableNetworks} = useNetwork();

  if (!trigger) {
    throw new Error('InAppNotificationContext most be provided!');
  }

  const handleNotification = useCallback(
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

    messaging().getInitialNotification().then(handleNotification).catch(console.error);

    const unsubscribeFromOnNotification = messaging().onNotificationOpenedApp(handleNotification);

    const unsubscribeFromOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log('onMessage', remoteMessage);
      trigger({
        type: 'Component',
        renderContent: () => (
          <TouchableOpacity
            onPress={() => {
              handleNotification(remoteMessage);
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
  }, [handleNotification, trigger]);
}
