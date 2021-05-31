import React, {useContext} from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Icon, Layout, Text} from '@ui-kitten/components';
import globalStyles, {monofontFamily, colorGreen} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {NetworkContext} from 'context/NetworkContext';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';

function LoadingView({navigation}: {navigation: NavigationProp<any>}) {
  const {currentNetwork} = useContext(NetworkContext);
  const {api} = useContext(ChainApiContext);

  /// navigate to app in case of successfully connecting
  const prevApi = React.useRef(!!api);
  React.useEffect(() => {
    if (api && !prevApi.current) {
      navigation.navigate('App');
    }
  }, [navigation, api]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Layout style={styles.container}>
      <ScreenNavigation
        renderTitle={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate('NetworkSelectScreen')}>
            <Layout style={{}}>
              <Text category="s1">Litentry</Text>
              {currentNetwork ? (
                <NetworkItem item={currentNetwork} isConnected={false} />
              ) : null}
            </Layout>
          </TouchableOpacity>
        )}
      />
      <View style={globalStyles.centeredContainer}>
        <View style={styles.textContainer}>
          <Icon
            style={[globalStyles.inlineIconDimension, {color: colorGreen}]}
            name="planet"
            pack="ionic"
          />
          <Text style={styles.text}>
            Connecting to {currentNetwork?.name ?? ''}
          </Text>
        </View>
        <ActivityIndicator size={'large'} color={colorGreen} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: monofontFamily,
  },
});

export default LoadingView;
