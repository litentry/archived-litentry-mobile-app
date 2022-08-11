import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export function useNetInfo() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ? true : false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {isConnected};
}
