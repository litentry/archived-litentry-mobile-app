import React, {useContext, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import ScreenNavigation from 'layout/ScreenNavigation';
import SafeView from 'presentational/SafeView';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Text, Layout, Divider, Button} from '@ui-kitten/components';
import {NetworkSelectionContext} from 'context/NetworkSelectionContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {BalanceContext} from 'context/BalanceContext';
import {AccountContext} from 'context/AccountContextProvider';
import {TxContext} from 'context/TxContext';

type PropTypes = {navigation: DrawerNavigationProp<{}>};

function RegistrarScreen({navigation}: PropTypes) {
  const {currentNetwork, selectNetwork} = useContext(NetworkSelectionContext);
  const {show} = useContext(BalanceContext);
  const {accounts} = useContext(AccountContext);

  const {status, api} = useContext(ChainApiContext);
  const {start} = useContext(TxContext);
  const account = accounts?.[0];

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
    <SafeView>
      <ScreenNavigation
        onMenuPress={() => navigation.openDrawer()}
        onBalancePress={show}
        renderTitle={renderTitle}
      />
      <Divider />
      <Layout style={styles.container} level="1">
        <Text category="label">Here comes the main content of Registrar</Text>
        <Button onPress={startTx}>Tx</Button>
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
});

export default function WithContext(props: PropTypes) {
  return <RegistrarScreen {...props} />;
}
