import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Button, TextInput, Subheading, Caption} from '@ui/library';
import {RegistrarInfoWithIndex} from 'src/api/hooks/useRegistrars';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {SelectRegistrar} from '@ui/components/SelectRegistrar';

type PropTypes = {
  visible: boolean;
  onClose: () => void;
  onSelect: (registrar: RegistrarInfoWithIndex) => void;
};

function RegistrarSelectionModal({onSelect, visible, onClose}: PropTypes) {
  const formatBalance = useFormatBalance();
  const [registrar, setRegistrar] = useState<RegistrarInfoWithIndex>();

  const handleSelect = useCallback(() => {
    if (registrar) {
      onSelect(registrar);
    }
  }, [onSelect, registrar]);

  const handleClose = () => {
    setRegistrar(undefined);
    onClose();
  };

  const feeDisplay = registrar ? formatBalance(registrar.fee) : '';

  return (
    <Modal visible={visible} onDismiss={onClose}>
      <View style={globalStyles.alignCenter}>
        <Subheading>{`Choose registrar`}</Subheading>
      </View>
      <Padder scale={1} />
      <SelectRegistrar
        onSelect={(selectedRegistrar) => {
          setRegistrar(selectedRegistrar);
        }}
      />
      <Padder scale={1} />
      <Caption>{'Fee'}</Caption>
      <TextInput mode="outlined" dense disabled value={feeDisplay} placeholder="Fee for judgement" />
      <Padder scale={2} />
      <View style={styles.buttons}>
        <Button onPress={handleClose} mode="outlined">
          Cancel
        </Button>
        <Button mode="contained" disabled={!registrar} onPress={handleSelect}>
          Submit
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: standardPadding,
  },
});

export default RegistrarSelectionModal;
