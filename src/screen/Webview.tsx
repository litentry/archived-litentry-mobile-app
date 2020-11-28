import React from 'react';
import {StyleSheet} from 'react-native';
import RNWebView from 'react-native-webview';
import {RouteProp} from '@react-navigation/native';
import {DrawerParamList} from 'src/types';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';

type PropTypes = {
  route: RouteProp<DrawerParamList, 'Webview'>;
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function Webview(props: PropTypes) {
  const {
    route: {params},
    navigation,
  } = props;
  const {uri, title} = params;
  return (
    <GenericNavigationLayout
      title={title}
      onBackPressed={() => navigation.goBack()}>
      <RNWebView source={{uri}} style={styles.container} />
    </GenericNavigationLayout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Webview;
