import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Layout, Text} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import NetworkItem from 'presentational/NetworkItem';
import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ApiLoadingStackParamList, RootStackParamList} from 'src/navigation/navigation';
import {appStack, networkSelectionScreen} from 'src/navigation/routeKeys';
import {AppBar} from 'src/packages/base_components';
import globalStyles, {colorGreen, monofontFamily, standardPadding} from 'src/styles';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ApiLoadingStackParamList>,
    StackNavigationProp<RootStackParamList>
  >;
};

export function ApiLoadingScreen({navigation}: PropTypes) {
  const {currentNetwork} = useContext(NetworkContext);
  const {status, inProgress} = useContext(ChainApiContext);

  React.useEffect(() => {
    if (status === 'ready') {
      navigation.navigate(appStack);
    }
  }, [navigation, status]);

  return (
    <Layout style={styles.container}>
      <AppBar.Header>
        <AppBar.Content
          title={
            <TouchableOpacity onPress={() => navigation.navigate(networkSelectionScreen)} style={styles.titleContainer}>
              <Text category="s1">Litentry</Text>
              {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={status === 'ready'} /> : null}
            </TouchableOpacity>
          }
        />
      </AppBar.Header>
      <View style={globalStyles.centeredContainer}>
        <View style={styles.textContainer}>
          <Icon style={[globalStyles.inlineIconDimension, {color: colorGreen}]} name="planet" pack="ionic" />
          <Text style={styles.text}>
            {`${inProgress ? 'Connecting' : 'Connected'}`} to {currentNetwork?.name ?? ''}
          </Text>
        </View>
        {inProgress ? <ActivityIndicator size={'large'} color={colorGreen} /> : null}
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
  titleContainer: {alignItems: 'center'},
});
