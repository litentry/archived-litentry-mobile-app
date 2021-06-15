import React, {useContext, useState, useRef, useCallback} from 'react';
import {Layout, Button, ListItem, Divider, Text} from '@ui-kitten/components';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useAccounts} from 'src/context/AccountsContext';
import {InAppNotificationContext, RichTextComponent} from 'context/InAppNotificationContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {Alert, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {standardPadding} from 'src/styles';
import {NetworkContext} from 'context/NetworkContext';
import RegistrarSelectionModal from 'layout/RegistrarSelectionModal';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function DevScreen(props: PropTypes) {
  const {navigation} = props;
  const [visible, setVisible] = useState(false);

  const {currentNetwork} = useContext(NetworkContext);
  const {accounts, addAccount, removeAccount} = useAccounts();
  const {trigger} = useContext(InAppNotificationContext);
  const {status, addSection, removeSection, api} = useContext(ChainApiContext);
  const [debugInfo, setDebugInfo] = useState('');
  const modalRef = useRef<Modalize>(null);
  const showDebugModal = useCallback((info: string) => {
    modalRef.current?.open();
    setDebugInfo(info);
  }, []);

  return (
    <GenericNavigationLayout title="DevScreen" onBackPressed={() => navigation.goBack()}>
      <>
        <Layout level="1">
          <ListItem
            title="Registrar Selection Modal"
            description="Trigger display of Registrar Selection Modal"
            accessoryRight={() => (
              <Button size="small" onPress={() => setVisible(true)}>
                Trigger
              </Button>
            )}
          />
          <Divider />
          <RegistrarSelectionModal
            onClose={() => setVisible(false)}
            onSelect={(index, fee) => console.log(index, fee)}
            visible={visible}
          />
          <ListItem
            title={`Network: ${currentNetwork.name}`}
            description={`Currently connected to ${currentNetwork.ws}`}
            accessoryRight={() => <Button size="tiny">{status}</Button>}
          />
          <Divider />

          <ListItem
            title="Simple Notification"
            description="Show simple text in app PN"
            accessoryRight={() => (
              <Button size="small" onPress={() => trigger({type: 'TextInfo', opts: {text: 'Whatnot'}})}>
                Trigger
              </Button>
            )}
          />
          <Divider />

          <ListItem
            title="Show multi-lines Notification"
            description="Show multi-lines In-App-PusNotification"
            accessoryRight={() => (
              <Button
                size="small"
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
                Trigger
              </Button>
            )}
          />
          <Divider />
          <ListItem
            title="Account reset"
            description="Reset current stored accounts"
            accessoryRight={() => (
              <Button
                size="small"
                onPress={() => {
                  // TODO: change this when adding multi account support
                  removeAccount(currentNetwork.key, accounts[0]);
                  Alert.alert('Info', 'Account is reset');
                }}>
                Trigger
              </Button>
            )}
          />
          <Divider />
          <ListItem
            title="Subscribe `identity` section"
            description="Add `identity` to subscribed section"
            accessoryRight={() => (
              <Button size="small" onPress={() => addSection('identity')}>
                Trigger
              </Button>
            )}
          />
          <Divider />
          <ListItem
            title="Unsubscribe `identity` section"
            description="Remove `identity` from the subscribed section"
            accessoryRight={() => (
              <Button
                size="small"
                onPress={() => {
                  removeSection('identity');
                }}>
                Trigger
              </Button>
            )}
          />
          <Divider />
          <ListItem
            title="identityOf current address"
            description="Resp of `identityOf` call of current address"
            accessoryRight={() => (
              <Button
                size="small"
                onPress={() => {
                  const account = accounts?.[0];
                  if (account) {
                    api?.query.identity?.identityOf(account.address).then((data) => {
                      showDebugModal(JSON.stringify(data, null, 4));
                    });
                  } else {
                    Alert.alert('Error', 'No Account connected');
                  }
                }}>
                Trigger
              </Button>
            )}
          />
          <Divider />
          <ListItem
            title="Set Address"
            description="Manually set address"
            accessoryRight={() => (
              <Button
                size="small"
                onPress={() => {
                  addAccount(currentNetwork.key, {
                    name: 'Manu. set Acct',
                    address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                  });
                  Alert.alert('Done');
                }}>
                Trigger
              </Button>
            )}
          />
          <Divider />
        </Layout>

        <Modalize
          ref={modalRef}
          threshold={250}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          adjustToContentHeight
          handlePosition="outside"
          closeOnOverlayTap
          panGestureEnabled>
          <Layout style={styles.devModal}>
            <Text category="s1" style={styles.debugHeader}>
              Debug Info
            </Text>
            <Divider />
            <ScrollView style={styles.scrollView}>
              <Text>{debugInfo}</Text>
            </ScrollView>
          </Layout>
        </Modalize>
      </>
    </GenericNavigationLayout>
  );
}
const styles = StyleSheet.create({
  devModal: {
    maxHeight: 400,
    height: 400,
  },
  debugHeader: {
    paddingVertical: standardPadding * 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scrollView: {
    padding: standardPadding,
    flex: 1,
    height: 400,
  },
});

export default DevScreen;
