import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput, Text, Icon} from '@ui/library';
import {Registrar} from 'src/api/hooks/useRegistrarsSummary';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {SelectRegistrar} from '@ui/components/SelectRegistrar';
import {Layout} from '@ui/components/Layout';

type Props = {
  onClose: () => void;
  onRequest: (registrar: Registrar) => void;
};

export function RequestJudgement({onRequest, onClose}: Props) {
  const {formatBalance} = useFormatBalance();
  const [registrar, setRegistrar] = useState<Registrar>();

  const handleRequest = useCallback(() => {
    if (registrar) {
      onRequest(registrar);
    }
  }, [onRequest, registrar]);

  const handleClose = () => {
    setRegistrar(undefined);
    onClose();
  };

  const feeDisplay = registrar ? formatBalance(registrar.fee) : '';

  return (
    <Layout style={styles.container}>
      <Text variant="titleMedium" style={globalStyles.textCenter}>{`Choose registrar`}</Text>
      <Padder scale={1} />
      <SelectRegistrar
        onSelect={(selectedRegistrar) => {
          setRegistrar(selectedRegistrar);
        }}
      />
      <Padder scale={1} />
      <TextInput mode="outlined" dense disabled value={feeDisplay} placeholder="Fee for judgement" />
      <Padder scale={0.5} />
      <View style={styles.info}>
        <Icon name="alert-circle-outline" size={20} />
        <Text variant="bodySmall" style={styles.caption}>{`Fee paid to registrar to provide Judgement`}</Text>
      </View>
      <Padder scale={2} />
      <View style={styles.buttons}>
        <Button onPress={handleClose} mode="outlined">
          Cancel
        </Button>
        <Button mode="contained" disabled={!registrar} onPress={handleRequest} testID="judgement-submit-button">
          Submit
        </Button>
      </View>
      <Padder scale={2} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: standardPadding * 2,
  },
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
