import React, {useContext, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet} from 'react-native';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import globalStyles, {standardPadding} from 'src/styles';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import {apiLoadingScreen, appStack, connectionRetryScreen} from 'src/navigation/routeKeys';
import {CompleteNavigatorParamList} from 'src/navigation/navigation';

export type InjectedPropTypes = {
  networkSelection: {
    selectNetwork: () => void;
    currentNetwork: NetworkType | undefined;
  };
};

export function NetworkSelectionScreen({navigation}: {navigation: NavigationProp<CompleteNavigatorParamList>}) {
  const modalRef = useRef<Modalize>(null);
  React.useEffect(() => {
    modalRef.current?.open();
  }, []);

  const {status} = useContext(ChainApiContext);

  function onClose() {
    if (status === 'ready') {
      navigation.navigate(appStack);
    } else if (status === 'disconnected') {
      navigation.navigate(connectionRetryScreen);
    }
  }

  const {currentNetwork, availableNetworks, select} = useContext(NetworkContext);

  return (
    <Modalize
      ref={modalRef}
      threshold={250}
      adjustToContentHeight
      scrollViewProps={{style: {overflow: 'hidden'}}}
      closeOnOverlayTap={false}
      panGestureEnabled={false}
      tapGestureEnabled={false}>
      <Layout style={styles.networkModal}>
        <NetworkSelectionList
          items={availableNetworks}
          selected={currentNetwork}
          onSelect={(item) => {
            select(item);
            navigation.navigate(apiLoadingScreen);
          }}
        />
        <Divider style={globalStyles.divider} />
        <Button appearance="ghost" onPress={onClose}>
          Close
        </Button>
      </Layout>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  networkModal: {
    paddingVertical: standardPadding * 3,
    paddingHorizontal: standardPadding * 2,
  },
});
