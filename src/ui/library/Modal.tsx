import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal as RNPaperModal, Portal, useTheme} from 'react-native-paper';

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

export function Modal({visible, onDismiss, children}: ModalProps) {
  const {colors} = useTheme();

  return (
    <Portal>
      <RNPaperModal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, {backgroundColor: colors.background}]}>
        {children}
      </RNPaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 5,
  },
});
