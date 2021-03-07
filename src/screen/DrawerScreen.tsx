import React, {useContext, useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Alert} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Divider,
  Toggle,
  ListItem,
  Icon,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';
import SafeView from 'presentational/SafeView';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import {ThemeContext} from 'context/ThemeProvider';
import logo from '../image/logo.png';
import Padder from 'presentational/Padder';
import {AccountContext} from 'context/AccountContextProvider';
import {NetworkContext} from 'context/NetworkContext';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import AddressInfoBadge from 'presentational/AddressInfoBadge';
import Identicon from '@polkadot/reactnative-identicon';
import {BalanceContext} from 'context/BalanceContext';
import withAddAccount, {InjectedPropTypes} from 'src/hoc/withAddAccount';
import {ChainApiContext} from 'context/ChainApiContext';
import {registrarList, webview, devScreen} from 'src/navigation/routeKeys';

function AccountDrawerView({accountAddProps}: InjectedPropTypes) {
  const {show} = useContext(BalanceContext);
  const {api} = useContext(ChainApiContext);
  const {accounts, setAccount} = useContext(AccountContext);
  const {currentNetwork} = useContext(NetworkContext);
  const [visible, setVisible] = useState(false);
  const account = accounts && accounts[0];

  const handleMenuItemSelect = ({row}: {row: number}) => {
    if (row === 0) {
      Alert.alert(
        'Confirm Account deletion',
        `Sure to delete account ${account?.address}`,
        [
          {
            text: 'Yes',
            onPress: () => {
              setVisible(false);
              setAccount(null);
            },
          },
          {
            text: 'Cancel',
            onPress: () => setVisible(false),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }

    if (row === 1) {
      show();
    }
  };

  const renderOptions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <Icon
          name="md-options"
          pack="ionic"
          style={[globalStyles.inlineIconDimension, globalStyles.iconColor]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={[globalStyles.centeredContainer, account ? {} : {}]}>
      {account ? (
        <Layout style={accountDrawerViewStyles.container}>
          <Layout style={accountDrawerViewStyles.accountLogo}>
            <Identicon value={account.address} size={25} />

            <Layout style={accountDrawerViewStyles.account}>
              <AddressInfoBadge
                network={currentNetwork}
                address={account.address}
                api={api}
              />
              <OverflowMenu
                anchor={renderOptions}
                placement="bottom end"
                backdropStyle={styles.backdrop}
                style={styles.overflowMenu}
                visible={visible}
                onSelect={handleMenuItemSelect}
                onBackdropPress={() => setVisible(false)}>
                <MenuItem
                  title="Remove Account"
                  accessoryLeft={(iconProps) => (
                    <Icon name="trash-2-outline" {...iconProps} />
                  )}
                />
                <MenuItem
                  title="Show balance"
                  accessoryLeft={(iconProps) => (
                    <Icon {...iconProps} name="credit-card-outline" />
                  )}
                />
              </OverflowMenu>
            </Layout>
          </Layout>
          <Layout>
            <Text
              style={accountDrawerViewStyles.address}
              numberOfLines={1}
              selectable
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
            onPress={accountAddProps.open}
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
    alignSelf: 'center',
  },
  account: {
    padding: standardPadding,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountLogo: {
    marginLeft: -standardPadding,
    paddingBottom: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {fontFamily: monofontFamily},
});

const ConnectedAccountDrawer = withAddAccount(AccountDrawerView);

function DrawerScreen({navigation}: DrawerContentComponentProps) {
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
          <ConnectedAccountDrawer />
        </Layout>
        <Divider />
        <Layout style={styles.rest} level="2">
          <Layout style={globalStyles.paddedContainer}>
            <Text category="h6">Settings</Text>
          </Layout>
          <ListItem
            title="Registrars"
            accessoryLeft={(props) => (
              <Icon {...props} name="award-outline" animation="zoom" />
            )}
            onPress={() => navigation.navigate(registrarList)}
          />
          <Divider />
          <ListItem
            title="Dark theme"
            accessoryLeft={(props) => (
              <Icon {...props} name="sun-outline" animation="zoom" />
            )}
            accessoryRight={() => (
              <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
            )}
          />
          <Divider />
          <ListItem
            title="About Litentry"
            description="Read more about us."
            accessoryLeft={(props) => (
              <Icon {...props} name="hash-outline" animation="zoom" />
            )}
            onPress={() =>
              navigation.navigate(webview, {
                title: 'About Litentry',
                uri: 'https://www.litentry.com',
              })
            }
          />
          <Divider />
          {__DEV__ && (
            <>
              <ListItem
                title="Dev Kit"
                description="Here lists the helpers for devs"
                accessoryLeft={(props) => (
                  <Icon {...props} name="code-outline" animation="zoom" />
                )}
                onPress={() => navigation.navigate(devScreen)}
              />
              <Divider />
            </>
          )}
        </Layout>
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, borderStartColor: 'red'},
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overflowMenu: {
    minWidth: 200,
  },
});

export default DrawerScreen;
