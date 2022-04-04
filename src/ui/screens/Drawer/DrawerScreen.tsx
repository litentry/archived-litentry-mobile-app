import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useToggleTheme} from 'context/ThemeContext';
import {useNetwork} from 'context/NetworkContext';
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
  dashboardNavigator,
  technicalCommitteeScreen,
} from '@ui/navigation/routeKeys';
import {standardPadding} from '@ui/styles';
import {appVersion} from 'src/service/Device';
import {getCurrentYear} from 'src/utils/date';
import {Drawer, Switch, Text, Divider} from '@ui/library';

function DrawerScreen({navigation, state}: DrawerContentComponentProps) {
  const {currentNetwork} = useNetwork();
  const {theme, toggleTheme} = useToggleTheme();
  const isParachainAvailable = useIsParachainAvailable();
  const currentRoute = state.routes[state.index];
  const activeScreen = currentRoute?.name;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeParams = currentRoute?.params as any;

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
          {!currentNetwork.isParachain ? (
            <>
              <Drawer.Item
                label="Dashboard"
                icon="view-dashboard"
                active={activeScreen === dashboardNavigator}
                onPress={() => {
                  navigation.navigate(dashboardScreen);
                }}
              />
              <Drawer.Item
                label="Accounts"
                icon="account-details"
                active={activeScreen === accountsNavigator}
                onPress={() => {
                  navigation.navigate(accountsNavigator);
                }}
              />
              <Drawer.Item
                label="Registrars"
                icon="playlist-check"
                active={activeScreen === registrarListScreen}
                onPress={() => {
                  navigation.navigate(registrarListScreen);
                }}
              />
              <Drawer.Item
                label="Tech. Committee"
                icon="chip"
                active={activeScreen === technicalCommitteeScreen}
                onPress={() => {
                  navigation.navigate(technicalCommitteeScreen);
                }}
              />
              <Drawer.Item
                label="Discussions"
                icon="forum"
                active={activeScreen === polkassemblyDiscussionsNavigator}
                onPress={() => {
                  navigation.navigate(polkassemblyDiscussionsNavigator);
                }}
              />
            </>
          ) : (
            <>
              <Drawer.Item
                label="Accounts"
                icon="account-details"
                active={activeScreen === accountsNavigator}
                onPress={() => {
                  navigation.navigate(accountsNavigator);
                }}
              />
              <Drawer.Item
                label="LIT Migration"
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
              active={activeScreen === parachainsNavigator}
              onPress={() => {
                navigation.navigate(parachainsNavigator, {screen: parachainsOverviewScreen});
              }}
            />
            <Drawer.Item
              label="Parathreads"
              icon="link"
              active={activeScreen === parathreadsScreen}
              onPress={() => {
                navigation.navigate(parathreadsScreen);
              }}
            />
            <Drawer.Item
              label="Auctions"
              icon="gavel"
              active={activeScreen === parachainAuctionsScreen}
              onPress={() => {
                navigation.navigate(parachainAuctionsScreen);
              }}
            />
            <Drawer.Item
              label="Crowdloan"
              icon="bank-transfer-in"
              active={activeScreen === crowdloansNavigator}
              onPress={() => {
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
          {currentNetwork.isParachain ? (
            <>
              <Drawer.Item
                label="Notifications"
                icon="bell"
                active={activeScreen === notificationSettingsScreen}
                onPress={() => {
                  navigation.navigate(notificationSettingsScreen);
                }}
              />
              {__DEV__ && (
                <Drawer.Item
                  label="Dev Kit"
                  icon="code-tags"
                  active={activeScreen === devScreen}
                  onPress={() => {
                    navigation.navigate(devScreen);
                  }}
                />
              )}
            </>
          ) : null}
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            label="About Litentry"
            icon="information-outline"
            active={activeScreen === 'Webview' && routeParams?.title === 'About Litentry'}
            onPress={() => {
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
