import React, {useContext, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet, View} from 'react-native';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import globalStyles, {standardPadding} from 'src/styles';
import {Button, Divider} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import {apiLoadingScreen, appStack} from 'src/navigation/routeKeys';

export type InjectedPropTypes = {
  networkSelection: {
    selectNetwork: () => void;
    currentNetwork: NetworkType | undefined;
  };
};

export function NetworkSelectionScreen({navigation}: {navigation: NavigationProp<any>}) {
  const modalRef = useRef<Modalize>(null);
  React.useEffect(() => {
    modalRef.current?.open();
  }, []);

  const {api} = useContext(ChainApiContext);
  function onClose() {
    navigation.navigate(apiLoadingScreen);
    if (api) {
      navigation.navigate(appStack);
    }
  }

  const {currentNetwork, availableNetworks, select} = useContext(NetworkContext);

  return (
    <Modalize
      ref={modalRef}
      threshold={250}
      handlePosition="outside"
      adjustToContentHeight
      closeOnOverlayTap
      panGestureEnabled
      onClose={onClose}>
      <View style={styles.networkModal}>
        <NetworkSelectionList
          items={availableNetworks}
          selected={currentNetwork}
          onSelect={(item) => {
            select(item);
          }}
        />
        <Divider style={globalStyles.divider} />
        <Button appearance="ghost" onPress={onClose}>
          Close
        </Button>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modal: {},
  flex1: {flex: 1},
  networkModal: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingVertical: standardPadding * 3,
    paddingHorizontal: standardPadding * 2,
  },
});
