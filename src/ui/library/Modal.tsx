import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal as RNPaperModal, Portal} from 'react-native-paper';

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
