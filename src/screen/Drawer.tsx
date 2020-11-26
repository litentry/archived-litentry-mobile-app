import React, {useContext, useMemo, useCallback} from 'react';
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
import {trim, get} from 'lodash';
import {AccountAddressType} from 'src/types';
import {AccountContext} from 'context/AccountContextProvider';
import {NetworkContext} from 'context/NetworkContext';
import NetworkLogo from 'presentational/NetworkLogo';

function parseAddress(payload: string): AccountAddressType {
  const parts = trim(payload).split(':').filter(Boolean);
  if (parts.length !== 4) {
    throw new Error('address format wrong');
  }

  return {protocol: parts[0], address: parts[1], name: parts[3]};
}

function AccountDrawerView() {
  const {scan} = useContext(ScannerContext);
  const {accounts, setAccount} = useContext(AccountContext);
  const {currentNetwork} = useContext(NetworkContext);

  const handleScan = useCallback(
    ({data}) => {
      setAccount(parseAddress(data));
    },
    [setAccount],
  );

  const account = useMemo(() => get(accounts, [0]), [accounts]);

  return (
    <Layout
      style={[
        globalStyles.centeredContainer,
        account ? {justifyContent: 'flex-end'} : {},
      ]}>
      {account ? (
        <Layout style={accountDrawerViewStyles.container}>
          <Layout style={accountDrawerViewStyles.accountLogo}>
            {currentNetwork ? (
              <NetworkLogo name={currentNetwork.key || 'polkadot'} />
            ) : null}
            <Text category="s2">{account.name || 'Untitled Account'}</Text>
          </Layout>
          <Layout>
            <Text
              style={accountDrawerViewStyles.address}
              numberOfLines={1}
              ellipsizeMode="middle">
              {account.address}
            </Text>
          </Layout>
        </Layout>
      ) : (
        <>
          <Text category="label">No account has been set up.</Text>
          <Padder scale={0.5} />
          <Button
            onPress={() => scan(handleScan)}
            appearance="ghost"
            status="info">
            Connect Account
          </Button>
        </>
      )}
    </Layout>
  );
}

const accountDrawerViewStyles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  accountLogo: {
    marginLeft: -standardPadding,
    paddingBottom: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {fontFamily: monofontFamily},
});

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
