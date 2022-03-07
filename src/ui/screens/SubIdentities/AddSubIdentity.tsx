import React, {useContext, useCallback, useState, useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput, Button, Tabs, TabScreen, useTabNavigation, useTabIndex} from '@ui/library';
import {NetworkContext} from 'context/NetworkContext';
import QRCamera, {QRCameraRef} from '@ui/components/QRCamera';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {isAddressValid, parseAddress} from 'src/utils/address';
import type {Account} from 'src/api/hooks/useAccount';
import type {SubIdentity} from './RegisterSubIdentitiesScreen';

export function AddSubIdentity({
  onAddPress,
  subIdentities,
}: {
  onAddPress: (subIdentity: SubIdentity) => void;
  subIdentities?: Account[];
}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [subAddress, setSubAddress] = useState('');
  const [subName, setSubName] = useState('');

  const addSubIdentity = () => {
    if (isAddressValid(currentNetwork, subAddress)) {
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
    } else {
      Alert.alert('Validation Failed', 'The address provided is invalid');
    }
  };

  return (
    <>
      <View style={{marginHorizontal: standardPadding * 2}}>
        <TextInput
          mode="outlined"
          placeholder="Sub account name (optional)"
          value={subName}
          onChangeText={(nextSubName) => setSubName(nextSubName)}
        />
      </View>
      <Padder scale={1} />
      <View style={styles.tabViewContainer}>
        <Tabs>
          <TabScreen label="Type in" icon="keyboard">
            <View style={globalStyles.paddedContainer}>
              <TextInput
                mode="outlined"
                onChangeText={(newAddress) => setSubAddress(newAddress)}
                value={subAddress}
                multiline={true}
                style={styles.input}
                placeholder="👉 Paste address here, e.g. 167r...14h"
              />
            </View>
          </TabScreen>
          <TabScreen label="Via QR" icon="qrcode">
            <ScanAddressTab onScanSuccess={setSubAddress} />
          </TabScreen>
        </Tabs>
      </View>
      <View style={globalStyles.paddedContainer}>
        <Button onPress={addSubIdentity} mode="contained">
          Add
        </Button>
      </View>
      <Padder scale={2} />
    </>
  );
}

function ScanAddressTab({onScanSuccess}: {onScanSuccess: (address: string) => void}) {
  const goToTabIndex = useTabNavigation();
  const tabIndex = useTabIndex();
  const qrCameraRef = useRef<QRCameraRef>(null);
  const {currentNetwork} = useContext(NetworkContext);

  const handleScan = useCallback(
    ({data}: {data: string}) => {
      try {
        const parsed = parseAddress(data);
        if (isAddressValid(currentNetwork, parsed.address)) {
          onScanSuccess(parsed.address);
          goToTabIndex(0);
          qrCameraRef.current?.reactivate();
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
    [currentNetwork, onScanSuccess, goToTabIndex],
  );

  return (
    <View style={globalStyles.paddedContainer}>
      {tabIndex === 1 && <QRCamera onRead={handleScan} ref={qrCameraRef} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabViewContainer: {
    minHeight: 400,
  },
  input: {
    minHeight: 100,
  },
});
