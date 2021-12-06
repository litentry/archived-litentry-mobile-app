import React from 'react';
import {Modal as RNModal} from 'react-native';
import SafeView from './SafeView';
import useHapticFeedback from 'src/hook/useHapticFeedback';

type PropTypes = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function PageModal(props: PropTypes) {
  const {visible, onClose, children} = props;
  const trigger = useHapticFeedback();

  return (
    <RNModal
      visible={visible}
      onShow={() => trigger('success')}
      hardwareAccelerated
      presentationStyle="pageSheet"
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}>
      <SafeView>{children}</SafeView>
    </RNModal>
  );
}

export default PageModal;
