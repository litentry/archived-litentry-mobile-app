import React, {useContext} from 'react';
import {ActivityIndicator, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import globalStyles, {monofontFamily, colorGreen} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {NetworkContext} from 'context/NetworkContext';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';

export function ApiLoadingScreen({navigation}: {navigation: NavigationProp<any>}) {
  const {currentNetwork, select} = useContext(NetworkContext);
  const {api, inProgress} = useContext(ChainApiContext);

  /// navigate to app in case of successfully connecting
  const prevApi = React.useRef(!!api);
  React.useEffect(() => {
    if (api && !prevApi.current) {
      navigation.navigate('App');
    }
  }, [navigation, api]);

  return (
    <Layout style={styles.container}>
      <ScreenNavigation
        renderTitle={() => (
          <TouchableOpacity onPress={() => navigation.navigate('NetworkSelectScreen')}>
            <Layout style={{}}>
              <Text category="s1">Litentry</Text>
              {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={false} /> : null}
            </Layout>
          </TouchableOpacity>
        )}
      />
      <View style={globalStyles.centeredContainer}>
        {(() => {
          const icon = (
            <Icon style={[globalStyles.inlineIconDimension, {color: colorGreen}]} name="planet" pack="ionic" />
          );

          if (api) {
            return (
              <>
                <View style={styles.row}>
                  {icon}
                  <Text style={styles.text}>Connected to {currentNetwork?.name ?? ''}</Text>
                </View>
                <Button onPress={() => navigation.navigate('NetworkSelectScreen')}>Switch Network</Button>
              </>
            );
          } else {
            if (inProgress) {
              return (
                <>
                  <View style={styles.row}>
                    {icon}
                    <Text style={styles.text}>Connecting to {currentNetwork?.name ?? ''}</Text>
                  </View>
                  <ActivityIndicator size={'large'} color={colorGreen} />
                </>
              );
            }
            return (
              <>
                <View style={styles.row}>
                  {icon}
                  <Text style={styles.text}>Disconnected from {currentNetwork?.name ?? ''}</Text>
                </View>
                <Button onPress={() => (currentNetwork ? select({...currentNetwork}) : undefined)}>Reconnect</Button>
              </>
            );
          }
        })()}
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
