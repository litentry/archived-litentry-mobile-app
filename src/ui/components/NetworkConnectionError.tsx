import React, {useEffect, useState} from 'react';
import {Banner} from 'react-native-paper';
import {useNetInfo} from 'src/hooks/useNetInfo';

export function NetworkConnectionError() {
  const networkStatus = useNetInfo();
  const [bannerVisible, setBannerVisible] = useState<boolean>(networkStatus);

  useEffect(() => {
    setBannerVisible(networkStatus);
  }, [networkStatus]);

  return (
    <Banner
      visible={!bannerVisible}
      actions={[
        {
          label: 'Cancel',
          onPress: () => setBannerVisible(true),
        },
      ]}>
      There is an issue in the network connection. Please check your network connection settings
    </Banner>
  );
}
