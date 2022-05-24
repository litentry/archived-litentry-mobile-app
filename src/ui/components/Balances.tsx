import React from 'react';
import {View} from 'react-native';
import {List, Caption} from '@ui/library';
import {Layout} from './Layout';
import globalStyles from '@ui/styles';
import {AccountBalance} from 'src/api/hooks/useAccount';

type Props = {
  balance: AccountBalance;
};

function Balances({balance}: Props) {
  return (
    <Layout>
      <List.Item
        title="Total Balance"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedTotal}</Caption>
          </ItemRight>
        )}
      />
      <List.Item
        title="Transferrable"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedFree}</Caption>
          </ItemRight>
        )}
      />
      <List.Item
        title="Reserved"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedReserved}</Caption>
          </ItemRight>
        )}
      />
      <List.Item
        title="Locked"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedFeeFrozen}</Caption>
          </ItemRight>
        )}
      />
    </Layout>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

export default Balances;
