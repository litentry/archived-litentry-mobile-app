import Identicon from '@polkadot/reactnative-identicon';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Button, Divider, Icon, IconProps, ListItem, MenuGroup, MenuItem, Text} from '@ui-kitten/components';
import BN from 'bn.js';
import {NetworkContext} from 'context/NetworkContext';
import RegistrarSelectionModal from 'layout/RegistrarSelectionModal';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import IdentityInfoForm, {IdentityPayload} from 'presentational/IdentityInfoForm';
import InfoBanner from 'presentational/InfoBanner';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import SuccessDialog from 'presentational/SuccessDialog';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import WebView from 'react-native-webview';
import {useQueryClient} from 'react-query';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useSubIdentities} from 'src/api/hooks/useSubIdentities';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {myIdentityScreen} from 'src/navigation/routeKeys';
import {buildAddressDetailUrl} from 'src/service/Polkasembly';
import {standardPadding} from 'src/styles';

function MyIdentity() {
  const {
    params: {address},
  } = useRoute<RouteProp<DashboardStackParamList, typeof myIdentityScreen>>();
  const startTx = useApiTx();
  const queryClient = useQueryClient();
  const {data: identity} = useAccountIdentityInfo(address);
  const {data: subAccounts} = useSubIdentities(address);

  const {currentNetwork} = useContext(NetworkContext);
  const [registrarSelectionOpen, setRegistrarSelectionOpen] = useState(false);

  const judgements = identity?.registration?.judgements;
  const judgementCount = judgements?.length || 0;

  const modalRef = useRef<Modalize>(null);
  const polkascanViewRef = useRef<Modalize>(null);

  const onSubmitIdentityInfo = useCallback(
    async (info: IdentityPayload) => {
      modalRef.current?.close();
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
    (index: number, fee?: BN) => {
      if (fee) {
        setRegistrarSelectionOpen(false);
        startTx({address, txMethod: 'identity.requestJudgement', params: [index, fee]})
          .then(() => {
            queryClient.invalidateQueries(['account_identity', address]);
          })
          .catch((e) => {
            Alert.alert('Something went wrong!');
            console.error(e);
          });
      }
    },
    [startTx, address, queryClient],
  );

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {identity?.hasIdentity ? (
            identity.hasJudgements ? (
              <SuccessDialog
                inline
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
          <ListItem
            disabled
            title="Address"
            accessoryLeft={(p) => (
              <View {...p}>
                <Identicon value={address} size={20} />
              </View>
            )}
            accessoryRight={() => (
              <Text selectable category="label" numberOfLines={1} style={styles.address} ellipsizeMode="middle">
                {address}
              </Text>
            )}
          />
          {identity?.hasIdentity ? (
            <>
              <ListItem
                disabled
                title="Display"
                accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="person-outline" />}
                accessoryRight={() => (
                  <Text selectable category="label" numberOfLines={1} ellipsizeMode="middle">
                    {identity?.display}
                  </Text>
                )}
              />
              <MenuGroup title=" Identity detail" accessoryLeft={MoreIcon}>
                <MenuItem
                  title="Legal"
                  accessoryLeft={(props) => <Icon {...props} name="award-outline" />}
                  accessoryRight={() => (
                    <Text selectable category="label">
                      {identity.registration?.legal || 'Unset'}
                    </Text>
                  )}
                />
                <MenuItem
                  title="Email"
                  accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
                  accessoryRight={() => (
                    <Text selectable category="label">
                      {identity.registration?.email || 'Unset'}
                    </Text>
                  )}
                />
                <MenuItem
                  title="Twitter"
                  accessoryLeft={(props) => <Icon {...props} name="twitter-outline" />}
                  accessoryRight={() => (
                    <Text selectable category="label">
                      {identity.registration?.twitter || 'Unset'}
                    </Text>
                  )}
                />
                <MenuItem
                  title="Riot"
                  accessoryLeft={(props) => <Icon {...props} name="message-square-outline" />}
                  accessoryRight={() => (
                    <Text selectable category="label">
                      {identity.registration?.riot || 'Unset'}
                    </Text>
                  )}
                />
                <MenuItem
                  title="Web"
                  accessoryLeft={(props) => <Icon {...props} name="browser-outline" />}
                  accessoryRight={() => (
                    <Text selectable category="label">
                      {identity.registration?.web || 'Unset'}
                    </Text>
                  )}
                />
              </MenuGroup>
            </>
          ) : null}

          <Padder scale={1} />
          <Button onPress={() => modalRef.current?.open()} status="basic">
            {identity?.hasIdentity ? 'Complete Identity' : 'Set Identity'}
          </Button>
          {identity?.hasIdentity ? (
            <>
              <Padder scale={1} />
              <Button onPress={() => setRegistrarSelectionOpen(true)} status="basic">
                Request Judgement
              </Button>
            </>
          ) : null}

          <Padder scale={1} />
          <ListItem
            title="View externally"
            onPress={() => polkascanViewRef.current?.open()}
            accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="md-share" pack="ionic" />}
            accessoryRight={() => (
              <Text selectable category="label" numberOfLines={1} ellipsizeMode="middle">
                Polkascan
              </Text>
            )}
          />

          {subAccounts?.length ? (
            <MenuGroup title={`Sub accounts (${subAccounts.length})`} accessoryLeft={SubAccountsIcon}>
              {subAccounts?.map((item) => (
                <MenuItem
                  key={String(item.accountId)}
                  title={(p) => (
                    <View {...p}>
                      <AccountInfoInlineTeaser identity={item} />
                    </View>
                  )}
                  accessoryLeft={(p) => (
                    <View {...p}>
                      <Identicon value={item.accountId} size={20} />
                    </View>
                  )}
                />
              ))}
            </MenuGroup>
          ) : null}
        </View>

        <RegistrarSelectionModal
          onClose={() => setRegistrarSelectionOpen(false)}
          onSelect={handleRequestJudgement}
          visible={registrarSelectionOpen}
        />
        <Modalize
          ref={modalRef}
          threshold={250}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          adjustToContentHeight
          handlePosition="outside"
          closeOnOverlayTap
          withReactModal
          useNativeDriver
          panGestureEnabled>
          <View>
            <IdentityInfoForm onSubmit={onSubmitIdentityInfo} identity={identity} />
          </View>
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

export default MyIdentity;

const styles = StyleSheet.create({
  content: {padding: standardPadding * 2},
  header: {paddingHorizontal: standardPadding * 2},
  address: {flex: 2},
  polkascanWebView: {height: 500},
});

const MoreIcon = (props: IconProps) => <Icon {...props} pack="ionic" name="ios-apps-outline" />;
const SubAccountsIcon = (props: IconProps) => <Icon {...props} pack="ionic" name="ios-people" />;
