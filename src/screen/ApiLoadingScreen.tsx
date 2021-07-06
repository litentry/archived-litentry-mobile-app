import React, {useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp, useLinkTo} from '@react-navigation/native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import globalStyles, {colorGreen, monofontFamily} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {NetworkContext} from 'context/NetworkContext';
import {ChainApiContext} from 'context/ChainApiContext';
import NetworkSelect from 'src/layout/NetworkSelect';
import {apiLoadingScreen} from 'src/navigation/routeKeys';
import {AppStackParamList} from 'src/navigation/navigation';

export function ApiLoadingScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppStackParamList, typeof apiLoadingScreen>;
  route: RouteProp<AppStackParamList, typeof apiLoadingScreen>;
}) {
  const linkTo = useLinkTo();
  const {currentNetwork, select, availableNetworks} = useContext(NetworkContext);
  const {api, inProgress} = useContext(ChainApiContext);
  const [networkSelectOpen, setNetworkSelectOpen] = useState(false);

  React.useEffect(() => {
    const selectedNetwork = availableNetworks.find((n) => n.key === route.params?.network) ?? currentNetwork;
    if (selectedNetwork !== currentNetwork) {
      select(selectedNetwork);
    } else if (api) {
      if (!route.params) {
        linkTo('/');
      } else if (route.params.network === currentNetwork.key) {
        linkTo(`/${route.params.redirectTo ?? ''}`);
      }
    }
  }, [api, route.params, linkTo, availableNetworks, select, currentNetwork]);

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
                {/**  TODO: find a better way to make sure
                 * either the previous apiPromise will be destroyed
                 * or reconnects the same one
                 */}
                <Button onPress={() => select({...currentNetwork})}>Reconnect</Button>
              </>
            );
          }

          return null;
        })()}
        <NetworkSelect
          open={networkSelectOpen}
          // TODO: check if we can remove this and make NetworkSelect only responsible to
          // call select function on NetworkContext
          onSelect={(n) => {
            navigation.setParams({network: n.key, redirectTo: null});
          }}
          onClose={() => setNetworkSelectOpen(false)}
        />
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
