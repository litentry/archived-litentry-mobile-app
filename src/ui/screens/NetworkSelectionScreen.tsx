import React, {useContext, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NetworkSelectionList from '@ui/components/NetworkSelectionList';
import globalStyles, {standardPadding} from '@ui/styles';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {NavigationProp} from '@react-navigation/native';
import {CompleteNavigatorParamList} from '@ui/navigation/navigation';

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

  const {currentNetwork, availableNetworks, select} = useContext(NetworkContext);
  const changeNetwork = (network: NetworkType) => {
    select(network);
    navigation.goBack();
  };

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
        <NetworkSelectionList items={availableNetworks} selected={currentNetwork} onSelect={changeNetwork} />
        <Divider style={globalStyles.divider} />
        <Button appearance="ghost" onPress={navigation.goBack}>
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
