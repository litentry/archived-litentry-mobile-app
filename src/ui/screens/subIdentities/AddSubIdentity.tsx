import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput, Button, Tabs, TabScreen} from '@ui/library';
import {NetworkContext} from 'context/NetworkContext';
import QRCamera from '@ui/components/QRCamera';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {isAddressValid, parseAddress} from 'src/utils/address';

export function AddSubIdentity({
  onAddPress,
  subIdentities,
}: {
  onAddPress: (subIdentity: IdentityInfo) => void;
  subIdentities: IdentityInfo[];
}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [subAddress, setSubAddress] = useState('');
  const [subName, setSubName] = useState('');

  const handleScan = ({data}: {data: string}) => {
    const parsed = parseAddress(data);
    setSubAddress(parsed.address);
  };

  const addSubIdentity = () => {
    if (isAddressValid(currentNetwork, subAddress)) {
      if (subIdentities.some((sub) => sub.accountId === subAddress)) {
        Alert.alert(
          'Validation Failed',
          'The account is already registered. Remove the account first if you want to change its name',
        );
      } else {
        onAddPress({
          accountId: subAddress,
          display: subAddress,
          registration: {display: subName, judgements: []},
          hasJudgements: false,
          hasIdentity: true,
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
            <View style={globalStyles.paddedContainer}>
              <QRCamera onRead={handleScan} />
            </View>
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

const styles = StyleSheet.create({
  tabViewContainer: {
    minHeight: 400,
  },
  input: {
    minHeight: 100,
  },
});
