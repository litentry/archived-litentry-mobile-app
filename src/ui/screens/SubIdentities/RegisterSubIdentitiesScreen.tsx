import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {stringShorten} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, Caption, Subheading, List, Divider, IconButton, useTheme, useBottomSheet} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';
import {AddSubIdentity} from './AddSubIdentity';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';
import {useSubAccounts} from 'src/api/hooks/useSubAccounts';
import {Account} from '@ui/components/Account/Account';
import {useStartTx} from 'context/TxContext';
import type {Account as AccountType, AccountBalance, AccountRegistration} from 'src/api/hooks/useAccount';
import type {SubIdentityPayload} from 'polkadot-api';

export type SubIdentity = {
  address: string;
  display: string;
};

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;
};

export function RegisterSubIdentitiesScreen({route, navigation}: ScreenProps) {
  const {closeBottomSheet, openBottomSheet, BottomSheet} = useBottomSheet();
  const {colors} = useTheme();
  const address = route.params.address;
  const {data: accountInfo, refetch: refetchAccount} = useSubAccounts(address);
  const [subIdentities, setSubIdentities] = useState<AccountType[]>();
  const [submitSubsDisabled, setSubmitSubsDisabled] = useState(true);
  const {startTx} = useStartTx();

  useEffect(() => {
    if (accountInfo?.subAccounts?.length) {
      setSubIdentities(accountInfo.subAccounts.map((subAccount) => subAccount.account));
    }
  }, [accountInfo, setSubIdentities]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton size={30} icon="plus-circle-outline" onPress={openBottomSheet} />,
    });
  }, [navigation, openBottomSheet]);

  const onSetSubIdentitiesPress = async () => {
    const subs = subIdentities?.reduce((_subIdentities, sub) => {
      if (sub.registration?.display) {
        _subIdentities.push([sub.address, {raw: sub.registration.display}]);
      }
      return _subIdentities;
    }, [] as Array<SubIdentityPayload>);
    if (subs) {
      startTx({
        address,
        txConfig: {
          method: 'identity.setSubs',
          params: subs,
        },
      })
        .then(() => {
          refetchAccount({address});
          setSubmitSubsDisabled(true);
        })
        .catch((e: Error) => {
          console.warn(e);
        });
    }
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
    closeBottomSheet();
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
      <BottomSheet>
        <Layout>
          <Subheading style={globalStyles.textCenter}>{`Add sub-identity`}</Subheading>
          <Padder scale={1} />
          <AddSubIdentity onAddPress={onAddPress} subIdentities={subIdentities} onClose={closeBottomSheet} />
          <Padder scale={1} />
        </Layout>
      </BottomSheet>
    </SafeView>
  );
}
