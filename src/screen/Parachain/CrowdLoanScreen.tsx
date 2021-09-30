import {LinkOption} from '@polkadot/apps-config/endpoints/types';
import type {ParaId} from '@polkadot/types/interfaces';
import {formatNumber, BN_ZERO, BN} from '@polkadot/util';
import {Card, Text, useTheme} from '@ui-kitten/components';
import {BlockTime} from 'layout/BlockTime';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useMemo} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useContributions} from 'src/api/hooks/useContributions';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import useFunds, {Campaign} from 'src/api/hooks/useFunds';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import globalStyles, {standardPadding} from 'src/styles';

export function CrowdLoanScreen() {
  const formatBalance = useFormatBalance();
  const {data, isError} = useFunds();
  const {data: leasePeriod} = useParachainsLeasePeriod();

  if (isError) {
    return <Text>Something bad happend!</Text>;
  }

  if (!data) {
    return <LoadingView />;
  }

  const [active, ended] = extractLists(data.funds, leasePeriod);

  const [activeRaised, activeCap] = active.reduce(
    ([par, pac], current) => {
      return [
        par.iadd(current.info.raised.gte(BN_ZERO) ? current.info.raised : BN_ZERO),
        pac.iadd(current.info.cap.gte(BN_ZERO) ? current.info.cap : BN_ZERO),
      ];
    },
    [new BN(0), new BN(0)],
  );

  let activeProgress = 0,
    totalProgress = 0;
  try {
    activeProgress = activeRaised.muln(100).div(activeCap).toNumber() / 100;
    totalProgress = data.totalRaised.muln(100).div(data.totalCap).toNumber() / 100;
  } catch {
    console.error('Error calculating progress');
  }

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={styles.headerRow}>
                <View style={styles.headerTileContainer}>
                  <Text category="h6" appearance="hint">
                    funds
                  </Text>
                  <Text category="h5">{data.funds?.length}</Text>
                </View>
              </View>
              <View style={styles.headerRow}>
                <View style={styles.headerTileContainer}>
                  <Chart percent={activeProgress} />
                  <Text category="h6" appearance="hint">
                    active raised / cap
                  </Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(activeRaised, {
                    isShort: true,
                  })} / ${formatBalance(activeCap)}`}</Text>
                </View>
                <View style={styles.headerTileContainer}>
                  <Chart percent={totalProgress} />
                  <Text category="h6" appearance="hint">
                    total raised / cap
                  </Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(data.totalRaised)} / ${formatBalance(
                    data.totalCap,
                  )}`}</Text>
                </View>
              </View>
            </View>
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        sections={[
          {key: 'ongoing', data: active},
          {key: 'completed', data: ended},
        ]}
        SectionSeparatorComponent={() => <Padder scale={1} />}
        renderSectionHeader={({section}) => <Text category="h4">{section.key}</Text>}
        renderItem={({item}) => {
          return <Fund item={item} isOngoing={active.includes(item)} />;
        }}
        keyExtractor={(item) => item.key}
        stickySectionHeadersEnabled={false}
      />
    </SafeView>
  );
}

function Chart({percent}: {percent: number}) {
  const theme = useTheme();
  console.log(percent);
  return (
    <ProgressChart
      data={[percent]}
      width={50}
      height={50}
      strokeWidth={5}
      radius={15}
      chartConfig={{
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientFrom: theme['background-basic-color-1'],
        backgroundGradientTo: theme['background-basic-color-1'],
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(27, 197, 117, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
      }}
      hideLegend
    />
  );
}

function Fund({item, isOngoing}: {item: Campaign; isOngoing: boolean}) {
  const formatBalance = useFormatBalance();
  const bestNumber = useBestNumber();
  const {end, firstPeriod, lastPeriod, cap, raised} = item.info;
  const blocksLeft = useMemo(() => (bestNumber && end.gt(bestNumber) ? end.sub(bestNumber) : null), [bestNumber, end]);
  const endpoints = useParaEndpoints(item.paraId);
  const {data: contributions} = useContributions(item.paraId);

  if (!endpoints?.length) {
    return null;
  }

  const {text} = endpoints[endpoints.length - 1] as LinkOption;

  return (
    <Card style={styles.fund} disabled>
      <View style={globalStyles.rowContainer}>
        <Text category="h5" numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
          {String(text)}
        </Text>
        <View style={styles.spacer} />
        <Text category="h6">{formatNumber(item.paraId)}</Text>
      </View>
      <Padder scale={0.5} />
      <View style={globalStyles.rowContainer}>
        <View>
          {blocksLeft ? <BlockTime blockNumber={blocksLeft} /> : null}
          <Text>
            {item.isWinner
              ? 'Winner'
              : blocksLeft
              ? item.isCapped
                ? 'Capped'
                : isOngoing
                ? 'Active'
                : 'Past'
              : 'Ended'}
          </Text>
          <Text>
            {'leases: '}
            {firstPeriod.eq(lastPeriod)
              ? formatNumber(firstPeriod)
              : `${formatNumber(firstPeriod)} - ${formatNumber(lastPeriod)}`}
          </Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.alignEnd}>
          <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(raised, {isShort: true})} / ${formatBalance(
            cap,
            {
              isShort: true,
            },
          )}`}</Text>
          <Text>count: {formatNumber(contributions?.contributorsHex.length)}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
  },
  headerTileContainer: {
    padding: standardPadding * 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: standardPadding * 2,
  },
  sectionHeader: {
    padding: standardPadding * 2,
  },
  title: {flexShrink: 1},
  fund: {marginBottom: standardPadding},
  spacer: {flex: 1, minWidth: standardPadding * 3},
  alignEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexShrink: 1,
  },
});

function extractLists(value: Campaign[] | null, leasePeriod?: LeasePeriod): [Campaign[], Campaign[], ParaId[] | null] {
  const currentPeriod = leasePeriod?.currentPeriod;
  let active: Campaign[] = [];
  let ended: Campaign[] = [];
  let allIds: ParaId[] | null = null;

  if (value && currentPeriod) {
    active = value.filter(
      ({firstSlot, isCapped, isEnded, isWinner}) => !(isCapped || isEnded || isWinner) && currentPeriod.lte(firstSlot),
    );
    ended = value.filter(
      ({firstSlot, isCapped, isEnded, isWinner}) => isCapped || isEnded || isWinner || currentPeriod.gt(firstSlot),
    );
    allIds = value.map(({paraId}) => paraId);
  }

  return [active, ended, allIds];
}
