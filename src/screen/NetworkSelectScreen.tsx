import React, {useContext, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import globalStyles from 'src/styles';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';

export type InjectedPropTypes = {
  networkSelection: {
    selectNetwork: () => void;
    currentNetwork: NetworkType | undefined;
  };
};

export function NetworkSelectScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const modalRef = useRef<Modalize>(null);
  React.useEffect(() => {
    modalRef.current?.open();
  }, []);

  const {api} = useContext(ChainApiContext);
  function onClose() {
    navigation.navigate('ApiLoadingPage');
    if (api) {
      navigation.navigate('App');
    }
  }

  const {currentNetwork, availableNetworks, select} = useContext(
    NetworkContext,
  );

  return (
    <Modalize
      ref={modalRef}
      threshold={250}
      handlePosition="outside"
      adjustToContentHeight
      closeOnOverlayTap
      panGestureEnabled
      onClose={onClose}>
      <Layout level="1" style={globalStyles.paddedContainer}>
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
      </Layout>
    </Modalize>
  );
}
