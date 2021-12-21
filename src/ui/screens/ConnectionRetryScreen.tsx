import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Button, Icon, Text, useTheme} from '@ui/library';
import {ApiLoadingStackParamList, RootStackParamList} from '@ui/navigation/navigation';
import {apiLoadingScreen, networkSelectionScreen} from '@ui/navigation/routeKeys';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import {useApiReconnect} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ApiLoadingStackParamList>,
    StackNavigationProp<RootStackParamList>
  >;
};

export function ConnectionRetryScreen({navigation}: PropTypes) {
  const {currentNetwork} = useContext(NetworkContext);
  const {reconnect} = useApiReconnect();
  const {colors} = useTheme();

  const onRetry = () => {
    reconnect();
    navigation.navigate(apiLoadingScreen);
  };

  const onChangeNetwork = () => {
    navigation.navigate(networkSelectionScreen);
  };

  return (
    <Layout style={styles.container}>
      <View style={globalStyles.centeredContainer}>
        <View style={styles.textContainer}>
          <Icon name="access-point-network-off" color={colors.error} />
          <Text style={styles.text}>Disconnected from {currentNetwork?.name ?? ''}</Text>
        </View>
        <Button mode="outlined" onPress={onRetry}>
          Retry
        </Button>
        <Padder scale={1} />
        <Button mode="outlined" onPress={onChangeNetwork}>
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
});
