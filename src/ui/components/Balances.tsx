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
        testID={'total_balance'}
      />
      <List.Item
        title="Transferrable"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedFree}</Caption>
          </ItemRight>
        )}
        testID={'transferrable'}
      />
      <List.Item
        title="Reserved"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedReserved}</Caption>
          </ItemRight>
        )}
        testID={'reserved'}
      />
      <List.Item
        title="Locked"
        right={() => (
          <ItemRight>
            <Caption>{balance.formattedFreeFrozen}</Caption>
          </ItemRight>
        )}
        testID={'locked'}
      />
    </Layout>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

export default Balances;
