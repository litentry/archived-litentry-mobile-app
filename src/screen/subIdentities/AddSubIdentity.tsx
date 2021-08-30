import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Layout, Tab, TabView, IconProps, Text, Icon} from '@ui-kitten/components';

import type {SubIdentity} from 'src/api/hooks/useSubIdentities';
import {NetworkContext} from 'context/NetworkContext';
import {isAddressValid, parseAddress} from 'src/utils';
import {monofontFamily, standardPadding} from 'src/styles';
import QRCamera from 'presentational/QRCamera';
import Padder from 'presentational/Padder';

const QrIcon = (props: IconProps) => (
  <Layout style={styles.tabTitle}>
    <Text category="s1">Via QR</Text>
    <Padder scale={0.5} />
    <Icon {...props} pack="ionic" name="qr-code-sharp" />
  </Layout>
);

const InputIcon = (props: IconProps) => (
  <Layout style={styles.tabTitle}>
    <Text category="s1">Type in</Text>
    <Padder scale={0.5} />
    <Icon {...props} pack="ionic" name="keypad-outline" />
  </Layout>
);

export function AddSubIdentity({onAddPress}: {onAddPress: (subIdentity: SubIdentity) => void}) {
  const {currentNetwork} = useContext(NetworkContext);
  const [tabIndex, setTabIndex] = useState(0);
  const [subAddress, setSubAddress] = useState('');
  const [subName, setSubName] = useState('');

  const handleScan = ({data}: {data: string}) => {
    const parsed = parseAddress(data);
    setSubAddress(parsed.address);
  };

  const addSubIdentity = () => {
    if (isAddressValid(currentNetwork, subAddress)) {
      onAddPress({accountId: subAddress, name: subName});
    } else {
      Alert.alert('Validation Failed', 'The Address provided is invalid');
    }
  };

  return (
    <View>
      <Input
        placeholder="Sub account name (optional)"
        value={subName}
        onChangeText={(nextSubName) => setSubName(nextSubName)}
      />
      <TabView
        shouldLoadComponent={(index) => {
          return tabIndex === index;
        }}
        indicatorStyle={styles.tabViewIndicator}
        style={styles.tabViewContainer}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}>
        <Tab title={InputIcon}>
          <Layout style={styles.tabContainer}>
            <Input
              onChangeText={(newAddress) => setSubAddress(newAddress)}
              value={subAddress}
              multiline={true}
              textStyle={styles.input}
              placeholder="👉 Paste address here, e.g. 167r...14h"
            />
          </Layout>
        </Tab>
        <Tab title={QrIcon}>
          <Layout style={styles.tabContainer}>
            <QRCamera onRead={handleScan} />
          </Layout>
        </Tab>
      </TabView>
      <Button onPress={addSubIdentity} style={styles.addButton}>
        Add
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  tabViewContainer: {
    paddingVertical: standardPadding * 2,
    height: 410,
  },
  tabTitle: {
    flexDirection: 'row',
  },
  tabContainer: {
    paddingVertical: standardPadding,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 16,
    minHeight: 250,
    fontFamily: monofontFamily,
  },
  tabViewIndicator: {
    height: 1,
  },
  addButton: {
    marginBottom: 30,
    marginTop: 10,
  },
});
