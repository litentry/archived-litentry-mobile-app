import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useToggleTheme} from 'context/ThemeContext';
import {useNetwork} from '@atoms/network';
import logo from 'image/logo.png';
import SafeView from '@ui/components/SafeView';
import {useIsParachainAvailable} from 'src/api/hooks/useIsParachainAvailable';
import * as routeKeys from '@ui/navigation/routeKeys';
import {standardPadding} from '@ui/styles';
import {appVersion} from 'src/service/Device';
import {getCurrentYear} from 'src/utils/date';
import {Drawer, Switch, Text, Divider} from '@ui/library';

type RouteKey = keyof typeof routeKeys;
type Route = typeof routeKeys[RouteKey];

export function DrawerScreen({navigation, state}: DrawerContentComponentProps) {
  const {currentNetwork} = useNetwork();
  const {theme, toggleTheme} = useToggleTheme();
  const isParachainAvailable = useIsParachainAvailable();
  const currentRoute = state.routes[state.index];
  const activeScreen = currentRoute?.name;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeParams = currentRoute?.params as any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigateToScreen = (screen: Route, params?: Record<string, any>) => () => {
    navigation.closeDrawer();
    navigation.navigate(screen as string, params);
  };

  return (
    <SafeView>
      <View>
        <TouchableOpacity style={styles.logoContainer} onPress={navigateToScreen(routeKeys.dashboardScreen)}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.slogan}>Decentralized Identity</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <ScrollView>
        <Drawer.Section>
          {!currentNetwork.isParachain ? (
            <>
              <Drawer.Item
                label="Dashboard"
                icon="view-dashboard"
                active={activeScreen === routeKeys.dashboardNavigator}
                onPress={navigateToScreen(routeKeys.dashboardScreen)}
              />
              <Drawer.Item
                label="Accounts"
                icon="account-details"
                active={activeScreen === routeKeys.accountsNavigator}
                onPress={navigateToScreen(routeKeys.accountsNavigator)}
              />
              <Drawer.Item
                label="Registrars"
                icon="playlist-check"
                active={activeScreen === routeKeys.registrarListScreen}
                onPress={navigateToScreen(routeKeys.registrarListScreen)}
              />
              <Drawer.Item
                label="Tech. Committee"
                icon="chip"
                active={activeScreen === routeKeys.technicalCommitteeScreen}
                onPress={navigateToScreen(routeKeys.technicalCommitteeScreen)}
              />
              <Drawer.Item
                label="Discussions"
                icon="forum"
                active={activeScreen === routeKeys.polkassemblyDiscussionsNavigator}
                onPress={navigateToScreen(routeKeys.polkassemblyDiscussionsNavigator)}
              />
            </>
          ) : (
            <>
              {/* TODO: define entry screen */}
              <Drawer.Item
                label="Home"
                icon="view-dashboard"
                active={activeScreen === 'homeScreen'}
                onPress={() => {
                  navigation.navigate('homeScreen');
                }}
              />
              <Drawer.Item
                label="Accounts"
                icon="account-details"
                active={activeScreen === routeKeys.accountsNavigator}
                onPress={navigateToScreen(routeKeys.accountsNavigator)}
              />
              <Drawer.Item
                label="Token Migration"
                icon="bank-transfer"
                active={activeScreen === 'tokenMigrationNavigator'}
                onPress={() => {
                  navigation.navigate('tokenMigrationNavigator');
                }}
              />
            </>
          )}
        </Drawer.Section>
        {isParachainAvailable ? (
          <Drawer.Section title="Parachains">
            <Drawer.Item
              label="Overview"
              icon="link-variant"
              active={activeScreen === routeKeys.parachainsNavigator}
              onPress={navigateToScreen(routeKeys.parachainsNavigator)}
            />
            <Drawer.Item
              label="Parathreads"
              icon="link"
              active={activeScreen === routeKeys.parathreadsScreen}
              onPress={navigateToScreen(routeKeys.parathreadsScreen)}
            />
            <Drawer.Item
              label="Auctions"
              icon="gavel"
              active={activeScreen === routeKeys.parachainAuctionsScreen}
              onPress={navigateToScreen(routeKeys.parachainAuctionsScreen)}
            />
            <Drawer.Item
              label="Crowdloan"
              icon="bank-transfer-in"
              active={activeScreen === routeKeys.crowdloansNavigator}
              onPress={navigateToScreen(routeKeys.crowdloansNavigator)}
            />
          </Drawer.Section>
        ) : null}
        <Drawer.Section title="Settings">
          <Drawer.Item
            label="Dark theme"
            icon="brightness-6"
            right={() => <Switch value={theme === 'dark'} onValueChange={toggleTheme} />}
          />
          {!currentNetwork.isParachain ? (
            <>
              <Drawer.Item
                label="Notifications"
                icon="bell"
                active={activeScreen === routeKeys.notificationSettingsScreen}
                onPress={navigateToScreen(routeKeys.notificationSettingsScreen)}
              />
            </>
          ) : null}
          {__DEV__ && (
            <Drawer.Item
              label="Dev Kit"
              icon="code-tags"
              active={activeScreen === routeKeys.devScreen}
              onPress={navigateToScreen(routeKeys.devScreen)}
            />
          )}
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            label="About Litentry"
            icon="information-outline"
            active={activeScreen === 'Webview' && routeParams?.title === 'About Litentry'}
            onPress={navigateToScreen(routeKeys.webviewScreen, {
              title: 'About Litentry',
              uri: 'https://www.litentry.com',
            })}
          />
          <Drawer.Item
            label="Feedback"
            icon="comment-question-outline"
            active={activeScreen === routeKeys.feedbackScreen}
            onPress={navigateToScreen(routeKeys.feedbackScreen)}
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
