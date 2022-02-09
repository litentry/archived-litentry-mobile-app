import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useToggleTheme} from 'context/ThemeContext';
import logo from 'image/logo.png';
import SafeView from '@ui/components/SafeView';
import {useIsParachainAvailable} from 'src/api/hooks/useIsParachainAvailable';
import {
  accountsNavigator,
  dashboardScreen,
  devScreen,
  notificationSettingsScreen,
  polkassemblyDiscussionsNavigator,
  registrarListScreen,
  webviewScreen,
  parathreadsScreen,
  crowdloanScreen,
  parachainsOverviewScreen,
  parachainAuctionsScreen,
  feedbackScreen,
  parachainsNavigator,
  crowdloansNavigator,
} from '@ui/navigation/routeKeys';
import {standardPadding} from '@ui/styles';
import {appVersion} from 'src/service/Device';
import {getCurrentYear} from 'src/utils/date';
import {Drawer, Switch, Text, Divider} from '@ui/library';

function DrawerScreen({navigation}: DrawerContentComponentProps) {
  const {theme, toggleTheme} = useToggleTheme();
  const isParachainAvailable = useIsParachainAvailable();
  const [activeScreen, setActiveScreen] = React.useState<string>(dashboardScreen);

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
            active={activeScreen === dashboardScreen}
            onPress={() => {
              setActiveScreen(dashboardScreen);
              navigation.navigate(dashboardScreen);
            }}
          />
          <Drawer.Item
            label="Accounts"
            icon="account-details"
            active={activeScreen === accountsNavigator}
            onPress={() => {
              setActiveScreen(accountsNavigator);
              navigation.navigate(accountsNavigator);
            }}
          />
          <Drawer.Item
            label="Registrars"
            icon="playlist-check"
            active={activeScreen === registrarListScreen}
            onPress={() => {
              setActiveScreen(registrarListScreen);
              navigation.navigate(registrarListScreen);
            }}
          />
          <Drawer.Item
            label="Discussions"
            icon="forum"
            active={activeScreen === polkassemblyDiscussionsNavigator}
            onPress={() => {
              setActiveScreen(polkassemblyDiscussionsNavigator);
              navigation.navigate(polkassemblyDiscussionsNavigator);
            }}
          />
        </Drawer.Section>
        {isParachainAvailable ? (
          <Drawer.Section title="Parachains">
            <Drawer.Item
              label="Overview"
              icon="link-variant"
              active={activeScreen === parachainsOverviewScreen}
              onPress={() => {
                setActiveScreen(parachainsOverviewScreen);
                navigation.navigate(parachainsNavigator, {screen: parachainsOverviewScreen});
              }}
            />
            <Drawer.Item
              label="Parathreads"
              icon="link"
              active={activeScreen === parathreadsScreen}
              onPress={() => {
                setActiveScreen(parathreadsScreen);
                navigation.navigate(parathreadsScreen);
              }}
            />
            <Drawer.Item
              label="Auctions"
              icon="gavel"
              active={activeScreen === parachainAuctionsScreen}
              onPress={() => {
                setActiveScreen(parachainAuctionsScreen);
                navigation.navigate(parachainAuctionsScreen);
              }}
            />
            <Drawer.Item
              label="Crowdloan"
              icon="bank-transfer-in"
              active={activeScreen === crowdloanScreen}
              onPress={() => {
                setActiveScreen(crowdloanScreen);
                navigation.navigate(crowdloansNavigator, {screen: crowdloanScreen});
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
            active={activeScreen === notificationSettingsScreen}
            onPress={() => {
              setActiveScreen(notificationSettingsScreen);
              navigation.navigate(notificationSettingsScreen);
            }}
          />
          {__DEV__ && (
            <Drawer.Item
              label="Dev Kit"
              icon="code-tags"
              active={activeScreen === devScreen}
              onPress={() => {
                setActiveScreen(devScreen);
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
          <Drawer.Item
            label="Feedback"
            icon="comment-question-outline"
            active={activeScreen === feedbackScreen}
            onPress={() => {
              setActiveScreen(feedbackScreen);
              navigation.navigate(feedbackScreen);
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
