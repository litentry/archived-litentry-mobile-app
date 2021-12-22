import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout} from '@ui/components/Layout';
import {ActivityIndicator, Icon, Text, useTheme} from '@ui/library';
import {ApiLoadingStackParamList, RootStackParamList} from '@ui/navigation/navigation';
import {appStack} from '@ui/navigation/routeKeys';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

type PropTypes = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ApiLoadingStackParamList>,
    StackNavigationProp<RootStackParamList>
  >;
};

export function ApiLoadingScreen({navigation}: PropTypes) {
  const {currentNetwork} = useContext(NetworkContext);
  const {status, inProgress} = useContext(ChainApiContext);
  const {colors} = useTheme();

  React.useEffect(() => {
    if (status === 'ready') {
      navigation.navigate(appStack);
    }
  }, [navigation, status]);

  return (
    <Layout style={styles.container}>
      <View style={globalStyles.centeredContainer}>
        <View style={styles.textContainer}>
          <Icon color={colors.accent} name="wan" />
          <Text style={styles.text}>
            {`${inProgress ? 'Connecting' : 'Connected'}`} to {currentNetwork?.name ?? ''}
          </Text>
        </View>
        {inProgress ? <ActivityIndicator size={'large'} animating /> : null}
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
