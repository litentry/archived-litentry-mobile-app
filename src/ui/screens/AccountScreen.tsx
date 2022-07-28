import React from 'react';
import {Divider, Card, Text, useTheme, IconButton} from '@ui/library';
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
import {Identicon} from '@ui/components/Identicon';

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

                  <Text variant="bodySmall" style={{color: colors.accent}}>
                    ADDRESS
                  </Text>
                  <View style={[globalStyles.rowContainer]}>
                    <View style={styles.caption}>
                      <Text variant="bodySmall" onPress={copyToClipboard}>
                        {stringShorten(account?.address, 17)}
                      </Text>
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
                  <Text variant="bodySmall" style={{color: colors.accent}}>
                    JUDGEMENT(S)
                  </Text>
                  <Padder scale={0.5} />
                  {account?.registration?.judgements.map((judgement, i) => (
                    <Text
                      variant="bodySmall"
                      style={[{backgroundColor: colors.accent}, styles.titleContainer]}
                      key={i}>{`"${
                      mapStatusText(judgement?.judgement ?? {}, Boolean(account?.registration?.displayParent)).text
                    }" provided by Registrar #${judgement?.registrarIndex}`}</Text>
                  ))}
                </Card.Content>
              </Card>
            ) : null}
            <Padder scale={1} />
            {account?.balance ? (
              <Card>
                <Card.Content>
                  <Text variant="bodySmall" style={{color: colors.accent}}>
                    BALANCE
                  </Text>
                  <Padder scale={0.5} />
                  <View style={styles.balance}>
                    <Text variant="bodySmall">Balance</Text>
                    <Text variant="bodySmall">{account?.balance.formattedFree}</Text>
                  </View>
                  <View style={styles.balance}>
                    <Text variant="bodySmall">Reserved</Text>
                    <Text variant="bodySmall">{account?.balance.formattedReserved}</Text>
                  </View>
                  <View style={styles.balance}>
                    <Text variant="bodySmall">Locked</Text>
                    <Text variant="bodySmall">{account?.balance.formattedFeeFrozen}</Text>
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
