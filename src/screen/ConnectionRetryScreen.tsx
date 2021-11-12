import React, {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import globalStyles, {monofontFamily, standardPadding, colorRed} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {CompositeNavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import {apiLoadingScreen, networkSelectionScreen} from 'src/navigation/routeKeys';
import {ApiLoadingStackParamList, RootStackParamList} from 'src/navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import Padder from 'presentational/Padder';
import {NetworkContext} from 'context/NetworkContext';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ApiLoadingStackParamList>,
    StackNavigationProp<RootStackParamList>
  >;
};

export function ConnectionRetryScreen({navigation}: PropTypes) {
  const {currentNetwork} = useContext(NetworkContext);
  const {reconnect} = useContext(ChainApiContext);

  const onRetry = () => {
    reconnect();
    navigation.navigate(apiLoadingScreen);
  };

  const onChangeNetwork = () => {
    navigation.navigate(networkSelectionScreen);
  };

  return (
    <Layout style={styles.container}>
      <ScreenNavigation
        renderTitle={() => (
          <TouchableOpacity onPress={() => navigation.navigate(networkSelectionScreen)}>
            <Layout style={styles.titleContainer}>
              <Text category="s1">Litentry</Text>
              {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={false} /> : null}
            </Layout>
          </TouchableOpacity>
        )}
      />
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
  retryContainer: {
    marginTop: 50,
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
