import React, {useRef, useContext, useEffect} from 'react';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {Modalize} from 'react-native-modalize';

import {NetworkContext} from 'context/NetworkContext';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import globalStyles from 'src/styles';

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
        <NetworkSelectionList
          items={availableNetworks}
          selected={currentNetwork}
          onSelect={(item) => {
            select(item);
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
