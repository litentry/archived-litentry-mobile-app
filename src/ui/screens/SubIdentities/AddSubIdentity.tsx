import React, {useCallback, useState, useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TextInput, Button, useTheme, HelperText} from '@ui/library';
import {useNetwork} from '@atoms/network';
import QRCamera, {QRCameraRef} from '@ui/components/QRCamera';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {parseAddress} from 'src/utils/address';
import type {Account} from 'src/api/hooks/useAccount';
import type {SubIdentity} from './RegisterSubIdentitiesScreen';
import {useIsAddressValid} from 'src/hooks/useIsAddressValid';
import {useNavigation} from '@react-navigation/native';

type Props = {
  onClose: () => void;
  onAddPress: (subIdentity: SubIdentity) => void;
  subIdentities?: Account[];
};

const Tab = createMaterialTopTabNavigator();

export function AddSubIdentity({onClose, onAddPress, subIdentities}: Props) {
  const {currentNetwork} = useNetwork();
  const [subAddress, setSubAddress] = useState('');
  const [subName, setSubName] = useState('');
  const {colors} = useTheme();
  const {isValid: isAddressValid} = useIsAddressValid(currentNetwork, subAddress);

  const addSubIdentity = () => {
    if (subIdentities?.some((sub) => sub.address === subAddress)) {
      Alert.alert(
        'Validation Failed',
        'The account is already registered. Remove the account first if you want to change its name',
      );
    } else {
      onAddPress({
        address: subAddress,
        display: subName,
      });
    }
  };

  const TypeInTabScreen = React.useCallback(() => {
    return (
      <View style={globalStyles.paddedContainer}>
        <TextInput
          mode="outlined"
          onChangeText={(newAddress) => setSubAddress(newAddress)}
          value={subAddress}
          multiline={true}
          style={styles.input}
          placeholder="👉 Paste address here, e.g. 167r...14h"
        />
        <HelperText
          type="error"
          visible={
            Boolean(subAddress) && !isAddressValid
          }>{`${subAddress} is not a valid address for ${currentNetwork.name} network`}</HelperText>
      </View>
    );
  }, [currentNetwork.name, isAddressValid, subAddress]);

  const ViaQRTabScreen = React.useCallback(() => {
    return <ScanAddressTab onScanSuccess={setSubAddress} />;
  }, []);

  return (
    <>
      <View style={styles.accountName}>
        <TextInput
          dense
          mode="outlined"
          placeholder="Sub account name (optional)"
          value={subName}
          onChangeText={(nextSubName) => setSubName(nextSubName)}
        />
      </View>
      <Padder scale={1} />
      <View style={styles.tabViewContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {color: colors.secondary},
            tabBarStyle: {backgroundColor: colors.background},
          }}>
          <Tab.Screen name="Type in" component={TypeInTabScreen} />
          <Tab.Screen name="Via QR" component={ViaQRTabScreen} />
        </Tab.Navigator>
      </View>

      <View style={styles.row}>
        <Button mode="outlined" onPress={onClose}>
          Cancel
        </Button>
        <Button mode="contained" disabled={!isAddressValid} onPress={addSubIdentity} testID="add-identity-button">
          Add Identity
        </Button>
      </View>
      <Padder scale={1.5} />
    </>
  );
}

function ScanAddressTab({onScanSuccess}: {onScanSuccess: (address: string) => void}) {
  const {navigate} = useNavigation();
  const qrCameraRef = useRef<QRCameraRef>(null);
  const {currentNetwork} = useNetwork();
  const {isAddressValid} = useIsAddressValid(currentNetwork);

  const handleScan = useCallback(
    ({data}: {data: string}) => {
      try {
        const parsed = parseAddress(data);
        isAddressValid(parsed.address).then((isValid) => {
          if (isValid) {
            onScanSuccess(parsed.address);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO: fix this when updating the top tabs
            navigate('Type in');
            qrCameraRef.current?.reactivate();
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
    [currentNetwork, onScanSuccess, isAddressValid, navigate],
  );

  return (
    <View style={globalStyles.paddedContainer}>
      <QRCamera onRead={handleScan} ref={qrCameraRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  accountName: {
    marginHorizontal: standardPadding * 2,
  },
  tabViewContainer: {
    minHeight: 300,
  },
  input: {
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
