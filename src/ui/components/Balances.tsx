import React from 'react';
import {View} from 'react-native';
import {List, Caption} from '@ui/library';
import {Layout} from './Layout';
import globalStyles from '@ui/styles';
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
      <List.Item
        title="Total Balance"
        right={() => (
          <ItemRight>
            <Caption>{formatBalance(data.free.add(data.reserved))}</Caption>
          </ItemRight>
        )}
      />
      <List.Item
        title="Transferrable"
        right={() => (
          <ItemRight>
            <Caption>{formatBalance(data.free)}</Caption>
          </ItemRight>
        )}
      />
      <List.Item
        title="Reserved"
        right={() => (
          <ItemRight>
            <Caption>{formatBalance(data.reserved)}</Caption>
          </ItemRight>
        )}
      />
      <List.Item
        title="Locked"
        right={() => (
          <ItemRight>
            <Caption>{formatBalance(data.feeFrozen)}</Caption>
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
