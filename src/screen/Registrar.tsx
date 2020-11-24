import React, {useContext, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Text as RNText} from 'react-native';
import ScreenNavigation from 'layout/ScreenNavigation';
import SafeView from 'presentational/SafeView';
import NetworkItem from 'presentational/NetworkItem';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Text, Layout, Divider, Button} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import {Modalize} from 'react-native-modalize';
import globalStyles, {standardPadding} from 'src/styles';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import ScannerContextProvider, {ScannerContext} from 'context/ScannerContext';
import InAppNotificationContextProvider, {
  InAppNotificationContext,
  RichTextComponent,
} from 'context/InAppNotificationContext';

type PropTypes = {navigation: DrawerNavigationProp<{}>};

function RegistrarScreen({navigation}: PropTypes) {
  const {currentNetwork, availableNetworks, select} = useContext(
    NetworkContext,
  );
  const modalRef = useRef<Modalize>(null);
  const {scan, data} = useContext(ScannerContext);
  const {trigger} = useContext(InAppNotificationContext);

  const renderTitle = () => {
    return (
      <TouchableOpacity onPress={() => modalRef.current?.open()}>
        <Layout style={styles.titleContainer}>
          <Text category="s1">Litentry</Text>
          {currentNetwork ? <NetworkItem item={currentNetwork} /> : null}
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
        <Button onPress={scan}>Scan</Button>
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
      </Layout>

      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        adjustToContentHeight
        handlePosition="outside"
        closeOnOverlayTap
        panGestureEnabled>
        <Layout level="1" style={styles.networkModal}>
          <NetworkSelectionList
            items={availableNetworks}
            selected={currentNetwork}
            onSelect={select}
          />
          <Divider style={globalStyles.divider} />
          <Button appearance="ghost" onPress={() => modalRef.current?.close()}>
            Close
          </Button>
        </Layout>
      </Modalize>
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
  networkModal: {
    paddingVertical: standardPadding * 3,
    paddingHorizontal: standardPadding * 2,
  },
});

export default function WithContext(props: PropTypes) {
  return (
    <InAppNotificationContextProvider>
      <ScannerContextProvider>
        <RegistrarScreen {...props} />
      </ScannerContextProvider>
    </InAppNotificationContextProvider>
  );
}
