import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useQueryClient} from 'react-query';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, Divider, IconProps, Layout, ListItem, Text, TopNavigationAction} from '@ui-kitten/components';
import Icon from '@ui/components/Icon';
import ModalTitle from '@ui/components/ModalTitle';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useSubIdentities} from 'src/api/hooks/useSubIdentities';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';
import {AddSubIdentity} from './AddSubIdentity';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {EmptyView} from '@ui/components/EmptyView';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;
};

export function RegisterSubIdentitiesScreen({route, navigation}: ScreenProps) {
  const address = route.params.address;
  const modalRef = useRef<Modalize>(null);
  const {data: parentIdentityInfo} = useAccountIdentityInfo(address);
  const {data: subIdentitiesData} = useSubIdentities(address);
  const [subIdentities, setSubIdentities] = useState(subIdentitiesData || []);
  const [submitSubsDisabled, setSubmitSubsDisabled] = useState(true);
  const queryClient = useQueryClient();
  const startTx = useApiTx();

  useEffect(() => {
    if (subIdentitiesData?.length) {
      setSubIdentities(subIdentitiesData);
    }
  }, [subIdentitiesData, setSubIdentities]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TopNavigationAction
          icon={(props) => <Icon {...props} name="plus-circle-outline" />}
          onPress={onAddSubIdentityPress}
        />
      ),
    });
  }, [navigation]);

  const onAddSubIdentityPress = () => {
    modalRef.current?.open();
  };

  const onSetSubIdentitiesPress = async () => {
    startTx({
      address,
      txMethod: 'identity.setSubs',
      params: [subIdentities.map((sub) => [sub.accountId, {raw: sub.registration?.display}])],
    })
      .then(() => {
        queryClient.invalidateQueries(['sub_accounts', {address}]);
        queryClient.invalidateQueries(['sub-identities', {address}]);
        setSubmitSubsDisabled(true);
      })
      .catch((e: Error) => {
        console.warn(e);
      });
  };

  const onAddPress = (subIdentity: IdentityInfo) => {
    setSubIdentities((prevInfos) => [
      ...prevInfos,
      {...subIdentity, display: `${parentIdentityInfo?.registration?.display}/${subIdentity.registration?.display}`},
    ]);
    setSubmitSubsDisabled(false);
    modalRef.current?.close();
  };

  const onRemovePress = (accountId: string) => {
    Alert.alert(
      'Remove sub-identity',
      `Do you want to remove account: \n ${accountId} ?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            setSubIdentities((prevInfos) => {
              return prevInfos.filter((info) => info.accountId !== accountId);
            });
            setSubmitSubsDisabled(false);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <Button style={styles.setSubIdentitiesButton} onPress={onSetSubIdentitiesPress} disabled={submitSubsDisabled}>
          Set Sub-identities
        </Button>
        <View style={styles.hintTextContainer}>
          <Text category="c2" appearance="hint">
            Set sub-identities after adding/removing your accounts.
          </Text>
        </View>
        <Divider />
        <FlatList
          ListHeaderComponent={() => (
            <Text category="s1" style={styles.subIdentitiesListHeader}>
              {`Sub-identities (${subIdentities?.length || 0})`}
            </Text>
          )}
          data={subIdentities}
          keyExtractor={(item) => String(item.accountId)}
          renderItem={({item}) => (
            <ListItem
              disabled={true}
              title={(p) => (
                <View {...p}>
                  <AccountInfoInlineTeaser identity={item} />
                </View>
              )}
              description={String(item.accountId)}
              accessoryLeft={() => <Identicon value={item.accountId} size={30} />}
              accessoryRight={() => (
                <Button
                  onPress={() => onRemovePress(String(item.accountId))}
                  accessoryLeft={RemoveIcon}
                  status="danger"
                  appearance="ghost"
                />
              )}
            />
          )}
          ListEmptyComponent={<EmptyView height={200}>{`No sub-identities set.`}</EmptyView>}
        />
      </View>
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
        <Layout level="1" style={globalStyles.paddedContainer}>
          <ModalTitle title="Add sub-identity" />
          <AddSubIdentity onAddPress={onAddPress} subIdentities={subIdentities} />
        </Layout>
      </Modalize>
    </SafeView>
  );
}

const RemoveIcon = (props: IconProps) => <Icon {...props} name="trash-2-outline" />;

const styles = StyleSheet.create({
  setSubIdentitiesButton: {marginBottom: 10, marginHorizontal: 30},
  subIdentitiesListHeader: {paddingBottom: 10, marginTop: 10},
  hintTextContainer: {alignItems: 'center', marginBottom: 20},
});
