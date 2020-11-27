import React from 'react';
import {StyleSheet} from 'react-native';
import RNWebView from 'react-native-webview';
import {RouteProp} from '@react-navigation/native';
import {DrawerParamList} from 'src/types';
import SafeView from 'presentational/SafeView';
import {
  TopNavigation,
  Icon,
  IconProps,
  Layout,
  TopNavigationAction,
  Divider,
  Text,
} from '@ui-kitten/components';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {monofontFamily} from 'src/styles';

type PropTypes = {
  route: RouteProp<DrawerParamList, 'Webview'>;
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const BackIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-back-outline" />
);

function Webview(props: PropTypes) {
  const {
    route: {params},
    navigation,
  } = props;
  const {uri, title} = params;
  return (
    <SafeView>
      <Layout style={styles.container}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text category="s1" style={{fontFamily: monofontFamily}}>
              {title}
            </Text>
          )}
          accessoryLeft={() => (
            <TopNavigationAction
              onPress={() => navigation.goBack()}
              icon={BackIcon}
            />
          )}
        />
        <Divider />
        <RNWebView source={{uri}} style={styles.container} />
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Webview;
