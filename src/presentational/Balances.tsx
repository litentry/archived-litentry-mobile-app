import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import {monofontFamily} from 'src/styles';
import {formatBalance} from '@polkadot/util';
import {AccountInfo} from '@polkadot/types/interfaces';

type PropTypes = {balance?: AccountInfo};

function Balances(props: PropTypes) {
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
