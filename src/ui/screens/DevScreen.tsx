import React, {useContext} from 'react';
import {View} from 'react-native';
import {Divider, Button, List, Subheading, Select} from '@ui/library';
import {InAppNotificationContent, InAppNotificationContext} from 'context/InAppNotificationContext';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles from '@ui/styles';
import {useNetwork} from '@atoms/network';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useConvictions} from 'src/api/hooks/useConvictions';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useActiveAccount} from '@atoms/activeAccount';
import {useAccount} from 'src/api/hooks/useAccount';
import {Padder} from '@ui/components/Padder';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {usePolkadotApiStatus} from '@polkadotApi/usePolkadotApiStatus';

function DevScreen() {
  const {currentNetwork} = useNetwork();
  const {data: convictions} = useConvictions();
  const {trigger} = useContext(InAppNotificationContext);
  const apiStatus = usePolkadotApiStatus();
  const {activeAccount, selectActiveAccount} = useActiveAccount();
  const {data: accountInfo} = useAccount(activeAccount?.address);

  const ApiStatus = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Subheading>{apiStatus === 'ready' ? 'ready' : 'disconnected'}</Subheading>
      </View>
    ),

    [apiStatus],
  );

  const NotificationTrigger = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Button mode="contained" onPress={() => trigger({type: 'TextInfo', opts: {text: 'Whatnot'}})}>
          Trigger
        </Button>
      </View>
    ),

    [trigger],
  );

  const MultilineNotificationTrigger = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
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
      </View>
    ),

    [trigger],
  );

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView>
        <List.Item title={`Network: ${currentNetwork.name}`} description={currentNetwork.ws} right={ApiStatus} />
        <Divider />
        <View style={globalStyles.paddedContainer}>
          <Subheading>Conviction selection</Subheading>
          <Select
            items={convictions ?? []}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
          />
        </View>

        <View style={globalStyles.paddedContainer}>
          <Subheading>Select active account</Subheading>
          <SelectAccount
            onSelect={(selectedAccount) => {
              selectActiveAccount(selectedAccount.account);
            }}
          />
          <Padder scale={1} />

          <View style={globalStyles.rowAlignCenter}>
            <Subheading>{`Active account: `}</Subheading>
            {accountInfo ? <AccountTeaser account={accountInfo} name={activeAccount?.meta.name} /> : null}
          </View>
        </View>

        <List.Item title="Simple Notification" description="Show simple text in app PN" right={NotificationTrigger} />
        <Divider />

        <List.Item
          title="Show multi-lines Notification"
          description="Show multi-lines In-App-PusNotification"
          right={MultilineNotificationTrigger}
        />
        <Divider />
      </ScrollView>
    </SafeView>
  );
}

export default DevScreen;
