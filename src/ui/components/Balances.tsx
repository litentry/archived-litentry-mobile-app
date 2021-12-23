import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import {monofontFamily} from '@ui/styles';
import type {FrameSystemAccountInfo} from '@polkadot/types/lookup';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';

type PropTypes = {balance?: FrameSystemAccountInfo};

function Balances(props: PropTypes) {
  const formatBalance = useFormatBalance();
  const {balance} = props;

  if (!balance) {
    return null;
  }
  const {data} = balance;

  return (
    <Layout>
      <ListItem
        title="Total Balance"
        accessoryRight={() => <Text style={styles.balance}>{formatBalance(data.free.add(data.reserved))}</Text>}
      />
      <ListItem
        title="Transferrable"
        accessoryRight={() => <Text style={styles.balance}>{formatBalance(data.free)}</Text>}
      />
      <ListItem
        title="Reserved"
        accessoryRight={() => <Text style={styles.balance}>{formatBalance(data.reserved)}</Text>}
      />
      <ListItem
        title="Locked"
        accessoryRight={() => <Text style={styles.balance}>{formatBalance(data.feeFrozen)}</Text>}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  balance: {
    fontFamily: monofontFamily,
  },
});

export default Balances;
