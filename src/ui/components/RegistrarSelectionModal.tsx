import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Button, TextInput, Subheading, Caption, Icon} from '@ui/library';
import {Registrar, useRegistrarsSummary} from 'src/api/hooks/useRegistrarsSummary';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {SelectAccount} from './SelectAccount';
import {AccountTeaser} from './Account/AccountTeaser';

type PropTypes = {
  visible: boolean;
  onClose: () => void;
  onSelect: (registrar: Registrar) => void;
};

function RegistrarSelectionModal({onSelect, visible, onClose}: PropTypes) {
  const {formatBalance} = useFormatBalance();
  const [registrar, setRegistrar] = useState<Registrar>();
  const {data: registrarSummary} = useRegistrarsSummary();

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

      <SelectAccount
        accounts={registrarSummary?.list ?? []}
        onSelect={(account) => {
          setRegistrar(account as Registrar);
        }}
        placeholder="Select registrar"
        renderItem={(item, onPress) => (
          <View style={globalStyles.paddedContainer}>
            <AccountTeaser account={item.account} onPress={onPress}>
              <View style={globalStyles.rowAlignCenter}>
                <Caption>{`Index: ${item.id}`}</Caption>
                <Padder scale={0.5} />
                <Caption>{`Fee: ${item.formattedFee}`}</Caption>
              </View>
            </AccountTeaser>
          </View>
        )}
      />
      <Padder scale={1} />
      <TextInput mode="outlined" dense disabled value={feeDisplay} placeholder="Fee for judgement" />
      <Padder scale={0.5} />
      <View style={styles.info}>
        <Icon name="alert-circle-outline" size={20} />
        <Caption style={styles.caption}>{`Fee paid to registrar to provide Judgement`}</Caption>
      </View>
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
  caption: {
    marginTop: 0,
    marginLeft: 3,
  },
  info: {
    flexDirection: 'row',
  },
});

export default RegistrarSelectionModal;
