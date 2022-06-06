import React, {useContext} from 'react';
import {View} from 'react-native';
import {Divider, Button, List, Subheading, useTheme, Select} from '@ui/library';
import {InAppNotificationContent, InAppNotificationContext} from 'context/InAppNotificationContext';
import {useApi} from 'context/ChainApiContext';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles, {standardPadding} from '@ui/styles';
import {useNetwork} from 'context/NetworkContext';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useConvictions} from 'src/api/hooks/useConvictions';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useAccounts} from 'context/AccountsContext';
import {useAccount} from 'src/api/hooks/useAccount';
import {Padder} from '@ui/components/Padder';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

function DevScreen() {
  const {colors} = useTheme();
  const {currentNetwork} = useNetwork();
  const {data: convictions} = useConvictions();
  const {trigger} = useContext(InAppNotificationContext);
  const {status} = useApi();
  const {activeAccount, setActiveAccount} = useAccounts();
  const {data: accountInfo} = useAccount(activeAccount?.address);

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView>
        <List.Item
          title={`Network: ${currentNetwork.name}`}
          description={currentNetwork.ws}
          right={() => (
            <ItemRight>
              <Subheading style={{color: colors.success, marginRight: standardPadding * 2}}>{status}</Subheading>
            </ItemRight>
          )}
        />
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
              setActiveAccount(selectedAccount.account);
            }}
          />
          <Padder scale={1} />

          <View style={globalStyles.rowAlignCenter}>
            <Subheading>{`Active account: `}</Subheading>
            {accountInfo ? <AccountTeaser account={accountInfo} name={activeAccount?.meta.name} /> : null}
          </View>
        </View>

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
      </ScrollView>
    </SafeView>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

export default DevScreen;
