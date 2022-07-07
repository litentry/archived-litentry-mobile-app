import {useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import {useAppState} from 'src/hooks/useAppState';

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState(false);
  const {isAppForeground, didAppCameToForeground} = useAppState();

  useEffect(() => {
    if (isAppForeground || didAppCameToForeground) {
      const requestCameraPermission = async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      };
      requestCameraPermission();
    }
  }, [isAppForeground, didAppCameToForeground]);

  return {
    hasPermission,
    isAppForeground,
  };
}
