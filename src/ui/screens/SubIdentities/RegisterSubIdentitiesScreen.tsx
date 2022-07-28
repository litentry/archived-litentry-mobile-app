import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {stringShorten} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, Text, List, Divider, IconButton, useTheme, useBottomSheet} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
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
import type {SubIdentityPayload} from 'polkadot-api';
import type {Account as SubstrateChainAccount, AccountBalance, AccountRegistration} from 'src/api/hooks/useAccount';

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
  const address = route.params.address;
  const {data: accountInfo, refetch: refetchAccount} = useSubAccounts(address);
  const [subIdentities, setSubIdentities] = useState<SubstrateChainAccount[]>();
  const [submitSubsDisabled, setSubmitSubsDisabled] = useState(true);
  const {startTx} = useStartTx();

  useEffect(() => {
    if (accountInfo?.subAccounts?.length) {
      setSubIdentities(accountInfo.subAccounts.map((subAccount) => subAccount.account));
    }
  }, [accountInfo, setSubIdentities]);

  const HeaderRight = React.useCallback(
    () => <IconButton size={30} icon="plus-circle-outline" onPress={openBottomSheet} />,
    [openBottomSheet],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [navigation, HeaderRight]);

  const onSetSubIdentities = async () => {
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

  const onAddAccount = React.useCallback(
    (subIdentity: SubIdentity) => {
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
    },
    [closeBottomSheet],
  );

  const onRemoveAccount = React.useCallback((account: string) => {
    Alert.alert(
      'Remove sub-identity',
      `Do you want to remove account: \n ${account} ?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            setSubIdentities((prevInfos) => {
              return prevInfos?.filter((info) => info.address !== account);
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
  }, []);

  return (
    <SafeView edges={noTopEdges}>
      <View style={[globalStyles.paddedContainer, globalStyles.flex]}>
        <Button
          mode="contained"
          onPress={onSetSubIdentities}
          disabled={submitSubsDisabled}
          testID="set-sub-identity-button">
          Set Sub-identities
        </Button>
        <Padder scale={0.5} />
        <Text variant="bodySmall">Set sub-identities after adding/removing your accounts.</Text>
        <Padder scale={0.5} />
        <Divider />
        <Padder scale={1} />
        <FlatList
          ListHeaderComponent={<Text variant="titleMedium">{`Sub-identities (${subIdentities?.length || 0})`}</Text>}
          data={subIdentities}
          keyExtractor={(account) => account.address}
          renderItem={({item}) => <SubAccountItem account={item} onRemove={onRemoveAccount} />}
          ListEmptyComponent={<EmptyView height={200}>{`No sub-identities set.`}</EmptyView>}
        />
      </View>
      <BottomSheet>
        <Layout>
          <Text variant="titleMedium" style={globalStyles.textCenter}>{`Add sub-identity`}</Text>
          <Padder scale={1} />
          <AddSubIdentity onAddPress={onAddAccount} subIdentities={subIdentities} onClose={closeBottomSheet} />
          <Padder scale={1} />
        </Layout>
      </BottomSheet>
    </SafeView>
  );
}

type SubIdentityItemProps = {
  account: SubstrateChainAccount;
  onRemove: (account: string) => void;
};

function SubAccountItem({account, onRemove}: SubIdentityItemProps) {
  const {colors} = useTheme();
  const AccountIdentityIcon = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Identicon value={account.address} size={30} />
      </View>
    ),
    [account.address],
  );

  const RemoveSubAccount = React.useCallback(
    () => (
      <IconButton
        icon="delete-outline"
        iconColor={colors.error}
        onPress={() => onRemove(account.address)}
        testID="delete-button"
      />
    ),
    [account.address, onRemove, colors.error],
  );

  return (
    <List.Item
      disabled={true}
      title={<Account account={account} />}
      description={<Text variant="bodySmall">{stringShorten(account.address, 12)}</Text>}
      left={AccountIdentityIcon}
      right={RemoveSubAccount}
    />
  );
}
