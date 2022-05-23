import React, {useCallback} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Layout} from '@ui/components/Layout';
import {Button, List, Icon, Caption, Divider, IconButton} from '@ui/library';
import {useNetwork} from 'context/NetworkContext';
import IdentityInfoForm, {IdentityPayload} from '@ui/components/IdentityInfoForm';
import InfoBanner from '@ui/components/InfoBanner';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SuccessDialog} from '@ui/components/SuccessDialog';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import {useApiTx} from 'src/api/hooks/useApiTx';
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
import {useDynamicBottomSheet} from 'src/hooks/useDynamicBottomSheet';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;
};

export function ManageIdentityScreen({navigation, route}: ScreenProps) {
  const {currentNetwork} = useNetwork();
  const {address} = route.params;

  const startTx = useApiTx();
  const {data: accountInfo, refetch: refetchAccount} = useSubAccounts(address);

  const judgements = accountInfo?.registration?.judgements;
  const judgementCount = judgements?.length || 0;
  const hasJudgements = judgements && judgementCount > 0;

  const {closeBottomSheet, openBottomSheet, BottomSheet} = useDynamicBottomSheet();

  const onSubmitIdentityInfo = useCallback(
    async (info: IdentityPayload) => {
      closeBottomSheet();
      await startTx({address, txMethod: 'identity.setIdentity', params: [info]})
        .then(() => refetchAccount({address}))
        .catch((e) => {
          Alert.alert('Something went wrong!');
          console.error(e);
        });
    },
    [address, startTx, refetchAccount, closeBottomSheet],
  );

  const handleRequestJudgement = useCallback(
    ({id, fee}: Registrar) => {
      closeBottomSheet();
      startTx({address, txMethod: 'identity.requestJudgement', params: [id, fee]})
        .then(() => refetchAccount({address}))
        .catch((e) => {
          Alert.alert('Something went wrong!');
          console.error(e);
        });
    },
    [startTx, address, refetchAccount, closeBottomSheet],
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="information"
          onPress={() => {
            openBottomSheet(<IdentityGuide onClose={closeBottomSheet} />);
          }}
        />
      ),
    });
  }, [navigation, openBottomSheet, closeBottomSheet]);

  const clearIdentity = () => {
    Alert.alert('Clear Identity', `Clear identity of account: \n ${address}`, [
      {
        text: 'Yes',
        onPress: () => {
          startTx({
            address,
            txMethod: 'identity.clearIdentity',
            params: [],
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
          <List.Item
            title="Address"
            left={() => (
              <ItemRight>
                <Identicon value={address} size={20} />
              </ItemRight>
            )}
            right={() => (
              <ItemRight>
                <Caption>{stringShorten(address)}</Caption>
              </ItemRight>
            )}
          />
          {accountInfo?.registration ? <AccountRegistration registration={accountInfo.registration} /> : null}
          <Padder scale={1} />
          <Button
            onPress={() => {
              openBottomSheet(
                <Layout>
                  <IdentityInfoForm onSubmit={onSubmitIdentityInfo} accountInfo={accountInfo} />
                </Layout>,
              );
            }}
            mode="outlined">
            {accountInfo?.hasIdentity ? 'Update Identity' : 'Set Identity'}
          </Button>
          {accountInfo?.hasIdentity ? (
            <>
              <Padder scale={1} />
              <Button
                onPress={() => {
                  openBottomSheet(<RequestJudgement onRequest={handleRequestJudgement} onClose={closeBottomSheet} />);
                }}
                mode="outlined">
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
                  left={() => (
                    <ItemRight>
                      <Identicon value={subAccount.account.address} size={20} />
                    </ItemRight>
                  )}
                />
              ))}
            </List.Accordion>
          ) : null}

          <List.Item
            title="View externally"
            onPress={() => {
              openBottomSheet(
                <WebView
                  injectedJavaScript={`(function() {
            // remove some html element
            document.querySelectorAll('.navbar')[1].remove()
        })();`}
                  source={{uri: buildAddressDetailUrl(address || '', currentNetwork?.key || 'polkadot')}}
                  style={styles.polkascanWebView}
                  onMessage={() => null}
                />,
              );
            }}
            left={() => <LeftIcon icon="share" />}
            right={() => (
              <ItemRight>
                <Caption>{`Polkascan`}</Caption>
              </ItemRight>
            )}
          />
        </View>
      </ScrollView>

      <BottomSheet />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  content: {padding: standardPadding * 2},
  header: {paddingHorizontal: standardPadding * 2},
  address: {flex: 2},
  polkascanWebView: {height: 500},
});

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

function LeftIcon({icon}: {icon: string}) {
  return (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );
}
