import React, {useCallback, useContext, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Divider, Button, List, Subheading, useTheme, Paragraph, Caption, Select} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {useAccounts} from 'src/context/AccountsContext';
import {InAppNotificationContent, InAppNotificationContext} from 'context/InAppNotificationContext';
import {ChainApiContext} from 'context/ChainApiContext';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import globalStyles, {standardPadding} from '@ui/styles';
import {useNetwork} from 'context/NetworkContext';
import RegistrarSelectionModal from '@ui/components/RegistrarSelectionModal';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {stringShorten} from '@polkadot/util';
import {Padder} from '@ui/components/Padder';
import {useConvictions} from 'src/api/hooks/useConvictions';

function DevScreen() {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const {currentNetwork} = useNetwork();
  const {accounts} = useAccounts();
  const {data: convictions} = useConvictions();
  const {trigger} = useContext(InAppNotificationContext);
  const {status, api} = useContext(ChainApiContext);
  const [debugInfo, setDebugInfo] = useState('');
  const modalRef = useRef<Modalize>(null);
  const showDebugModal = useCallback((info: string) => {
    modalRef.current?.open();
    setDebugInfo(info);
  }, []);

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView>
        <List.Item
          title={`Network: ${currentNetwork.name}`}
          description={currentNetwork.ws}
          right={() => (
            <ItemRight>
              <Subheading style={{color: colors.success}}>{status}</Subheading>
            </ItemRight>
          )}
        />
        <Divider />

        <View style={{padding: standardPadding * 2}}>
          <Subheading>Conviction selection</Subheading>
          <Select
            items={convictions ?? []}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
        </View>

        <List.Item
          title="Registrar Selection Modal"
          description="Trigger display of Registrar Selection Modal"
          right={() => (
            <ItemRight>
              <Button mode="contained" onPress={() => setVisible(true)}>
                Trigger
              </Button>
            </ItemRight>
          )}
        />
        <Divider />

        <RegistrarSelectionModal
          onClose={() => setVisible(false)}
          onSelect={(registrar) => console.log(registrar)}
          visible={visible}
        />
        <Divider />

        <List.Item
          title="Simple Notification"
          description="Show simple text in app PN"
          right={() => (
            <ItemRight>
              <Button mode="contained" onPress={() => trigger({type: 'TextInfo', opts: {text: 'Whatnot'}})}>
                Trigger
              </Button>
            </ItemRight>
          )}
        />
        <Divider />

        <List.Item
          title="Show multi-lines Notification"
          description="Show multi-lines In-App-PusNotification"
          right={() => (
            <ItemRight>
              <Button
                mode="contained"
                onPress={() =>
                  trigger({
                    type: 'Component',
                    renderContent: () => (
                      <InAppNotificationContent
                        title="Tx detected"
                        message="aa very long string[a very long string[a very long string[a very long string[a very long string[]]]]]a very long string[]a very long string[a very long string[a very long string[a very long string[a very long string[]]]]]a very long string[] very long string[a very long string[a very long string[a very long string[a very long string[]]]]]a very long string[]"
                      />
                    ),
                  })
                }>
                Trigger
              </Button>
            </ItemRight>
          )}
        />
        <Divider />

        {Object.values(accounts).map((account) => (
          <View key={account.address}>
            <List.Item
              title={<Paragraph>{`Identity of ${stringShorten(account.address)}`}</Paragraph>}
              description="Resp of `identityOf` call of current address"
              right={() => (
                <ItemRight>
                  <Button
                    mode="contained"
                    onPress={() => {
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
                </ItemRight>
              )}
            />
            <Divider />
          </View>
        ))}
      </ScrollView>

      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        adjustToContentHeight
        handlePosition="outside"
        closeOnOverlayTap
        panGestureEnabled>
        <Layout style={styles.devModal}>
          <Subheading>Debug Info</Subheading>
          <Padder scale={0.5} />
          <Divider />
          <ScrollView style={styles.scrollView}>
            <Caption>{debugInfo}</Caption>
          </ScrollView>
        </Layout>
      </Modalize>
    </SafeView>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

const styles = StyleSheet.create({
  devModal: {
    maxHeight: 400,
    height: 400,
    padding: standardPadding,
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
