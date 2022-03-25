import React, {useEffect, useRef} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Divider, Button} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import Balances from '@ui/components/Balances';
import ModalTitle from '@ui/components/ModalTitle';
import {Modalize} from 'react-native-modalize';
import {useAccount} from 'src/api/hooks/useAccount';
import {useAccounts} from 'src/context/AccountsContext';
import {balanceScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';
import {useNetwork} from 'context/NetworkContext';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';

export function BalanceScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof balanceScreen>;
}) {
  const {currentNetwork} = useNetwork();
  const {accounts} = useAccounts();

  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const currentAccount = accounts[route.params.address];
  if (!currentAccount) {
    throw new Error("Couldn't find the account ");
  }

  const {data: accountInfo} = useAccount(currentAccount.address);

  return (
    <Modalize
      ref={modalRef}
      threshold={250}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      adjustToContentHeight
      handlePosition="outside"
      onClose={navigation.goBack}
      closeOnOverlayTap
      panGestureEnabled>
      {accountInfo && (
        <Layout style={globalStyles.paddedContainer}>
          <ModalTitle title={currentAccount.meta.name} subtitle={` (@${currentNetwork.name})`} />
          <Divider />
          <Balances balance={accountInfo.balance} />
          <Divider />
          <Button onPress={() => modalRef.current?.close()}>Close</Button>
          <Padder scale={1} />
        </Layout>
      )}
    </Modalize>
  );
}
