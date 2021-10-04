import {LinkOption} from '@polkadot/apps-config/endpoints/types';
import type {ParaId} from '@polkadot/types/interfaces';
import {BN, BN_ZERO} from '@polkadot/util';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {Card, Text, useTheme} from '@ui-kitten/components';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {Campaign, useFunds} from 'src/api/hooks/useFunds';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {crowdloanDetailScreen} from 'src/navigation/routeKeys';
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

  if (!data.funds?.length) {
    return <EmptyView />;
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
                <View style={globalStyles.flex}>
                  <View style={styles.headerTileContainer}>
                    <Chart percent={activeProgress} />
                    <Padder scale={0.5} />
                    <View style={globalStyles.alignCenter}>
                      <Text category="c2" appearance="hint">
                        Active Raised / Cap
                      </Text>
                      <Padder scale={0.1} />
                      <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(activeRaised, {
                        isShort: true,
                      })} / ${formatBalance(activeCap)}`}</Text>
                    </View>
                  </View>
                  <View style={styles.headerTileContainer}>
                    <Chart percent={totalProgress} />
                    <Padder scale={0.5} />
                    <View style={globalStyles.alignCenter}>
                      <Text category="c2" appearance="hint">
                        Total Raised / Cap
                      </Text>
                      <Padder scale={0.1} />
                      <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(
                        data.totalRaised,
                      )} / ${formatBalance(data.totalCap)}`}</Text>
                    </View>
                  </View>
                </View>
                <View style={globalStyles.centeredContainer}>
                  <Text category="h6" appearance="hint">
                    Funds
                  </Text>
                  <Text category="h5">{data.funds?.length}</Text>
                </View>
              </View>
            </View>
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        sections={[
          {key: 'Ongoing', data: active},
          {key: 'Completed', data: ended},
        ]}
        SectionSeparatorComponent={() => <Padder scale={1} />}
        renderSectionHeader={({section}) => <Text category="h5">{section.key}</Text>}
        renderItem={({item}) => {
          return <Fund item={item} />;
        }}
        keyExtractor={(item) => item.key}
        stickySectionHeadersEnabled={false}
      />
    </SafeView>
  );
}

function Chart({percent}: {percent: number}) {
  const theme = useTheme();
  return (
    <View>
      <ProgressChart
        data={[percent]}
        width={50}
        height={50}
        strokeWidth={5}
        radius={21}
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
      <View style={styles.chartOverlay}>
        <Text category="label">{percent * 100}%</Text>
      </View>
    </View>
  );
}

function Fund({item}: {item: Campaign}) {
  const formatBalance = useFormatBalance();
  const {cap, raised} = item.info;
  const endpoints = useParaEndpoints(item.paraId);
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>();

  if (!endpoints?.length) {
    return null;
  }

  const {text} = endpoints[endpoints.length - 1] as LinkOption;

  return (
    <Card
      style={styles.fund}
      onPress={() => {
        navigation.navigate(crowdloanDetailScreen, {title: String(text), paraId: item.paraId});
      }}>
      <View style={[globalStyles.rowAlignCenter]}>
        <View style={styles.shrink}>
          <Text category="h6" numberOfLines={1} adjustsFontSizeToFit style={styles.shrink}>
            {String(text)}
          </Text>
          <Padder scale={0.5} />
          <Text numberOfLines={1} adjustsFontSizeToFit category="c1">{`${formatBalance(raised, {
            isShort: true,
          })} / ${formatBalance(cap, {isShort: true})}`}</Text>
        </View>
        <View style={styles.spacer} />
        <Chart percent={raised.muln(100).div(cap).toNumber() / 100} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: standardPadding * 3,
  },
  headerTileContainer: {
    padding: standardPadding * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: standardPadding * 2,
  },
  sectionHeader: {
    padding: standardPadding * 2,
  },
  shrink: {flexShrink: 1},
  fund: {marginBottom: standardPadding},
  spacer: {flex: 1, minWidth: standardPadding * 3},
  alignEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  chartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
