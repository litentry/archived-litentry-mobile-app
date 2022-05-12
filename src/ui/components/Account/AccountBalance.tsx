import React from 'react';
import {View} from 'react-native';
import {List, Caption} from '@ui/library';
import globalStyles from '@ui/styles';
import {AccountBalance as AccountBalanceType} from 'src/api/hooks/useAccount';

type Props = {
  balance: AccountBalanceType;
};

export function AccountBalance({balance}: Props) {
  return (
    <>
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
            <Caption>{balance.formattedFreeFrozen}</Caption>
          </ItemRight>
        )}
      />
    </>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}
