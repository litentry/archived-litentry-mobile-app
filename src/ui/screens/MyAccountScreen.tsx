import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Share} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {stringShorten} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {
  Button,
  Caption,
  IconButton,
  IconSource,
  Card,
  useTheme,
  Subheading,
  Divider,
  useBottomSheet,
} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
import {ScrollView} from 'react-native-gesture-handler';
import {useAccount} from 'src/api/hooks/useAccount';
import {AccountsStackParamList, CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {accountsScreen, exportAccountWithJsonFileScreen, manageIdentityScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {useSnackbar} from 'context/SnackbarContext';
import {Layout} from '@ui/components/Layout';
import {AccountBalance} from '@ui/components/Account/AccountBalance';
import {SendFund} from '@ui/components/SendFund';
import {ReceiveFund} from '@ui/components/ReceiveFund';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import {useKeyring} from '@polkadotApi/useKeyring';
import {DelegateVoting} from '@ui/components/DelegateVoting';

type ScreenProps = {
  navigation: NavigationProp<CompleteNavigatorParamList>;
  route: RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;
};

export function MyAccountScreen({navigation, route}: ScreenProps) {
  const {address} = route.params;
  const {data: accountInfo} = useAccount(address);

  const {accounts} = useAppAccounts();
  const account = accounts[address];
  const {forgetAccount} = useKeyring();

  const snackbar = useSnackbar();
  const copyToClipboard = () => {
    Clipboard.setString(address);
    snackbar('Address copied to clipboard!');
  };

  const {
    closeBottomSheet: closeSendFund,
    openBottomSheet: openSendFund,
    BottomSheet: SendFundBottomSheet,
  } = useBottomSheet();
  const {
    closeBottomSheet: closeReceiveFund,
    openBottomSheet: openReceiveFund,
    BottomSheet: ReceiveFundBottomSheet,
  } = useBottomSheet();
  const {
    closeBottomSheet: closeBalanceDetails,
    openBottomSheet: openBalanceDetails,
    BottomSheet: BalanceBottomSheet,
  } = useBottomSheet();

  const {
    closeBottomSheet: closeDelegateVoting,
    openBottomSheet: openDelegateVoting,
    BottomSheet: DelegateVotingBottomSheet,
  } = useBottomSheet();

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.centerAlign}>
            {account?.meta.name ? (
              <>
                <Caption>{account.meta.name}</Caption>
                <Padder scale={0.5} />
              </>
            ) : null}
            <TouchableOpacity onPress={copyToClipboard}>
              <Identicon value={address} size={60} />
            </TouchableOpacity>
            <Padder scale={0.5} />
            <View style={styles.row}>
              <ActionButton icon="send" title="Send" onPress={openSendFund} />

              <ActionButton icon="download" title="Receive" onPress={openReceiveFund} />
              <ActionButton
                icon="share-variant"
                title="Share"
                onPress={() => {
                  Share.share({
                    message: address,
                  });
                }}
              />
            </View>
          </View>

          <Padder scale={1} />

          <InfoItem title="ADDRESS">
            <Caption onPress={copyToClipboard}>{stringShorten(address, 17)}</Caption>
          </InfoItem>

          <InfoItem title="IDENTITY">
            <Caption>{accountInfo?.hasIdentity ? accountInfo.display : 'No Identity Data Found'}</Caption>
            <Caption>{`${accountInfo?.registration?.judgements?.length} Judgements`}</Caption>
          </InfoItem>

          <InfoItem title="BALANCE">
            <Caption>{accountInfo?.balance?.formattedFree}</Caption>
          </InfoItem>
        </Card>

        <View style={styles.buttonGroup}>
          <Button icon="credit-card" mode="text" onPress={openBalanceDetails}>
            Balance details
          </Button>
          <Padder scale={1} />
          <Button
            icon="cog"
            mode="text"
            onPress={() => {
              navigation.navigate(manageIdentityScreen, {address});
            }}>
            Manage identity
          </Button>
          <Padder scale={1} />
          <Button icon="account-arrow-right" mode="text" onPress={openDelegateVoting}>
            Delegate votes
          </Button>
          <Padder scale={1} />
          <Button
            icon="delete"
            mode="text"
            onPress={() => {
              Alert.alert('Delete Account!', 'Are you sure you want to delete this account?', [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Delete',
                  onPress: () => {
                    forgetAccount({address});
                    navigation.navigate(accountsScreen, {});
                  },
                  style: 'destructive',
                },
              ]);
            }}>
            Remove account
          </Button>
          {!account?.meta.isExternal ? (
            <>
              <Padder scale={1} />
              <Button
                mode="text"
                onPress={() => navigation.navigate(exportAccountWithJsonFileScreen, {address})}
                icon="export">
                Export Account
              </Button>
            </>
          ) : null}
        </View>
        <Padder scale={2} />
      </ScrollView>

      <SendFundBottomSheet>
        <SendFund address={address} onClose={closeSendFund} />
      </SendFundBottomSheet>

      <ReceiveFundBottomSheet>
        <ReceiveFund address={address} onClose={closeReceiveFund} />
      </ReceiveFundBottomSheet>

      <BalanceBottomSheet>
        <Layout style={styles.balanceContainer}>
          <Subheading style={globalStyles.textCenter}>{`Account balance`}</Subheading>
          <Padder scale={0.5} />
          <Divider />
          {accountInfo?.balance ? <AccountBalance balance={accountInfo.balance} /> : null}
          <Divider />
          <Padder scale={1} />
          <Button onPress={closeBalanceDetails}>Close</Button>
          <Padder scale={2} />
        </Layout>
      </BalanceBottomSheet>

      <DelegateVotingBottomSheet>
        <DelegateVoting fromAccount={accountInfo} onClose={closeDelegateVoting} />
      </DelegateVotingBottomSheet>
    </SafeView>
  );
}

type ActionButtonProps = {
  icon: IconSource;
  title: string;
  onPress: () => void;
};

function ActionButton({icon, title, onPress}: ActionButtonProps) {
  const {colors} = useTheme();
  return (
    <View style={styles.iconButton}>
      <IconButton icon={icon} color={colors.accent} style={styles.icon} onPress={onPress} />
      <Caption style={{color: colors.accent}}>{title}</Caption>
    </View>
  );
}

type InfoItemProps = {
  title: string;
  children: React.ReactNode;
};

function InfoItem({title, children}: InfoItemProps) {
  const {colors} = useTheme();
  return (
    <View style={styles.infoItem}>
      <Caption style={{color: colors.accent}}>{title}</Caption>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  card: {
    borderRadius: 10,
    paddingVertical: 10,
  },
  centerAlign: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: standardPadding * 2,
  },
  icon: {
    marginBottom: 0,
  },
  infoItem: {
    marginLeft: standardPadding * 3,
    marginTop: standardPadding,
  },
  buttonGroup: {
    marginTop: standardPadding * 2,
  },
  balanceContainer: {
    paddingHorizontal: standardPadding,
  },
});
