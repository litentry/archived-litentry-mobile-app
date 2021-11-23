import React from 'react';
import {Caption, DataTable, Layout, Padder, Text, useTheme, View} from 'src/packages/base_components';
import {StyleSheet} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {Chart} from 'presentational/index';
import {BN, BN_ONE, BN_ZERO, formatNumber} from '@polkadot/util';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useAuctionInfo} from 'src/api/hooks/useAuctionInfo';
import LoadingView from 'presentational/LoadingView';
import type {u32} from '@polkadot/types';
import {useWinningData} from 'src/api/hooks/useWinningData';
import {useTotalIssuance} from 'src/api/hooks/useTotalIssuance';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {BlockTime} from 'layout/BlockTime';
import {ScrollView} from 'react-native-gesture-handler';
import {useRelayEndpoints} from 'src/api/hooks/useRelayEndpoints';
import {bnToBn} from '@polkadot/util';

export function ParachainsAuctionsScreen() {
  const {data, isLoading} = useAuctionInfo();
  const {data: winningData} = useWinningData(data);
  const {data: totalIssuance} = useTotalIssuance();
  const {data: endpoints} = useRelayEndpoints();
  const bestNumber = useBestNumber();
  const formatBalance = useFormatBalance();

  const lastWinners = winningData && winningData[0];
  const raised = lastWinners?.total ?? BN_ZERO;
  const total = totalIssuance ?? BN_ZERO;
  const raisedPercent = total.isZero() ? 0 : raised.muln(10000).div(total).toNumber() / 10000;

  function getEndingPeriodValues(): [BN, BN] {
    if (data?.endBlock && bestNumber) {
      if (bestNumber.lt(data.endBlock)) {
        return [data.endBlock, bestNumber];
      } else if (data.endingPeriod) {
        return [data.endingPeriod, bestNumber.sub(data.endBlock)];
      }
    }
    return [BN_ZERO, BN_ZERO];
  }
  const [endingAt, currentPosition] = getEndingPeriodValues();
  const remainingPercent = endingAt.isZero() ? 0 : currentPosition.muln(10000).div(endingAt).toNumber() / 10000;

  if (!data || isLoading) {
    return <LoadingView />;
  }

  const items: DataTableProps['items'] =
    winningData?.map((wd) => {
      return {
        blockNumber: String(formatNumber(wd.blockNumber)),
        projectID: String(formatNumber(wd.winners[0]?.paraId)),
        projectName: String(endpoints?.find((e) => e.paraId === bnToBn(wd.winners[0]?.paraId).toNumber())?.text),
        value: String(formatBalance(wd.total)),
      };
    }) ?? [];

  return (
    <Layout style={globalStyles.flex}>
      <ScrollView>
        <Header
          count={formatNumber(data.numAuctions) ?? 0}
          active={Boolean(data.leasePeriod)}
          firstLast={{
            first: formatNumber(data.leasePeriod),
            last: formatNumber(data.leasePeriod?.add((data.leasePeriodsPerSlot as u32) ?? BN_ONE).isub(BN_ONE)),
          }}
          stats={{raised: formatBalance(raised, {isShort: true}) ?? '', raisedPercent}}
          duration={{endingAt, remaining: endingAt.sub(currentPosition), remainingPercent}}
        />
        <DataTableComp items={items} />
      </ScrollView>
    </Layout>
  );
}

type HeaderProps = {
  count: string;
  active: boolean;
  firstLast: {first: string; last: string};
  stats: {raised: string; raisedPercent: number};
  duration: {endingAt: BN; remaining: BN; remainingPercent: number};
};

function Header(props: HeaderProps) {
  const {firstLast, stats, duration} = props;
  const {first, last} = firstLast;
  const {endingAt, remaining, remainingPercent} = duration;
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
                <BlockTime blockNumber={endingAt} />
                <BlockTime blockNumber={remaining} />
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

type DataTableProps = {
  items: {
    blockNumber: string;
    projectID: string;
    projectName: string;
    value: string;
  }[];
};
const DataTableComp = (props: DataTableProps) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);

  const {items} = props;
  const numberOfItemsPerPage = 8;

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
  const pageItems = props.items.slice(from, to);

  return (
    <DataTable style={[{backgroundColor: theme.colors.surface}, tableStyle.container]}>
      <DataTable.Header>
        <DataTable.Title>Bids</DataTable.Title>
        <DataTable.Title>Project</DataTable.Title>
        <DataTable.Title numeric>Value</DataTable.Title>
      </DataTable.Header>

      {pageItems.map((item) => (
        <DataTable.Row key={item.blockNumber}>
          <DataTable.Cell>
            <Caption>#{item.blockNumber}</Caption>
          </DataTable.Cell>
          <DataTable.Cell>
            {item.projectName + ' '}
            <Caption>{item.projectID}</Caption>
          </DataTable.Cell>
          <DataTable.Cell numeric>{item.value}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onPageChange={setPage}
        label={`${from + 1}-${to} of ${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPage={numberOfItemsPerPage}
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

const tableStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
