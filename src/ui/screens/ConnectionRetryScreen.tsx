import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import NetworkItem from '@ui/components/NetworkItem';
import {CompositeNavigationProp} from '@react-navigation/native';
import {apiLoadingScreen, networkSelectionScreen} from '@ui/navigation/routeKeys';
import {ApiLoadingStackParamList, RootStackParamList} from '@ui/navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Padder} from '@ui/components/Padder';
import {NetworkContext} from 'context/NetworkContext';
import {useApiReconnect} from 'context/ChainApiContext';
import {AppBar, AppHeader, Title, Icon, Button, Text, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';
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
      <AppHeader style={{backgroundColor: colors.primary}}>
        <AppBar.Action icon="menu" color="transparent" onPress={noop} />
        <AppBar.Content
          style={styles.contentContainer}
          title={
            <View style={styles.networkName}>
              <Title>Litentry</Title>
            </View>
          }
        />
        <View style={[styles.networkSwitch, {backgroundColor: colors.background}]}>
          {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={false} /> : null}
        </View>
      </AppHeader>
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
  contentContainer: {
    marginRight: '12%',
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
  networkSwitch: {
    position: 'absolute',
    right: standardPadding * 1.5,
    bottom: 0,
    paddingHorizontal: standardPadding,
    paddingVertical: standardPadding / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
});
