import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, Divider, Layout} from '@ui-kitten/components';
import Balances from '@ui/components/Balances';
import ModalTitle from '@ui/components/ModalTitle';
import React, {useContext, useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';
import {useAccounts} from 'src/context/AccountsContext';
import {AppStackParamList} from '@ui/navigation/navigation';
import {balanceScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';
import {NetworkContext} from 'src/context/NetworkContext';

export function BalanceScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, typeof balanceScreen>;
}) {
  const {currentNetwork} = useContext(NetworkContext);
  const {accounts} = useAccounts();

  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const currentAccount = accounts[route.params.address];
  if (!currentAccount) {
    throw new Error("Couldn't find the account ");
  }

  const {data: accountInfo} = useAccountInfo(currentAccount.address);

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
        <Layout level="1" style={globalStyles.paddedContainer}>
          <ModalTitle title={currentAccount.meta.name} subtitle={` (@${currentNetwork.name})`} />
          <Divider />
          <Balances balance={accountInfo} />
          <Divider style={globalStyles.divider} />
          <Button appearance="ghost" onPress={() => modalRef.current?.close()}>
            Close
          </Button>
        </Layout>
      )}
    </Modalize>
  );
}
