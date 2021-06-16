import {Icon, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import React, {useContext} from 'react';
import globalStyles from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';

export function MotionsScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);

  const {loading, value: data} = useAsyncRetry(async () => {
    try {
      if (api) {
        const proposals = await api.derive.council.proposals();
        return proposals;
      }
    } catch (e) {
      console.warn(e);
    }
  }, [api]);

  return (
    <Layout style={globalStyles.flex}>
      <ScreenNavigation
        renderTitle={() => (
          <Text category={'s1'} style={globalStyles.monoFont}>
            Motions
          </Text>
        )}
        accessoryLeft={
          <TopNavigationAction onPress={navigation.goBack} icon={(p) => <Icon {...p} name={'arrow-back-outline'} />} />
        }
      />
      <Text>Motions</Text>
    </Layout>
  );
}
