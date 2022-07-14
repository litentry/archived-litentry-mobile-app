import React from 'react';
import {Divider, Card, Caption, useTheme, IconButton, Identicon} from '@ui/library';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {ScrollView, StyleSheet, View} from 'react-native';
import {accountScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {Padder} from '@ui/components/Padder';
import {AccountRegistration} from '@ui/components/Account/AccountRegistration';
import {useAccount} from 'src/api/hooks/useAccount';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import LoadingView from '@ui/components/LoadingView';
import {useSnackbar} from 'context/SnackbarContext';
import Clipboard from '@react-native-community/clipboard';
import {stringShorten} from '@polkadot/util';
import {mapStatusText} from 'src/utils/identity';

export function AccountScreen({route}: {route: RouteProp<AppStackParamList, typeof accountScreen>}) {
  const {colors} = useTheme();
  const {data: account, loading} = useAccount(route.params.address);
  const snackbar = useSnackbar();
  const copyToClipboard = () => {
    Clipboard.setString(route.params.address);
    snackbar('Address copied to clipboard!');
  };
  return (
    <SafeView edges={noTopEdges}>
      <ScrollView>
        {loading && !account ? (
          <LoadingView />
        ) : (
          <View style={globalStyles.paddedContainer}>
            {account ? (
              <Card>
                <Card.Content>
                  <View style={globalStyles.alignCenter}>
                    <Identicon value={account.address} size={50} />
                    <Padder scale={0.5} />
                    {account ? <AccountTeaser account={account} /> : null}
                  </View>
                  <Padder scale={1} />

                  <Caption style={{color: colors.accent}}>ADDRESS</Caption>
                  <View style={[globalStyles.rowContainer]}>
                    <View style={styles.caption}>
                      <Caption onPress={copyToClipboard}>{stringShorten(account?.address, 17)}</Caption>
                    </View>
                    <IconButton icon="content-copy" size={15} onPress={copyToClipboard} />
                  </View>
                  <Padder scale={0.5} />
                  <Divider />
                  {account.registration ? <AccountRegistration registration={account.registration} /> : null}
                </Card.Content>
              </Card>
            ) : null}
            <Padder scale={1} />
            {account?.registration?.judgements?.length ? (
              <Card>
                <Card.Content>
                  <Caption style={{color: colors.accent}}>JUDGEMENT(S)</Caption>
                  <Padder scale={0.5} />
                  {account?.registration?.judgements.map((judgement, i) => (
                    <Caption style={[{backgroundColor: colors.accent}, styles.titleContainer]} key={i}>{`"${
                      mapStatusText(judgement?.judgement ?? {}, Boolean(account?.registration?.displayParent)).text
                    }" provided by Registrar #${judgement?.registrarIndex}`}</Caption>
                  ))}
                </Card.Content>
              </Card>
            ) : null}
            <Padder scale={1} />
            {account?.balance ? (
              <Card>
                <Card.Content>
                  <Caption style={{color: colors.accent}}>BALANCE</Caption>
                  <Padder scale={0.5} />
                  <View style={styles.balance}>
                    <Caption>Balance</Caption>
                    <Caption>{account?.balance.formattedFree}</Caption>
                  </View>
                  <View style={styles.balance}>
                    <Caption>Reserved</Caption>
                    <Caption>{account?.balance.formattedReserved}</Caption>
                  </View>
                  <View style={styles.balance}>
                    <Caption>Locked</Caption>
                    <Caption>{account?.balance.formattedFeeFrozen}</Caption>
                  </View>
                </Card.Content>
              </Card>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  caption: {
    paddingVertical: standardPadding,
  },
  titleContainer: {
    alignSelf: 'flex-start',
  },
  balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
