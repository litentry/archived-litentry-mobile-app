import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Caption} from '@ui/library';
import {AccountBalance as AccountBalanceType} from 'src/api/hooks/useAccount';

type Props = {
  balance: AccountBalanceType;
};

export function AccountBalance({balance}: Props) {
  return (
    <>
      <List.Item
        title="Total Balance"
        right={() => <Caption style={styles.centerAlign}>{balance.formattedTotal}</Caption>}
      />
      <List.Item
        title="Transferrable"
        right={() => <Caption style={styles.centerAlign}>{balance.formattedFree}</Caption>}
      />
      <List.Item
        title="Reserved"
        right={() => <Caption style={styles.centerAlign}>{balance.formattedReserved}</Caption>}
      />
      <List.Item
        title="Locked"
        right={() => <Caption style={styles.centerAlign}>{balance.formattedFeeFrozen}</Caption>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centerAlign: {
    textAlignVertical: 'center',
    lineHeight: 35,
  },
});
