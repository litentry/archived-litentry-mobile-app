import React from 'react';
import {DataTable, Headline, Layout, Text, useTheme, View} from 'src/packages/base_components';
import {StyleSheet} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {Chart, Padder} from 'presentational/index';
import {BN} from '@polkadot/util';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';

export function ParachainsAuctionsScreen() {
  const raised = new BN(1);
  const total = new BN(33);
  const formatBalance = useFormatBalance();
  const raisedPercent = total.isZero() ? 0 : raised.muln(10000).div(total).toNumber() / 10000;

  return (
    <Layout>
      <Header
        count={2}
        active={true}
        firstLast={{first: 1, last: 2}}
        duration={{length: '5 days', remaining: '2 days 1 h1', remainingPercent: 0.23}}
        stats={{raised: formatBalance(raised) ?? '', raisedPercent}}
      />
      <DataTableComp />
    </Layout>
  );
}

type HeaderProps = {
  count: number;
  active: boolean;
  firstLast: {first: number; last: number};
  stats: {raised: string; raisedPercent: number};
  duration: {length: string; remaining: string; remainingPercent: number};
};

function Header(props: HeaderProps) {
  const {firstLast, stats, duration} = props;
  const {first, last} = firstLast;
  const {length, remaining, remainingPercent} = duration;
  const {raised, raisedPercent} = stats;

  const theme = useTheme();

  return (
    <View>
      <View style={headerStyle.container}>
        <View style={globalStyles.alignCenter}>
          <Headline>Auction</Headline>
          <Text>{props.count}</Text>
        </View>
        <View style={globalStyles.alignCenter}>
          <Headline>Active</Headline>
          <Text style={props.active ? {color: theme.colors.success} : undefined}>{props.active ? 'yes' : 'no'}</Text>
        </View>
        <View style={globalStyles.alignCenter}>
          <Headline>First - Last</Headline>
          <Text>
            {first} - {last}
          </Text>
        </View>
      </View>
      <View style={headerStyle.container}>
        <View style={headerStyle.container}>
          <View style={globalStyles.alignCenter}>
            <Headline>Total</Headline>
            <View style={globalStyles.rowAlignCenter}>
              <Chart percent={raisedPercent} />
              <Padder scale={0.5} />
              <Text>{raised}</Text>
            </View>
          </View>
        </View>
        <View style={headerStyle.container}>
          <View style={globalStyles.alignCenter}>
            <Headline>Ending Period</Headline>
            <View style={globalStyles.rowAlignCenter}>
              <Chart percent={remainingPercent} />
              <Padder scale={0.5} />
              <View>
                <Text>{length}</Text>
                <Text>{remaining}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: standardPadding,
  },
});

const DataTableComp = () => {
  const theme = useTheme();
  return (
    <DataTable style={[{backgroundColor: theme.colors.surface}, tableStyle.container]}>
      <DataTable.Header>
        <DataTable.Title>Bids</DataTable.Title>
        <DataTable.Title>{''}</DataTable.Title>
        <DataTable.Title>Project</DataTable.Title>
        <DataTable.Title numeric>Value</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell>2,000</DataTable.Cell>
        <DataTable.Cell>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

const tableStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
