import React, {useContext, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ScreenNavigation from 'layout/ScreenNavigation';
import SafeView from 'presentational/SafeView';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Text, Layout, Divider, Button} from '@ui-kitten/components';
import {ScannerContext} from 'context/ScannerContext';
import {
  InAppNotificationContext,
  RichTextComponent,
} from 'context/InAppNotificationContext';
import {NetworkSelectionContext} from 'context/NetworkSelectionContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {AccountContext} from 'context/AccountContextProvider';

import {createLogger} from 'src/utils';

type PropTypes = {navigation: DrawerNavigationProp<{}>};

function RegistrarScreen({navigation}: PropTypes) {
  const {currentNetwork, selectNetwork} = useContext(NetworkSelectionContext);
  const {setAccount} = useContext(AccountContext);
  const {scan, data} = useContext(ScannerContext);
  const {trigger} = useContext(InAppNotificationContext);

  const {status, api, addSection, removeSection} = useContext(ChainApiContext);
  const showNotification = useCallback(
    (text: string) => trigger({type: 'TextInfo', opts: {text}}),
    [trigger],
  );

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
        renderTitle={renderTitle}
      />
      <Divider />
      <Layout style={styles.container} level="1">
        <Text category="label">Here comes the main content of Registrar</Text>
        {data.result ? <Text>{data.result.data}</Text> : null}
        <Button onPress={() => scan()}>Scan</Button>
        <Button
          onPress={() => trigger({type: 'TextInfo', opts: {text: 'Whatnot'}})}>
          Show Notification
        </Button>
        <Button
          onPress={() =>
            trigger({
              type: 'Component',
              renderContent: () => (
                <RichTextComponent
                  title="Tx detected"
                  message="aa very long string[a very long string[a very long string[a very long string[a very long string[]]]]]a very long string[]a very long string[a very long string[a very long string[a very long string[a very long string[]]]]]a very long string[] very long string[a very long string[a very long string[a very long string[a very long string[]]]]]a very long string[]"
                />
              ),
            })
          }>
          Show Notification
        </Button>
        <Button onPress={() => setAccount(null)}>Remove accounts</Button>
        <Button
          onPress={() => {
            addSection('identity');
          }}>
          {status}
        </Button>
        <Button
          onPress={() => {
            removeSection('identity');
          }}>
          Remove Section Identity
        </Button>
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
