import React, {useContext, useState} from 'react';
import {ActivityIndicator, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import globalStyles, {monofontFamily, colorGreen} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {NetworkContext} from 'context/NetworkContext';
import {ChainApiContext} from 'context/ChainApiContext';
import NetworkSelect from 'src/layout/NetworkSelect';
import {appNavigatorScreen} from 'src/navigation/routeKeys';

export function ApiLoadingScreen() {
  const navigation = useNavigation();
  const {currentNetwork, select} = useContext(NetworkContext);
  const {api, inProgress} = useContext(ChainApiContext);
  const [networkSelectOpen, setNetworkSelectOpen] = useState(false);

  React.useEffect(() => {
    if (api) {
      navigation.navigate(appNavigatorScreen);
    }
  }, [navigation, api]);

  return (
    <Layout style={styles.container}>
      <ScreenNavigation
        renderTitle={() => (
          <TouchableOpacity onPress={() => setNetworkSelectOpen(true)}>
            <Layout style={{}}>
              <Text category="s1">Litentry</Text>
              <NetworkItem item={currentNetwork} isConnected={false} />
            </Layout>
          </TouchableOpacity>
        )}
      />
      <View style={globalStyles.centeredContainer}>
        {(() => {
          const icon = (
            <Icon style={[globalStyles.inlineIconDimension, {color: colorGreen}]} name="planet" pack="ionic" />
          );
          if (inProgress) {
            return (
              <>
                <View style={styles.row}>
                  {icon}
                  <Text style={styles.text}>Connecting to {currentNetwork.name}</Text>
                </View>
                <ActivityIndicator size={'large'} color={colorGreen} />
              </>
            );
          }
          if (!api) {
            return (
              <>
                <View style={styles.row}>
                  {icon}
                  <Text style={styles.text}>Disconnected from {currentNetwork.name}</Text>
                </View>
                <Button onPress={() => select({...currentNetwork})}>Reconnect</Button>
              </>
            );
          }

          return null;
        })()}
        <NetworkSelect open={networkSelectOpen} onClose={() => setNetworkSelectOpen(false)} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: monofontFamily,
    paddingHorizontal: 4,
  },
});
