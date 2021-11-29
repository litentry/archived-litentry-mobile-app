import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useTheme} from 'context/ThemeContext';
import logo from 'image/logo.png';
import SafeView from 'presentational/SafeView';
import {useIsParachainAvailable} from 'src/api/hooks/useIsParachainAvailable';
import {
  accountsNavigator,
  dashboardScreen,
  devScreen,
  notificationSettingsScreen,
  parachainsNavigator,
  polkassemblyDiscussionsNavigator,
  registrarListScreen,
  webviewScreen,
  parathreadsScreen,
  crowdloanScreen,
  parachainsOverviewScreen,
  parachainAuctionsScreen,
} from 'src/navigation/routeKeys';
import {standardPadding} from 'src/styles';
import {appVersion} from 'src/service/Device';
import {getCurrentYear} from 'src/utils';
import {Drawer, Switch, Text, Divider} from 'src/packages/base_components';

function DrawerScreen({navigation}: DrawerContentComponentProps) {
  const {theme, toggleTheme} = useTheme();
  const isParachainAvailable = useIsParachainAvailable();
  const [activeScreen, setActiveScreen] = React.useState('Dashboard');

  return (
    <SafeView>
      <View>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate(dashboardScreen)}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.slogan}>Decentralized Identity</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <ScrollView>
        <Drawer.Section>
          <Drawer.Item
            label="Dashboard"
            icon="view-dashboard"
            active={activeScreen === 'Dashboard'}
            onPress={() => {
              setActiveScreen('Dashboard');
              navigation.navigate(dashboardScreen);
            }}
          />
          <Drawer.Item
            label="Accounts"
            icon="account-details"
            active={activeScreen === 'Accounts'}
            onPress={() => {
              setActiveScreen('Accounts');
              navigation.navigate(accountsNavigator);
            }}
          />
          <Drawer.Item
            label="Registrars"
            icon="playlist-check"
            active={activeScreen === 'Registrars'}
            onPress={() => {
              setActiveScreen('Registrars');
              navigation.navigate(registrarListScreen);
            }}
          />
          <Drawer.Item
            label="Discussions"
            icon="forum"
            active={activeScreen === 'Discussions'}
            onPress={() => {
              setActiveScreen('Discussions');
              navigation.navigate(polkassemblyDiscussionsNavigator);
            }}
          />
        </Drawer.Section>
        {isParachainAvailable ? (
          <Drawer.Section title="Parachains">
            <Drawer.Item
              label="Overview"
              icon="link-variant"
              active={activeScreen === 'Overview'}
              onPress={() => {
                setActiveScreen('Overview');
                navigation.navigate(parachainsNavigator, {screen: parachainsOverviewScreen});
              }}
            />
            <Drawer.Item
              label="Parathreads"
              icon="link"
              active={activeScreen === 'Parathreads'}
              onPress={() => {
                setActiveScreen('Parathreads');
                navigation.navigate(parachainsNavigator, {screen: parathreadsScreen});
              }}
            />
            <Drawer.Item
              label="Auctions"
              icon="gavel"
              active={activeScreen === 'Auctions'}
              onPress={() => {
                setActiveScreen('Auctions');
                navigation.navigate(parachainsNavigator, {screen: parachainAuctionsScreen});
              }}
            />
            <Drawer.Item
              label="Crowdloan"
              icon="bank-transfer-in"
              active={activeScreen === 'Crowdloan'}
              onPress={() => {
                setActiveScreen('Crowdloan');
                navigation.navigate(parachainsNavigator, {screen: crowdloanScreen});
              }}
            />
          </Drawer.Section>
        ) : null}
        <Drawer.Section title="Settings">
          <Drawer.Item
            label="Dark theme"
            icon="brightness-6"
            right={() => <Switch value={theme === 'dark'} onValueChange={toggleTheme} />}
          />
          <Drawer.Item
            label="Notifications"
            icon="bell"
            active={activeScreen === 'Notifications'}
            onPress={() => {
              setActiveScreen('Notifications');
              navigation.navigate(notificationSettingsScreen);
            }}
          />
          {__DEV__ && (
            <Drawer.Item
              label="Dev Kit"
              icon="code-tags"
              active={activeScreen === 'Dev Kit'}
              onPress={() => {
                setActiveScreen('Dev Kit');
                navigation.navigate(devScreen);
              }}
            />
          )}
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            label="About Litentry"
            icon="information-outline"
            active={activeScreen === 'About Litentry'}
            onPress={() => {
              setActiveScreen('About Litentry');
              navigation.navigate(webviewScreen, {
                title: 'About Litentry',
                uri: 'https://www.litentry.com',
              });
            }}
          />
        </Drawer.Section>
        <Footer />
      </ScrollView>
    </SafeView>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text>{`© ${getCurrentYear()} Litentry Technologies GmbH`}</Text>
      <Text>{`Version ${appVersion()}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: standardPadding,
  },
  logoImage: {width: 50, height: 50},
  slogan: {
    marginLeft: standardPadding * 2,
  },
  overflowMenu: {
    minWidth: 200,
  },
  menuGroup: {
    paddingLeft: 12,
    backgroundColor: undefined,
  },
  footer: {alignItems: 'center', paddingVertical: 15},
});

export default DrawerScreen;
