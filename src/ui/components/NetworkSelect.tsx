import {Button, Divider, Layout} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import NetworkSelectionList from '@ui/components/NetworkSelectionList';
import React, {useContext, useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import globalStyles from '@ui/styles';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NetworkSelect({open, onClose}: Props) {
  const {currentNetwork, availableNetworks, select} = useContext(NetworkContext);
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
        <NetworkSelectionList items={availableNetworks} selected={currentNetwork} onSelect={select} />
        <Divider style={globalStyles.divider} />
        <Button appearance="ghost" onPress={onCloseModal}>
          Close
        </Button>
      </Layout>
    </Modalize>
  );
}
