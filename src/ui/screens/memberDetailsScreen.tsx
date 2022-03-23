import React from 'react';
import {Divider, Card, Caption, useTheme, IconButton} from '@ui/library';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {StyleSheet, View} from 'react-native';
import {memberDetailsScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
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

export function MemberDetailsScreen({route}: {route: RouteProp<AppStackParamList, typeof memberDetailsScreen>}) {
  const {colors} = useTheme();
  const {data: account, loading} = useAccount(route.params.address);
  const snackbar = useSnackbar();
  const copyToClipboard = () => {
    Clipboard.setString(route.params.address);
    snackbar('Address copied to clipboard!');
  };
  return (
    <SafeView edges={noTopEdges}>
      {loading && !account ? (
        <LoadingView />
      ) : (
        <View style={globalStyles.paddedContainer}>
          {account ? (
            <Card>
              <Card.Content>
                <View style={globalStyles.alignCenter}>
                  <IdentityIcon value={account.address} size={50} />
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
                  <Caption style={{backgroundColor: colors.accent, alignSelf: 'flex-start'}} key={i}>{`"${
                    mapStatusText(judgement?.judgement ?? {}, Boolean(account?.registration.displayParent)).text
                  }" provided by Registrar #${judgement?.registrarIndex}`}</Caption>
                ))}
              </Card.Content>
            </Card>
          ) : null}
        </View>
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  caption: {
    paddingVertical: standardPadding,
  },
});
