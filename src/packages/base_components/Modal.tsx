import React from 'react';
import {Modal as RNPaperModal, Portal} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

export function Modal({visible, onDismiss, children}: ModalProps) {
  return (
    <Portal>
      <RNPaperModal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        {children}
      </RNPaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 24,
  },
});
