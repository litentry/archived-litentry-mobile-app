import React from 'react';
import {StyleSheet} from 'react-native';
import RNWebView from 'react-native-webview';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {DrawerParamList} from '@ui/navigation/navigation';

type PropTypes = {
  route: RouteProp<DrawerParamList, 'Webview'>;
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function WebviewScreen(props: PropTypes) {
  const {
    route: {params},
  } = props;
  const {uri} = params;

  return (
    <SafeView edges={noTopEdges}>
      <RNWebView source={{uri}} style={styles.container} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default WebviewScreen;
