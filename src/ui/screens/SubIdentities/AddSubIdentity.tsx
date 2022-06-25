import React, {useCallback, useState, useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput, Button, Tabs, TabScreen, useTabNavigation, useTabIndex, useTheme, HelperText} from '@ui/library';
import {useNetwork} from 'context/NetworkContext';
import QRCamera, {QRCameraRef} from '@ui/components/QRCamera';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {isAddressValid, parseAddress} from 'src/utils/address';
import type {Account} from 'src/api/hooks/useAccount';
import type {SubIdentity} from './RegisterSubIdentitiesScreen';

type Props = {
  onClose: () => void;
  onAddPress: (subIdentity: SubIdentity) => void;
  subIdentities?: Account[];
};

export function AddSubIdentity({onClose, onAddPress, subIdentities}: Props) {
  const {currentNetwork} = useNetwork();
  const [subAddress, setSubAddress] = useState('');
  const [subName, setSubName] = useState('');
  const {colors} = useTheme();

  const isValidAddress = React.useMemo(() => {
    return isAddressValid(currentNetwork, subAddress);
  }, [subAddress, currentNetwork]);

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
        <Tabs style={{backgroundColor: colors.background}}>
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
              <HelperText
                type="error"
                visible={
                  Boolean(subAddress) && !isValidAddress
                }>{`${subAddress} is not a valid address for ${currentNetwork.name} network`}</HelperText>
            </View>
          </TabScreen>
          <TabScreen label="Via QR" icon="qrcode">
            <ScanAddressTab onScanSuccess={setSubAddress} />
          </TabScreen>
        </Tabs>
      </View>

      <View style={styles.row}>
        <Button mode="outlined" onPress={onClose} testID="cancel-identity-button">
          Cancel
        </Button>
        <Button mode="contained" disabled={!isValidAddress} onPress={addSubIdentity} testID="add-identity-button">
          Add Identity
        </Button>
      </View>
      <Padder scale={1.5} />
    </>
  );
}

function ScanAddressTab({onScanSuccess}: {onScanSuccess: (address: string) => void}) {
  const goToTabIndex = useTabNavigation();
  const tabIndex = useTabIndex();
  const qrCameraRef = useRef<QRCameraRef>(null);
  const {currentNetwork} = useNetwork();

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
