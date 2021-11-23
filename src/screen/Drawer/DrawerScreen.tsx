import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Divider, Icon, Layout, ListItem, Text, Toggle, MenuGroup, MenuItem} from '@ui-kitten/components';
import {useTheme} from 'context/ThemeContext';
import logo from 'image/logo.png';
import SafeView from 'presentational/SafeView';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import {appVersion} from 'src/service/Device';
import {getCurrentYear} from 'src/utils';

function DrawerScreen({navigation}: DrawerContentComponentProps) {
  const {theme, toggleTheme} = useTheme();
  const isParachainAvailable = useIsParachainAvailable();

  return (
    <SafeView>
      <Layout style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate(dashboardScreen)}>
            <Image source={logo} style={styles.logoImage} />
            <Text style={styles.slogan}>Decentralized Identity</Text>
          </TouchableOpacity>
        </View>
        <Layout style={styles.rest}>
          <Divider />
          <ListItem
            title="Dashboard"
            accessoryLeft={(props) => <Icon {...props} name="browser-outline" animation="zoom" />}
            onPress={() => navigation.navigate(dashboardScreen)}
          />
          <Divider />
          <ListItem
            title="Accounts"
            accessoryLeft={(props) => <Icon {...props} name="person-outline" animation="zoom" />}
            onPress={() => navigation.navigate(accountsNavigator)}
          />
          <Divider />
          {isParachainAvailable ? (
            <MenuGroup
              title="Parachains"
              accessoryLeft={(props) => <Icon {...props} name="link-2-outline" animation="zoom" />}
              style={styles.menuGroup}>
              <MenuItem
                title="Overview"
                onPress={() => navigation.navigate(parachainsNavigator, {screen: parachainsOverviewScreen})}
              />
              <MenuItem
                title="Crowdloan"
                onPress={() => {
                  navigation.navigate(parachainsNavigator, {screen: crowdloanScreen});
                }}
              />
              <MenuItem
                title="Parathreads"
                onPress={() => navigation.navigate(parachainsNavigator, {screen: parathreadsScreen})}
              />
              <MenuItem
                title="Auctions"
                onPress={() => navigation.navigate(parachainsNavigator, {screen: parachainAuctionsScreen})}
              />
            </MenuGroup>
          ) : null}
          <Divider />
          <ListItem
            title="Registrars"
            accessoryLeft={(props) => <Icon {...props} name="award-outline" animation="zoom" />}
            onPress={() => navigation.navigate(registrarListScreen)}
          />
          <Divider />
          <ListItem
            title="Discussions"
            accessoryLeft={(props) => <Icon {...props} name="message-square-outline" animation="zoom" />}
            onPress={() => navigation.navigate(polkassemblyDiscussionsNavigator)}
          />
          <Divider />
          <ListItem
            title="About Litentry"
            description="Read more about us."
            accessoryLeft={(props) => <Icon {...props} name="hash-outline" animation="zoom" />}
            onPress={() =>
              navigation.navigate(webviewScreen, {
                title: 'About Litentry',
                uri: 'https://www.litentry.com',
              })
            }
          />
          <Divider />
          <Layout style={globalStyles.paddedContainer}>
            <Text category="h6">Settings</Text>
          </Layout>
          <ListItem
            title="Dark theme"
            accessoryLeft={(props) => <Icon {...props} name="sun-outline" animation="zoom" />}
            accessoryRight={() => <Toggle checked={theme === 'dark'} onChange={toggleTheme} />}
          />
          <Divider />
          <ListItem
            title="Notifications"
            description="Personalize notifications settings."
            accessoryLeft={(props) => <Icon {...props} name="bell-outline" animation="zoom" />}
            onPress={() => navigation.navigate(notificationSettingsScreen)}
          />
          <Divider />
          {__DEV__ && (
            <>
              <ListItem
                title="Dev Kit"
                description="Here lists the helpers for devs"
                accessoryLeft={(props) => <Icon {...props} name="code-outline" animation="zoom" />}
                onPress={() => navigation.navigate(devScreen)}
              />
              <Divider />
            </>
          )}
        </Layout>
        <Footer />
      </Layout>
    </SafeView>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text category="c2">{`© ${getCurrentYear()} Litentry Technologies GmbH`}</Text>
      <Text category="c2">{`Version ${appVersion()}`}</Text>
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
    fontFamily: monofontFamily,
    fontSize: 12,
  },
  main: {},
  rest: {flex: 1},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
