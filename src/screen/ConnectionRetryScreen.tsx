import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import globalStyles, {monofontFamily, standardPadding, colorRed} from 'src/styles';
import NetworkItem from 'presentational/NetworkItem';
import {CompositeNavigationProp} from '@react-navigation/native';
import {apiLoadingScreen, networkSelectionScreen} from 'src/navigation/routeKeys';
import {ApiLoadingStackParamList, RootStackParamList} from 'src/navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import Padder from 'presentational/Padder';
import {NetworkContext} from 'context/NetworkContext';
import {useApiReconnect} from 'context/ChainApiContext';
import {AppBar, AppHeader, Layout} from 'src/packages/base_components';
import {noop} from 'lodash';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ApiLoadingStackParamList>,
    StackNavigationProp<RootStackParamList>
  >;
};

export function ConnectionRetryScreen({navigation}: PropTypes) {
  const {currentNetwork} = useContext(NetworkContext);
  const {reconnect} = useApiReconnect();

  const onRetry = () => {
    reconnect();
    navigation.navigate(apiLoadingScreen);
  };

  const onChangeNetwork = () => {
    navigation.navigate(networkSelectionScreen);
  };

  return (
    <Layout style={styles.container}>
      <AppHeader>
        <AppBar.Action icon="menu" color="transparent" onPress={noop} />
        <AppBar.Content
          title={
            <View style={styles.networkName}>
              <Text category="s1">Litentry</Text>
              {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={false} /> : null}
            </View>
          }
        />
      </AppHeader>
      <View style={globalStyles.centeredContainer}>
        <View style={styles.textContainer}>
          <Icon
            style={[globalStyles.inlineIconDimension, {color: colorRed}]}
            name="cloud-offline-outline"
            pack="ionic"
          />
          <Text style={styles.text}>Disconnected from {currentNetwork?.name ?? ''}</Text>
        </View>
        <Button status="basic" onPress={onRetry}>
          Retry
        </Button>
        <Padder scale={1} />
        <Button status="basic" onPress={onChangeNetwork}>
          Change Network
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  networkName: {
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: monofontFamily,
    marginLeft: standardPadding,
  },
  titleContainer: {alignItems: 'center'},
});
