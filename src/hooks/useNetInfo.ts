import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export function useNetInfo() {
  const [networkStatus, setNetworkStatus] = useState<boolean>(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setNetworkStatus(state.isConnected ? true : false);
    });
  }, [networkStatus]);

  return networkStatus;
}
