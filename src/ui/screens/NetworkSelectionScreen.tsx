import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import NetworkSelectionList from '@ui/components/NetworkSelectionList';
import globalStyles from '@ui/styles';
import {Button, Divider} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {useNetwork} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {NavigationProp} from '@react-navigation/native';
import {CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';

export function NetworkSelectionScreen({navigation}: {navigation: NavigationProp<CompleteNavigatorParamList>}) {
  const modalRef = useRef<Modalize>(null);
  React.useEffect(() => {
    modalRef.current?.open();
  }, []);

  const {currentNetwork, availableNetworks, select} = useNetwork();
  const changeNetwork = (network: NetworkType) => {
    select(network);
    navigation.goBack();
  };

  return (
    <Modalize
      ref={modalRef}
      threshold={250}
      adjustToContentHeight
      closeOnOverlayTap={false}
      panGestureEnabled={false}
      tapGestureEnabled={false}>
      <Layout style={globalStyles.paddedContainer}>
        <NetworkSelectionList items={availableNetworks} selected={currentNetwork} onSelect={changeNetwork} />
        <Divider />
        <Padder scale={1} />
        <Button onPress={navigation.goBack}>{`Close`}</Button>
        <Padder scale={1} />
      </Layout>
    </Modalize>
  );
}
