import React, {useContext} from 'react';
import {Layout, Button, ListItem, Divider} from '@ui-kitten/components';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/types';
import {NetworkSelectionContext} from 'context/NetworkSelectionContext';
import {AccountContext} from 'context/AccountContextProvider';
import {ScannerContext} from 'context/ScannerContext';
import {
  InAppNotificationContext,
  RichTextComponent,
} from 'context/InAppNotificationContext';
import {ChainApiContext} from 'context/ChainApiContext';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function DevScreen(props: PropTypes) {
  const {navigation} = props;

  const {currentNetwork} = useContext(NetworkSelectionContext);
  const {setAccount} = useContext(AccountContext);
  const {scan} = useContext(ScannerContext);
  const {trigger} = useContext(InAppNotificationContext);
  const {status, addSection, removeSection} = useContext(ChainApiContext);

  return (
    <GenericNavigationLayout
      title="DevScreen"
      onBackPressed={() => navigation.goBack()}>
      <Layout level="1">
        <ListItem
          title={`Network: ${currentNetwork?.name}`}
          description={`Currently connected to ${currentNetwork?.ws}`}
          accessoryRight={() => <Button size="tiny">{status}</Button>}
        />
        <Divider />
        <ListItem
          title="Scan QR"
          description="Trigger `scan` fn from ScannerContext"
          accessoryRight={() => (
            <Button size="small" onPress={() => scan()}>
              Trigger
            </Button>
          )}
        />
        <Divider />

        <ListItem
          title="Simple Notification"
          description="Show simple text in app PN"
          accessoryRight={() => (
            <Button
              size="small"
              onPress={() =>
                trigger({type: 'TextInfo', opts: {text: 'Whatnot'}})
              }>
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
            <Button size="small" onPress={() => setAccount(null)}>
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
      </Layout>
    </GenericNavigationLayout>
  );
}

export default DevScreen;
