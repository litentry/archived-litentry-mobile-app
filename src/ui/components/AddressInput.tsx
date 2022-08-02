import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Modal, StyleSheet, View, TextInputProps} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {TextInput, HelperText, Button, Title, IconButton} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {parseAddress} from 'src/utils/address';
import {useNetwork} from '@atoms/network';
import {useSnackbar} from 'context/SnackbarContext';
import QRCamera, {QRCameraRef} from './QRCamera';
import {Padder} from './Padder';
import {useIsAddressValid} from 'src/hooks/useIsAddressValid';

type Props = {
  onValidateAddress: (isValid: boolean) => void;
  onAddressChanged: (address: string) => void;
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
};

export function AddressInput({onAddressChanged, onValidateAddress, onFocus, onBlur}: Props) {
  const [inputAddress, setInputAddress] = useState<string>();
  const [addressValid, setAddressValid] = useState(false);
  const {currentNetwork} = useNetwork();
  const qrCameraRef = useRef<QRCameraRef>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const snackbar = useSnackbar();
  const {isAddressValid} = useIsAddressValid(currentNetwork);

  const updateInputAddress = useCallback(
    (address: string) => {
      setInputAddress(address);
      onAddressChanged(address);
    },
    [onAddressChanged],
  );

  const onPastePress = useCallback(async () => {
    const pastedAddress = await Clipboard.getString();
    updateInputAddress(pastedAddress);
    snackbar('Address pasted from clipboard!');
  }, [updateInputAddress, snackbar]);

  const handleScan = useCallback(
    ({data}: {data: string}) => {
      try {
        const parsed = parseAddress(data);
        isAddressValid(parsed.address).then((isValid) => {
          if (isValid) {
            updateInputAddress(parsed.address);
            setModalVisible(false);
          } else {
            Alert.alert(
              'Validation Failed',
              `${parsed.address} is not a valid address for the ${currentNetwork.name} network.`,
              [{text: 'Ok', onPress: () => qrCameraRef.current?.reactivate()}],
            );
          }
        });
      } catch (e) {
        Alert.alert('Validation Failed', 'Address is invalid.', [
          {text: 'Ok', onPress: () => qrCameraRef.current?.reactivate()},
        ]);
      }
    },
    [currentNetwork, updateInputAddress, isAddressValid],
  );

  useEffect(
    function validateAddress() {
      if (inputAddress) {
        isAddressValid(inputAddress).then((isValid) => {
          onValidateAddress(isValid);
          setAddressValid(isValid);
        });
      }
    },
    [inputAddress, onValidateAddress, currentNetwork, isAddressValid],
  );

  return (
    <>
      <View style={globalStyles.spaceBetweenRowContainer}>
        <TextInput
          {...{onFocus, onBlur}}
          autoCorrect={false}
          placeholder="Account address"
          multiline
          dense
          mode="outlined"
          style={styles.textInput}
          value={inputAddress}
          onChangeText={updateInputAddress}
        />
        <View style={styles.icons}>
          <IconButton icon="content-paste" onPress={onPastePress} />
          <IconButton icon="qrcode-scan" onPress={() => setModalVisible(true)} />
        </View>
      </View>

      {!addressValid && inputAddress ? (
        <HelperText type="error" style={styles.error}>
          {`Enter a valid address for ${currentNetwork.name}`}
        </HelperText>
      ) : null}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title style={globalStyles.textCenter}>Scan the address QR code</Title>
            <Padder scale={1.5} />
            <QRCamera onRead={handleScan} ref={qrCameraRef} />
            <Padder scale={3} />
            <Button compact onPress={() => setModalVisible(!modalVisible)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '75%',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    right: standardPadding,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    elevation: 5,
    height: 400,
    paddingVertical: 30,
  },
});

export default AddressInput;
