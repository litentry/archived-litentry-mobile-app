import React from 'react';
import {View} from 'react-native';
import type {u32} from '@polkadot/types';
import {BN, bnToBn, BN_ONE, BN_ZERO, formatNumber} from '@polkadot/util';
import {BlockTime} from '@ui/components/BlockTime';
import {Chart} from '@ui/components/Chart';
import LoadingView from '@ui/components/LoadingView';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuctionInfo} from 'src/api/hooks/useAuctionInfo';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useRelayEndpoints} from 'src/api/hooks/useRelayEndpoints';
import {useTotalIssuance} from 'src/api/hooks/useTotalIssuance';
import {useWinningData} from 'src/api/hooks/useWinningData';
import {ActivityIndicator, Caption, DataTable, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';

export function ParachainsAuctionsScreen() {
  const {data, isLoading: auctionInfoIsLoading, isError: auctionIsError} = useAuctionInfo();
  const {data: winningData, isLoading: winningDataIsLoading, isError: winningDataIsError} = useWinningData(data);
  const {data: totalIssuance, isLoading: issuanceIsLoading, isError: issuanceIsError} = useTotalIssuance();
  const {data: endpoints, isLoading: endpointsIsLoading, isError: endpointsIsError} = useRelayEndpoints();
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

  if (auctionIsError || winningDataIsError || issuanceIsError || endpointsIsError) {
    return <ErrorView />;
  }

  if (!data || auctionInfoIsLoading) {
    return <LoadingView />;
  }

  const tableIsLoading = auctionInfoIsLoading || winningDataIsLoading || issuanceIsLoading || endpointsIsLoading;
  const items: DataTableProps['items'] =
    winningData?.map((wd) => {
      return {
        blockNumber: String(formatNumber(wd.blockNumber)),
        projectID: String(formatNumber(wd.winners[0]?.paraId)),
        projectName: String(endpoints?.find((e) => e.paraId === bnToBn(wd.winners[0]?.paraId).toNumber())?.text),
        value: String(formatBalance(wd.total)),
      };
    }) ?? [];

  const isActive = Boolean(data.leasePeriod);

  return (
    <Layout style={globalStyles.flex}>
      <ScrollView>
        <Header
          count={formatNumber(data.numAuctions) ?? 0}
          active={isActive}
          firstLast={{
            first: formatNumber(data.leasePeriod),
            last: formatNumber(data.leasePeriod?.add((data.leasePeriodsPerSlot as u32) ?? BN_ONE).isub(BN_ONE)),
          }}
          stats={{raised: formatBalance(raised, {isShort: true}) ?? '', raisedPercent}}
          duration={{endingAt, remaining: endingAt.sub(currentPosition), remainingPercent}}
        />
        {isActive ? (
          <DataTableComp items={items} loading={tableIsLoading} />
        ) : (
          <View style={globalStyles.centeredContainer}>
            <Caption>The auction is not active.</Caption>
          </View>
        )}
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
  loading: boolean;
};
const DataTableComp = (props: DataTableProps) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);

  const {items, loading} = props;
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

      {loading ? (
        <View style={globalStyles.paddedContainer}>
          <ActivityIndicator animating />
        </View>
      ) : (
        pageItems.map((item) => (
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
        ))
      )}

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

function ErrorView() {
  return (
    <View style={[globalStyles.paddedContainer, globalStyles.centeredContainer]}>
      <Text>Something went wrong! please try again later.</Text>
    </View>
  );
}
