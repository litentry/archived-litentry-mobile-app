import React, {useContext, useEffect, useRef} from 'react';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {Modalize} from 'react-native-modalize';
import {NetworkContext} from 'context/NetworkContext';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import globalStyles from 'src/styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from 'src/navigation/navigation';
import {apiLoadingScreen} from 'src/navigation/routeKeys';
import {NetworkType} from 'src/types';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect?: (item: NetworkType) => void;
};

export default function NetworkSelect({open, onClose, onSelect}: Props) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const {currentNetwork, availableNetworks} = useContext(NetworkContext);
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (open) {
      modalRef.current?.open();
    }
  }, [open]);

  const onCloseModal = () => {
    modalRef.current?.close();
    onClose();
  };

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
            if (onSelect) {
              onSelect({...item});
            } else {
              navigation.navigate(apiLoadingScreen, {network: item.key, redirectTo: null});
            }
          }}
        />
        <Divider style={globalStyles.divider} />
        <Button appearance="ghost" onPress={onCloseModal}>
          Close
        </Button>
      </Layout>
    </Modalize>
  );
}
