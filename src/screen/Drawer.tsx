import React, {useContext, useMemo} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Divider,
  Toggle,
  ListItem,
} from '@ui-kitten/components';
import SafeView from 'presentational/SafeView';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import {ThemeContext} from 'context/ThemeProvider';
import logo from '../image/logo.png';
import Padder from 'presentational/Padder';
import {ScannerContext} from 'context/ScannerContext';
import {trim} from 'lodash';

type AccountAddressType = {
  address: string;
  protocol?: string;
  name?: string;
};

function parseAddress(payload: string): AccountAddressType {
  const parts = trim(payload).split(':').filter(Boolean);

  if (parts.length === 1) {
    return {address: parts[0]};
  }

  return {protocol: parts[0], address: parts[1], name: parts[2]};
}

function AccountDrawerView() {
  const {scan, data} = useContext(ScannerContext);

  const parsed = useMemo(() => {
    if (!data.result) {
      return null;
    }

    return parseAddress(data.result.data);
  }, [data]);

  return (
    <Layout style={globalStyles.centeredContainer}>
      {parsed ? (
        <Text style={{fontFamily: monofontFamily}}>{parsed.address}</Text>
      ) : (
        <>
          <Text category="label">No account has been set up.</Text>
          <Padder scale={0.5} />
          <Button onPress={scan} appearance="ghost" status="info">
            Connect Account
          </Button>
        </>
      )}
    </Layout>
  );
}

function Drawer() {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <SafeView>
      <Layout style={styles.container}>
        <Layout style={[styles.main, globalStyles.paddedContainer]}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logoImage} />
            <Text style={styles.slogan}>Decentralized Identity</Text>
          </View>
          <Divider />
          <AccountDrawerView />
        </Layout>
        <Divider />
        <Layout style={styles.rest} level="2">
          <Layout style={globalStyles.paddedContainer}>
            <Text category="h6">Settings</Text>
          </Layout>
          <ListItem
            title="Dark theme"
            accessoryRight={() => (
              <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
            )}
          />
        </Layout>
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: standardPadding * 2,
  },
  logoImage: {width: 50, height: 50},
  slogan: {
    marginLeft: standardPadding * 2,
    fontFamily: monofontFamily,
    fontSize: 12,
  },
  main: {
    height: '35%',
  },
  rest: {flex: 1},
});

export default Drawer;
