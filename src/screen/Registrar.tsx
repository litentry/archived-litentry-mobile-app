import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import ScreenNavigation from 'layout/ScreenNavigation';
import SafeView from 'presentational/SafeView';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Text, Layout, Divider} from '@ui-kitten/components';
import {NetworkSelectionContext} from 'context/NetworkSelectionContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {BalanceContext} from 'context/BalanceContext';

type PropTypes = {navigation: DrawerNavigationProp<{}>};

function RegistrarScreen({navigation}: PropTypes) {
  const {currentNetwork, selectNetwork} = useContext(NetworkSelectionContext);
  const {show} = useContext(BalanceContext);

  const {status} = useContext(ChainApiContext);

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
