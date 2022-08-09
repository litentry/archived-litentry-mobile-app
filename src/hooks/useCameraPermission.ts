import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Permission} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useAppState} from 'src/hooks/useAppState';

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState(false);
  const {isAppActive, didAppCameToForeground} = useAppState();

  useEffect(() => {
    if (isAppActive || didAppCameToForeground) {
      const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA as Permission);
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } else {
          const status = await Camera.requestCameraPermission();
          setHasPermission(status === 'authorized');
        }
      };
      requestCameraPermission();
    }
  }, [isAppActive, didAppCameToForeground]);

  return {
    hasPermission,
    isAppActive,
  };
}
