import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {TextInput, Icon, HelperText, Button} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Padder} from './Padder';
import Clipboard from '@react-native-community/clipboard';
import {isAddressValid, parseAddress} from 'src/utils/address';
import {NetworkContext} from 'context/NetworkContext';
import {Alert, Modal, StyleSheet, Pressable, View} from 'react-native';
import QRCamera, {QRCameraRef} from './QRCamera';

type Props = {
  addressValid: (dispatch: boolean) => void;
  address: (dispatch: string) => void;
};

export function AddressInput(props: Props) {
  const [address, setAddress] = useState('');
  const [addressValid, setAddressValid] = useState(false);
  const {currentNetwork} = useContext(NetworkContext);
  const qrCameraRef = useRef<QRCameraRef>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onPastePress = async () => {
    const pastText = await Clipboard.getString();
    setAddress(pastText);
  };

  const handleScan = useCallback(
    ({data}: {data: string}) => {
      try {
        const parsed = parseAddress(data);
        if (isAddressValid(currentNetwork, parsed.address)) {
          setAddress(parsed.address);
          setModalVisible(!modalVisible);
        } else {
          Alert.alert(
            'Validation Failed',
            `${parsed.address} is not a valid address for the ${currentNetwork.name} network.`,
            [{text: 'Ok', onPress: () => qrCameraRef.current?.reactivate()}],
          );
        }
      } catch (e) {
        Alert.alert('Validation Failed', 'Address is invalid.', [
          {text: 'Ok', onPress: () => qrCameraRef.current?.reactivate()},
        ]);
      }
    },
    [currentNetwork, modalVisible],
  );

  useEffect(() => {
    setAddressValid(isAddressValid(currentNetwork, address));
    props.addressValid(isAddressValid(currentNetwork, address));
    setAddressValid(isAddressValid(currentNetwork, address));
    props.address(address);
  }, [address, currentNetwork, props]);

  return (
    <>
      <View style={globalStyles.spaceBetweenRowContainer}>
        <TextInput
          autoCorrect={false}
          placeholder="Account address"
          dense
          mode="outlined"
          style={styles.textInput}
          value={address}
          onChangeText={(nextValue) => setAddress(nextValue)}
        />
        <View style={styles.icons}>
          <TouchableOpacity onPress={onPastePress}>
            <Icon name="content-paste" size={30} />
          </TouchableOpacity>
          <Padder />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <QRCamera onRead={handleScan} ref={qrCameraRef} />
                <Padder scale={2} />
                <Button onPress={() => setModalVisible(!modalVisible)}> Close </Button>
              </View>
            </View>
          </Modal>

          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name="qrcode-scan" size={30} />
          </Pressable>
        </View>
      </View>

      {!addressValid && address ? (
        <HelperText type="error" style={styles.error}>
          Enter a valid address
        </HelperText>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    width: '75%',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: standardPadding,
  },
  error: {
    right: standardPadding,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: standardPadding * 2,
    shadowOpacity: 0.25,
    elevation: 5,
  },
});

export default AddressInput;
