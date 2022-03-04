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
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';
import {AddSubIdentity} from './AddSubIdentity';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';
import {stringShorten} from '@polkadot/util';
import {useSubAccounts} from 'src/api/hooks/useSubAccounts';
import {Account} from '@ui/components/Account/Account';
import type {Account as AccountType, AccountBalance, AccountRegistration} from 'src/api/hooks/useAccount';

export type SubIdentity = {
  address: string;
  display: string;
};

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;
};

export function RegisterSubIdentitiesScreen({route, navigation}: ScreenProps) {
  const {colors} = useTheme();
  const address = route.params.address;
  const modalRef = useRef<Modalize>(null);
  const {data: accountInfo} = useSubAccounts(address);
  const [subIdentities, setSubIdentities] = useState<AccountType[]>();
  const [submitSubsDisabled, setSubmitSubsDisabled] = useState(true);
  const queryClient = useQueryClient();
  const startTx = useApiTx();

  useEffect(() => {
    if (accountInfo?.subAccounts?.length) {
      setSubIdentities(accountInfo.subAccounts.map((subAccount) => subAccount.account));
    }
  }, [accountInfo, setSubIdentities]);

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
      params: [subIdentities?.map((sub) => [sub.address, {raw: sub.registration?.display}])],
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

  const onAddPress = (subIdentity: SubIdentity) => {
    setSubIdentities((prevInfos) => {
      if (prevInfos) {
        return [
          ...prevInfos,
          {
            address: subIdentity.address,
            display: subIdentity.display,
            hasIdentity: false,
            registration: [] as AccountRegistration,
            balance: {} as AccountBalance,
          },
        ];
      }
      return prevInfos;
    });
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
              return prevInfos?.filter((info) => info.address !== accountId);
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
          keyExtractor={(account) => account.address}
          renderItem={({item}) => (
            <List.Item
              disabled={true}
              title={() => <Account account={item} />}
              description={<Caption>{stringShorten(item.address, 12)}</Caption>}
              left={() => (
                <View style={globalStyles.justifyCenter}>
                  <Identicon value={item.address} size={30} />
                </View>
              )}
              right={() => (
                <IconButton icon="delete-outline" color={colors.error} onPress={() => onRemovePress(item.address)} />
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
