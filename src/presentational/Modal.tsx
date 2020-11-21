import React from 'react';
import {Modal as RNModal} from 'react-native';
import SafeView from './SafeView';

type PropTypes = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal(props: PropTypes) {
  const {visible, onClose, children} = props;

  return (
    <RNModal
      visible={visible}
      hardwareAccelerated
      presentationStyle="pageSheet"
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}>
      <SafeView>{children}</SafeView>
    </RNModal>
  );
}

export default Modal;
