import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Text} from '@ui/library';
import {AccountBalance as AccountBalanceType} from 'src/api/hooks/useAccount';

type Props = {
  balance: AccountBalanceType;
};

const ItemRight = (text: string) => () =>
  (
    <Text variant="bodySmall" style={styles.centerAlign}>
      {text}
    </Text>
  );

export function AccountBalance({balance}: Props) {
  return (
    <>
      <List.Item title="Total Balance" right={ItemRight(balance.formattedTotal)} />
      <List.Item title="Transferrable" right={ItemRight(balance.formattedFree)} />
      <List.Item title="Reserved" right={ItemRight(balance.formattedReserved)} />
      <List.Item title="Locked" right={ItemRight(balance.formattedFeeFrozen)} />
    </>
  );
}

const styles = StyleSheet.create({
  centerAlign: {
    textAlignVertical: 'center',
    lineHeight: 35,
  },
});
