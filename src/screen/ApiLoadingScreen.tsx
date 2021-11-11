import React, {useContext} from 'react';
import {ActivityIndicator, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Layout, Text} from '@ui-kitten/components';
import globalStyles, {monofontFamily, colorGreen, standardPadding} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import NetworkItem from 'presentational/NetworkItem';
import {NetworkContext} from 'context/NetworkContext';
import {CompositeNavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import {appStack, networkSelectionScreen} from 'src/navigation/routeKeys';
import {ApiLoadingStackParamList, RootStackParamList} from 'src/navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

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
      <ScreenNavigation
        renderTitle={() => (
          <TouchableOpacity onPress={() => navigation.navigate(networkSelectionScreen)}>
            <View style={{alignItems: 'center'}}>
              <Text category="s1">Litentry</Text>
              {currentNetwork ? <NetworkItem item={currentNetwork} isConnected={status === 'ready'} /> : null}
            </View>
          </TouchableOpacity>
        )}
      />
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
});
