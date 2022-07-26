import React, {useCallback} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, List, Icon, Caption, Divider, IconButton, useBottomSheet} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
import {useNetwork} from '@atoms/network';
import {IdentityInfoForm} from '@ui/components/IdentityInfoForm';
import InfoBanner from '@ui/components/InfoBanner';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SuccessDialog} from '@ui/components/SuccessDialog';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {manageIdentityScreen, registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';
import {buildAddressDetailUrl} from 'src/service/Polkasembly';
import globalStyles, {standardPadding} from '@ui/styles';
import {Registrar} from 'src/api/hooks/useRegistrarsSummary';
import {stringShorten} from '@polkadot/util';
import {Account} from '@ui/components/Account/Account';
import {useSubAccounts} from 'src/api/hooks/useSubAccounts';
import {AccountRegistration} from '@ui/components/Account/AccountRegistration';
import {IdentityGuide} from '@ui/components/IdentityGuide';
import {RequestJudgement} from '@ui/components/RequestJudgement';
import {useStartTx} from 'context/TxContext';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;
};

const AccountIdentityIcon = (address: string) => () =>
  (
    <View style={globalStyles.justifyCenter}>
      <Identicon value={address} size={20} />
    </View>
  );

const ViewExternallyIcon = () => (
  <View style={globalStyles.justifyCenter}>
    <Icon name="share" size={20} />
  </View>
);

const ItemRight = (text: string) => () =>
  (
    <View style={globalStyles.justifyCenter}>
      <Caption>{text}</Caption>
    </View>
  );

export function ManageIdentityScreen({navigation, route}: ScreenProps) {
  const {currentNetwork} = useNetwork();
  const {address} = route.params;

  const {startTx} = useStartTx();
  const {data: accountInfo, refetch: refetchAccount} = useSubAccounts(address);

  const judgements = accountInfo?.registration?.judgements;
  const judgementCount = judgements?.length || 0;
  const hasJudgements = judgements && judgementCount > 0;

  const {
    closeBottomSheet: closeIdentityGuide,
    openBottomSheet: openIdentityGuide,
    BottomSheet: IdentityGuideBottomSheet,
  } = useBottomSheet();
  const {
    closeBottomSheet: closeIdentityInfo,
    openBottomSheet: openIdentityInfo,
    BottomSheet: IdentityInfoBottomSheet,
  } = useBottomSheet();
  const {
    closeBottomSheet: closeRequestJudgement,
    openBottomSheet: openRequestJudgement,
    BottomSheet: RequestJudgementBottomSheet,
  } = useBottomSheet();
  const {openBottomSheet: openPolkassembly, BottomSheet: PolkassemblyBottomSheet} = useBottomSheet();

  const onIdentitySet = React.useCallback(() => {
    closeIdentityInfo();
    refetchAccount({address});
  }, [closeIdentityInfo, address, refetchAccount]);

  const handleRequestJudgement = useCallback(
    ({id, fee}: Registrar) => {
      closeRequestJudgement();
      startTx({address, txConfig: {method: 'identity.requestJudgement', params: [id, fee]}})
        .then(() => refetchAccount({address}))
        .catch((e) => {
          Alert.alert('Something went wrong!');
          console.error(e);
        });
    },
    [startTx, address, refetchAccount, closeRequestJudgement],
  );

  const HeaderRight = React.useCallback(
    () => <IconButton icon="information" onPress={openIdentityGuide} />,
    [openIdentityGuide],
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [navigation, HeaderRight]);

  const clearIdentity = () => {
    Alert.alert('Clear Identity', `Clear identity of account: \n ${address}`, [
      {
        text: 'Yes',
        onPress: () => {
          startTx({
            address,
            txConfig: {method: 'identity.clearIdentity', params: []},
          }).then(() => refetchAccount({address}));
        },
        style: 'destructive',
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {accountInfo?.hasIdentity ? (
            hasJudgements ? (
              <SuccessDialog
                text={`This address has ${judgementCount} judgement${
                  judgementCount > 1 ? 's' : ''
                } from Registrar ${judgements
                  ?.map((judgement) => `#${judgement?.registrarIndex}`)
                  .join(', ')}. It's all set. 🎉`}
              />
            ) : (
              <InfoBanner text="There is identify data found, however no Judgement is provided." />
            )
          ) : (
            <InfoBanner text="This address doesn't have any identity connected to it." />
          )}
        </View>
        <Divider />
        <View>
          <Padder scale={1} />
          <List.Item title="Address" left={AccountIdentityIcon(address)} right={ItemRight(stringShorten(address))} />
          {accountInfo?.registration ? <AccountRegistration registration={accountInfo.registration} /> : null}
          <Padder scale={1} />
          <Button onPress={openIdentityInfo} mode="outlined">
            {accountInfo?.hasIdentity ? 'Update Identity' : 'Set Identity'}
          </Button>
          {accountInfo?.hasIdentity ? (
            <>
              <Padder scale={1} />
              <Button onPress={openRequestJudgement} mode="outlined">
                Request Judgement
              </Button>
              <Padder scale={1} />
              <Button
                onPress={() => {
                  navigation.navigate(registerSubIdentitiesScreen, {address});
                }}
                mode="outlined">
                Set Sub-identities
              </Button>
              <Padder scale={1} />
              <Button onPress={clearIdentity} mode="outlined">
                Clear Identity
              </Button>
            </>
          ) : null}

          <Padder scale={1} />

          {accountInfo?.subAccounts?.length ? (
            <List.Accordion title={`Sub accounts (${accountInfo.subAccounts.length})`}>
              {accountInfo.subAccounts?.map((subAccount) => (
                <List.Item
                  key={String(subAccount.account.address)}
                  title={<Account account={subAccount.account} />}
                  left={AccountIdentityIcon(subAccount.account.address)}
                />
              ))}
            </List.Accordion>
          ) : null}

          <List.Item
            title="View externally"
            onPress={openPolkassembly}
            left={ViewExternallyIcon}
            right={ItemRight('Polkascan')}
          />
        </View>
      </ScrollView>

      <IdentityGuideBottomSheet>
        <IdentityGuide onSkip={closeIdentityGuide} />
      </IdentityGuideBottomSheet>

      <IdentityInfoBottomSheet>
        <IdentityInfoForm onIdentitySet={onIdentitySet} address={address} />
      </IdentityInfoBottomSheet>

      <RequestJudgementBottomSheet>
        <RequestJudgement onRequest={handleRequestJudgement} onClose={closeRequestJudgement} />
      </RequestJudgementBottomSheet>

      <PolkassemblyBottomSheet>
        <WebView
          injectedJavaScript={`(function() {
            // remove some html element
            document.querySelectorAll('.navbar')[1].remove()
        })();`}
          source={{uri: buildAddressDetailUrl(address || '', currentNetwork?.key || 'polkadot')}}
          style={styles.polkascanWebView}
          onMessage={() => null}
        />
      </PolkassemblyBottomSheet>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  content: {padding: standardPadding * 2},
  header: {paddingHorizontal: standardPadding * 2},
  address: {flex: 2},
  polkascanWebView: {height: 500},
});
