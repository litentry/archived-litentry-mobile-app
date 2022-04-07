import React, {useContext, useEffect, useState} from 'react';
import {TextInput, Icon, HelperText} from '@ui/library';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Padder} from './Padder';
import Clipboard from '@react-native-community/clipboard';
import {isAddressValid} from 'src/utils/address';
import {NetworkContext} from 'context/NetworkContext';

type Props = {
  addressValid: (dispatch: boolean) => void;
};

export function AddressInput(props: Props) {
  const [address, setAddress] = useState('');
  const [addressValid, setAddressValid] = useState(false);
  const {currentNetwork} = useContext(NetworkContext);

  const onPastePress = async () => {
    const pastText = await Clipboard.getString();
    setAddress(pastText);
  };

  useEffect(() => {
    setAddressValid(isAddressValid(currentNetwork, address));
    props.addressValid(isAddressValid(currentNetwork, address));
    setAddressValid(isAddressValid(currentNetwork, address));
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
          <TouchableOpacity>
            <Icon name="qrcode-scan" size={30} />
          </TouchableOpacity>
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
});

export default AddressInput;
