import React, {useCallback, useContext, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Layout} from '@ui/components/Layout';
import {Button, List, Icon, Caption, Divider} from '@ui/library';
import {NetworkContext} from 'context/NetworkContext';
import RegistrarSelectionModal from '@ui/components/RegistrarSelectionModal';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import IdentityInfoForm, {IdentityPayload} from '@ui/components/IdentityInfoForm';
import InfoBanner from '@ui/components/InfoBanner';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import SuccessDialog from '@ui/components/SuccessDialog';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import WebView from 'react-native-webview';
import {useQueryClient} from 'react-query';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useSubIdentities} from 'src/api/hooks/useSubIdentities';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {manageIdentityScreen, registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';
import {buildAddressDetailUrl} from 'src/service/Polkasembly';
import globalStyles, {standardPadding} from '@ui/styles';
import {RegistrarInfoWithIndex} from 'src/api/hooks/useRegistrars';
import {stringShorten} from '@polkadot/util';

function ManageIdentity({
  navigation,
  route: {
    params: {address},
  },
}: {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;
}) {
  const startTx = useApiTx();
  const queryClient = useQueryClient();
  const {data: identity} = useAccountIdentityInfo(address);
  const {data: subAccounts} = useSubIdentities(address);

  const {currentNetwork} = useContext(NetworkContext);
  const [registrarSelectionOpen, setRegistrarSelectionOpen] = useState(false);

  const judgements = identity?.registration?.judgements;
  const judgementCount = judgements?.length || 0;

  const identityModalRef = useRef<Modalize>(null);
  const polkascanViewRef = useRef<Modalize>(null);

  const onSubmitIdentityInfo = useCallback(
    async (info: IdentityPayload) => {
      identityModalRef.current?.close();
      await startTx({address, txMethod: 'identity.setIdentity', params: [info]})
        .then(() => {
          queryClient.invalidateQueries(['account_identity', address]);
        })
        .catch((e) => {
          Alert.alert('Something went wrong!');
          console.error(e);
        });
    },
    [address, queryClient, startTx],
  );

  const handleRequestJudgement = useCallback(
    ({index, fee}: RegistrarInfoWithIndex) => {
      setRegistrarSelectionOpen(false);
      startTx({address, txMethod: 'identity.requestJudgement', params: [index, fee]})
        .then(() => {
          queryClient.invalidateQueries(['account_identity', address]);
        })
        .catch((e) => {
          Alert.alert('Something went wrong!');
          console.error(e);
        });
    },
    [startTx, address, queryClient],
  );

  const clearIdentity = () => {
    Alert.alert('Clear Identity', `Clear identity of account: \n ${address}`, [
      {
        text: 'Yes',
        onPress: () => {
          startTx({
            address,
            txMethod: 'identity.clearIdentity',
            params: [],
          }).then(() => {
            queryClient.invalidateQueries(['account_identity', address]);
          });
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
          {identity?.hasIdentity ? (
            identity.hasJudgements ? (
              <SuccessDialog
                text={`This address has ${judgementCount} judgement${
                  judgementCount > 1 ? 's' : ''
                } from Registrar ${judgements?.map((judgement) => `#${judgement[0]}`).join(',')}. It's all set. 🎉`}
              />
            ) : (
              <InfoBanner text="There is identify data found, however no Judgement is provided." inline />
            )
          ) : (
            <InfoBanner text="This address doesn't have any identity connected to it." inline />
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
          {identity?.hasIdentity ? (
            <>
              <List.Item
                title="Display"
                left={() => <LeftIcon icon="account" />}
                right={() => (
                  <ItemRight>
                    <Caption>{identity.display}</Caption>
                  </ItemRight>
                )}
              />
              <List.Accordion title="Identity Detail">
                <List.Item
                  title="Legal"
                  left={() => <LeftIcon icon="medal-outline" />}
                  right={() => (
                    <ItemRight>
                      <Caption>{identity.registration?.legal || 'Unset'}</Caption>
                    </ItemRight>
                  )}
                />
                <List.Item
                  title="Email"
                  left={() => <LeftIcon icon="email-outline" />}
                  right={() => (
                    <ItemRight>
                      <Caption>{identity.registration?.email || 'Unset'}</Caption>
                    </ItemRight>
                  )}
                />
                <List.Item
                  title="Twitter"
                  left={() => <LeftIcon icon="twitter" />}
                  right={() => (
                    <ItemRight>
                      <Caption>{identity.registration?.twitter || 'Unset'}</Caption>
                    </ItemRight>
                  )}
                />
                <List.Item
                  title="Riot"
                  left={() => <LeftIcon icon="message-outline" />}
                  right={() => (
                    <ItemRight>
                      <Caption>{identity.registration?.riot || 'Unset'}</Caption>
                    </ItemRight>
                  )}
                />
                <List.Item
                  title="Web"
                  left={() => <LeftIcon icon="earth" />}
                  right={() => (
                    <ItemRight>
                      <Caption>{identity.registration?.web || 'Unset'}</Caption>
                    </ItemRight>
                  )}
                />
              </List.Accordion>
            </>
          ) : null}

          <Padder scale={1} />
          <Button onPress={() => identityModalRef.current?.open()} mode="outlined">
            {identity?.hasIdentity ? 'Update Identity' : 'Set Identity'}
          </Button>
          {identity?.hasIdentity ? (
            <>
              <Padder scale={1} />
              <Button onPress={() => setRegistrarSelectionOpen(true)} mode="outlined">
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

          {subAccounts?.length ? (
            <List.Accordion title={`Sub accounts (${subAccounts.length})`}>
              {subAccounts?.map((item) => (
                <List.Item
                  key={String(item.accountId)}
                  title={<AccountInfoInlineTeaser identity={item} />}
                  left={() => (
                    <ItemRight>
                      <Identicon value={item.accountId} size={20} />
                    </ItemRight>
                  )}
                />
              ))}
            </List.Accordion>
          ) : null}

          <List.Item
            title="View externally"
            onPress={() => polkascanViewRef.current?.open()}
            left={() => <LeftIcon icon="share" />}
            right={() => (
              <ItemRight>
                <Caption>{`Polkascan`}</Caption>
              </ItemRight>
            )}
          />
        </View>

        <RegistrarSelectionModal
          onClose={() => setRegistrarSelectionOpen(false)}
          onSelect={handleRequestJudgement}
          visible={registrarSelectionOpen}
        />
        <Modalize
          ref={identityModalRef}
          threshold={250}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          adjustToContentHeight
          handlePosition="outside"
          closeOnOverlayTap
          withReactModal
          useNativeDriver
          panGestureEnabled>
          <Layout>
            <IdentityInfoForm onSubmit={onSubmitIdentityInfo} identity={identity} />
          </Layout>
        </Modalize>

        <Modalize
          ref={polkascanViewRef}
          threshold={250}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          adjustToContentHeight
          handlePosition="outside"
          closeOnOverlayTap
          withReactModal
          useNativeDriver
          panGestureEnabled>
          <WebView
            injectedJavaScript={`(function() {
                // remove some html element
                document.querySelectorAll('.navbar')[1].remove()
            })();`}
            source={{uri: buildAddressDetailUrl(address || '', currentNetwork?.key || 'polkadot')}}
            style={styles.polkascanWebView}
            onMessage={() => null}
          />
        </Modalize>
      </ScrollView>
    </SafeView>
  );
}

export default ManageIdentity;

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
