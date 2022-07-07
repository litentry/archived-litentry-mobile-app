import {useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import {useAppState} from 'src/hooks/useAppState';

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState(false);
  const {isAppActive, didAppCameToForeground} = useAppState();

  useEffect(() => {
    if (isAppActive || didAppCameToForeground) {
      const requestCameraPermission = async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      };
      requestCameraPermission();
    }
  }, [isAppActive, didAppCameToForeground]);

  return {
    hasPermission,
    isAppActive,
  };
}
