import React from 'react';
import {Caption, DataTable, Layout, Text, useTheme, View} from 'src/packages/base_components';
import {StyleSheet} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {Chart, Padder} from 'presentational/index';
import {BN_ONE, BN_ZERO, formatNumber} from '@polkadot/util';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useAuctionInfo} from 'src/api/hooks/useAuctionInfo';
import LoadingView from 'presentational/LoadingView';
import type {u32} from '@polkadot/types';
import {useWinningData} from 'src/api/hooks/useWinningData';
import {useTotalIssuance} from 'src/api/hooks/useTotalIssuance';

export function ParachainsAuctionsScreen() {
  const {data, isLoading} = useAuctionInfo();
  const {data: winningData} = useWinningData(data);
  const {data: totalIssuance} = useTotalIssuance();
  const formatBalance = useFormatBalance();

  const lastWinners = winningData && winningData[0];
  const raised = lastWinners?.total ?? BN_ZERO;
  const total = totalIssuance ?? BN_ZERO;
  const raisedPercent = total.isZero() ? 0 : raised.muln(10000).div(total).toNumber() / 10000;

  if (!data || isLoading) {
    return <LoadingView />;
  }

  return (
    <Layout>
      <Header
        count={formatNumber(data.numAuctions) ?? 0}
        active={Boolean(data.leasePeriod)}
        firstLast={{
          first: formatNumber(data.leasePeriod),
          last: formatNumber(data.leasePeriod?.add((data.leasePeriodsPerSlot as u32) ?? BN_ONE).isub(BN_ONE)),
        }}
        stats={{raised: formatBalance(raised, {isShort: true}) ?? '', raisedPercent}}
        duration={{length: '5 days', remaining: '2 days 1 h1', remainingPercent: 0.23}}
      />
      <DataTableComp />
    </Layout>
  );
}

type HeaderProps = {
  count: string;
  active: boolean;
  firstLast: {first: string; last: string};
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
          <Caption>Auction</Caption>
          <Text>{props.count}</Text>
        </View>
        <View style={globalStyles.alignCenter}>
          <Caption>Active</Caption>
          <Text style={props.active ? {color: theme.colors.success} : undefined}>{props.active ? 'yes' : 'no'}</Text>
        </View>
        <View style={globalStyles.alignCenter}>
          <Caption>First - Last</Caption>
          <Text>
            {first} - {last}
          </Text>
        </View>
      </View>
      <View style={headerStyle.container}>
        <View style={headerStyle.container}>
          <View style={globalStyles.alignCenter}>
            <Caption>Total</Caption>
            <View style={globalStyles.rowAlignCenter}>
              <Chart percent={raisedPercent} />
              <Padder scale={0.5} />
              <Text>{raised}</Text>
            </View>
          </View>
        </View>
        <View style={headerStyle.container}>
          <View style={globalStyles.alignCenter}>
            <Caption>Ending Period</Caption>
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
