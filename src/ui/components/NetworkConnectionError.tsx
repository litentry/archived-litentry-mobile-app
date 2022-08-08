import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption, useTheme} from '@ui/library';
import {useNetInfo} from 'src/hooks/useNetInfo';

export function NetworkConnectionError() {
  const theme = useTheme();
  const networkStatus = useNetInfo();
  const [bannerVisible, setBannerVisible] = useState<boolean>(networkStatus);

  useEffect(() => {
    setBannerVisible(networkStatus);
  }, [networkStatus]);

  return !bannerVisible ? (
    <View>
      <Caption style={[{color: theme.colors.error}, styles.banner]}>No internet connectivity</Caption>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  banner: {textAlign: 'center'},
});
