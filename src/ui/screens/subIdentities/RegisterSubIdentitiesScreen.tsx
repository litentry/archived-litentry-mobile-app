import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useQueryClient} from 'react-query';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, Caption, Subheading, List, Divider, IconButton, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';
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
import {Padder} from '@ui/components/Padder';
import {stringShorten} from '@polkadot/util';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;
};

export function RegisterSubIdentitiesScreen({route, navigation}: ScreenProps) {
  const {colors} = useTheme();
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
      headerRight: () => <IconButton size={30} icon="plus-circle-outline" onPress={onAddSubIdentityPress} />,
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
      <View style={[globalStyles.paddedContainer, globalStyles.flex]}>
        <Button mode="contained" onPress={onSetSubIdentitiesPress} disabled={submitSubsDisabled}>
          Set Sub-identities
        </Button>
        <Padder scale={0.5} />
        <Caption>Set sub-identities after adding/removing your accounts.</Caption>
        <Padder scale={0.5} />
        <Divider />
        <Padder scale={1} />
        <FlatList
          ListHeaderComponent={() => <Subheading>{`Sub-identities (${subIdentities?.length || 0})`}</Subheading>}
          data={subIdentities}
          keyExtractor={(item) => String(item.accountId)}
          renderItem={({item}) => (
            <List.Item
              disabled={true}
              title={() => <AccountInfoInlineTeaser identity={item} />}
              description={<Caption>{stringShorten(String(item.accountId), 12)}</Caption>}
              left={() => (
                <View style={globalStyles.justifyCenter}>
                  <Identicon value={item.accountId} size={30} />
                </View>
              )}
              right={() => (
                <IconButton
                  icon="delete-outline"
                  color={colors.error}
                  onPress={() => onRemovePress(String(item.accountId))}
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
        <Layout>
          <ModalTitle title="Add sub-identity" />
          <AddSubIdentity onAddPress={onAddPress} subIdentities={subIdentities} />
        </Layout>
      </Modalize>
    </SafeView>
  );
}
