import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export function useNetInfo() {
  const [networkStatus, setNetworStaus] = useState<boolean>(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setNetworStaus(state.isConnected ? true : false);
    });
  }, []);

  return {networkStatus};
}
