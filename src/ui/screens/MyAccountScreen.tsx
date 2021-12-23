import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Share} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {BN_ZERO, stringShorten} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {useAccounts} from 'context/AccountsContext';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Button, Caption, IconButton, IconSource, Card, Snackbar, useTheme} from '@ui/library';
import {ScrollView} from 'react-native-gesture-handler';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {AccountsStackParamList, CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {
  accountsScreen,
  balanceScreen,
  exportAccountWithJsonFileScreen,
  identityGuideScreen,
  manageIdentityScreen,
  receiveFundScreen,
  sendFundScreen,
} from '@ui/navigation/routeKeys';
import {standardPadding} from '@ui/styles';

export function MyAccountScreen({
  navigation,
  route: {
    params: {address},
  },
}: {
  navigation: NavigationProp<CompleteNavigatorParamList>;
  route: RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;
}) {
  const {data: accountIdentityInfo} = useAccountIdentityInfo(address);
  const formatBalance = useFormatBalance();
  const {data: accountInfo} = useAccountInfo(address);

  const {accounts, removeAccount} = useAccounts();
  const account = accounts[address];

  const [visible, setVisible] = React.useState(false);
  const copyToClipboard = () => {
    Clipboard.setString(address);
    setVisible(true);
  };

  if (!account) {
    return null;
  }

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.centerAlign}>
            {account.meta.name ? (
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
              <ActionButton icon="send" title="Send" onPress={() => navigation.navigate(sendFundScreen, {address})} />

              <ActionButton
                icon="download"
                title="Receive"
                onPress={() => navigation.navigate(receiveFundScreen, {address})}
              />
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
            <Caption>
              {accountIdentityInfo?.hasIdentity ? accountIdentityInfo.display : 'No Identity Data Found'}
            </Caption>
            {accountIdentityInfo?.hasIdentity && accountIdentityInfo.hasJudgements ? (
              <Caption>{`${accountIdentityInfo.registration.judgements.length} Judgements`}</Caption>
            ) : null}
          </InfoItem>

          <InfoItem title="BALANCE">
            <Caption>{formatBalance(accountInfo?.data.free ?? BN_ZERO)}</Caption>
          </InfoItem>
        </Card>

        <View style={styles.buttonGroup}>
          <Button icon="credit-card" mode="text" onPress={() => navigation.navigate(balanceScreen, {address})}>
            Balance details
          </Button>
          <Padder scale={1} />
          <Button
            icon="cog"
            mode="text"
            onPress={() => {
              navigation.navigate(manageIdentityScreen, {address});
              if (account.isExternal) {
                navigation.navigate(identityGuideScreen);
              }
            }}>
            Manage identity
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
                    removeAccount(address);
                    navigation.navigate(accountsScreen, {});
                  },
                  style: 'destructive',
                },
              ]);
            }}>
            Remove account
          </Button>
          {!account.isExternal ? (
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
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        duration={3000}>
        Address copied to clipboard!
      </Snackbar>
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
});
