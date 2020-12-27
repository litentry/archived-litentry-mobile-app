import React, {useContext, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import ScreenNavigation from 'layout/ScreenNavigation';
import SafeView from 'presentational/SafeView';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {
  Text,
  Layout,
  Divider,
  Button,
  Icon,
  IconProps,
  useTheme,
} from '@ui-kitten/components';
import {NetworkSelectionContext} from 'context/NetworkSelectionContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {BalanceContext} from 'context/BalanceContext';
import {AccountContext} from 'context/AccountContextProvider';
import {TxContext} from 'context/TxContext';
import FadeInAnimatedView from 'presentational/FadeInAnimatedView';
import withAddAccount, {InjectedPropTypes} from 'src/hoc/withAddAccount';
import AccountTeaser from 'presentational/AccountTeaser';
import globalStyles, {standardPadding, colorGreen} from 'src/styles';

type PropTypes = {navigation: DrawerNavigationProp<{}>};

const AddIcon = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);

function RegistrarScreen({
  navigation,
  accountAddProps,
}: PropTypes & InjectedPropTypes) {
  const {currentNetwork, selectNetwork} = useContext(NetworkSelectionContext);
  const {show} = useContext(BalanceContext);
  const {accounts, currentIdentity} = useContext(AccountContext);

  const {status, api} = useContext(ChainApiContext);
  const {start} = useContext(TxContext);
  const account = accounts?.[0];
  const theme = useTheme();

  const startTx = useCallback(async () => {
    // const info = {
    //   display: {raw: 'test1'},
    //   email: {
    //     none: null,
    //   },
    //   legal: {
    //     none: null,
    //   },
    //   riot: {
    //     none: null,
    //   },
    //   twitter: {
    //     none: null,
    //   },
    //   web: {
    //     none: null,
    //   },
    // };

    if (account && api) {
      await start(api, account.address, 'balances.transfer', [
        '5FZnXDZ1X44GSpZYnJjGe6Ygo74ByDFj1YhqqAV3G2GZTSRN',
        '30000000000000000',
      ]);
    } else {
      Alert.alert('account/api is not ready');
    }
  }, [account, api, start]);

  const renderTitle = () => {
    return (
      <TouchableOpacity onPress={selectNetwork}>
        <Layout style={styles.titleContainer}>
          <Text category="s1">Litentry</Text>
          {currentNetwork ? (
            <NetworkItem
              item={currentNetwork}
              isConnected={status === 'ready'}
            />
          ) : null}
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={globalStyles.flex}>
      <ScreenNavigation
        onMenuPress={() => navigation.openDrawer()}
        onBalancePress={show}
        renderTitle={renderTitle}
      />
      <Divider style={{height: 2}} />
      <FadeInAnimatedView>
        {!account ? (
          <Layout style={styles.container} level="1">
            <Button
              size="large"
              appearance="ghost"
              onPress={accountAddProps.open}
              accessoryLeft={AddIcon}>
              Add Account
            </Button>
          </Layout>
        ) : (
          <AccountTeaser
            address={account.address}
            info={currentIdentity?.info}
            judgements={currentIdentity?.judgements}
          />
        )}
        <View
          style={[
            globalStyles.flex,
            globalStyles.shadow,
            styles.main,
            {backgroundColor: theme['background-basic-color-2']},
          ]}>
          <ScrollView style={styles.scrollView}>
            <Text>Governance Dashboard</Text>
          </ScrollView>
        </View>
      </FadeInAnimatedView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fcfcfc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollView: {
    paddingHorizontal: standardPadding * 2,
    paddingVertical: standardPadding * 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
});

export default withAddAccount(RegistrarScreen);
