import React, {useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Divider, ListItem, Text} from '@ui-kitten/components';
import {formatNumber, BN_ONE, BN_HUNDRED, bnToBn, bnToHex} from '@polkadot/util';
import BN from 'bn.js';
import type {ParaId} from '@polkadot/types/interfaces';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useUpcomingParaIds} from 'src/api/hooks/useUpcomingParaIds';
import {useParachainIds} from 'src/api/hooks/useParachainIds';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {useParachainProposalIds} from 'src/api/hooks/useParachainProposalIds';
import {useParachainLeases} from 'src/api/hooks/useParachainLeases';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {BlockTime} from 'layout/BlockTime';
import LoadingView from 'presentational/LoadingView';
import {monofontFamily} from 'src/styles';
import {useNavigation} from '@react-navigation/core';
import {parachainDetailScreen} from 'src/navigation/routeKeys';

export function ParachainsOverviewScreen() {
  const {data: leasePeriod, isLoading: isLeasePeriodLoading} = useParachainsLeasePeriod();
  const {data: parathreadIds} = useUpcomingParaIds();
  const {data: parachains, isLoading: isLoadingParachains} = useParachainIds();
  const {data: proposalIds} = useParachainProposalIds();
  const {timeStringParts: periodRemainderTimeParts} = useBlockTime(leasePeriod?.remainder);
  const periodRemainder = periodRemainderTimeParts.filter(Boolean).slice(0, 2).join(' ');
  const {timeStringParts: totalPeriodTimeParts} = useBlockTime(leasePeriod?.length);
  const totalPeriod = totalPeriodTimeParts.filter(Boolean).slice(0, 2).join(' ');
  const progressPercent = leasePeriod?.progress
    .mul(BN_HUNDRED)
    .div(leasePeriod.length ?? BN_ONE)
    .toNumber();

  if (isLeasePeriodLoading || isLoadingParachains) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Overview
          parachains={parachains || []}
          parathreadsCount={parathreadIds?.length || 0}
          leasePeriod={leasePeriod}
          totalPeriod={totalPeriod}
          periodRemainder={periodRemainder}
          progressPercent={progressPercent || 0}
          proposalsCount={proposalIds?.length || 0}
        />
      </View>
    </SafeView>
  );
}

type OverviewProps = {
  parachains: ParaId[];
  parathreadsCount: number;
  proposalsCount: number;
  leasePeriod: LeasePeriod | undefined;
  totalPeriod: string;
  periodRemainder: string;
  progressPercent: number;
};

const Overview = React.memo(function Overview({
  parachains,
  leasePeriod,
  progressPercent,
  parathreadsCount,
  totalPeriod,
  periodRemainder,
  proposalsCount,
}: OverviewProps) {
  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <>
            <Card disabled>
              <View style={styles.itemRow}>
                <StatInfoBlock title="Parachains">{formatNumber(parachains?.length)}</StatInfoBlock>
                <StatInfoBlock title="Parathreads">{formatNumber(parathreadsCount)}</StatInfoBlock>
              </View>
              {proposalsCount ? (
                <View style={styles.itemRow}>
                  <StatInfoBlock title="Proposals">{formatNumber(proposalsCount)}</StatInfoBlock>
                </View>
              ) : null}
              <Divider />
              <Padder scale={1} />
              {leasePeriod ? (
                <View style={styles.itemRow}>
                  <View style={styles.leasePeriodContainer}>
                    <ProgressChartWidget
                      title={`Lease Period`}
                      detail={`\n${progressPercent}%`}
                      data={[leasePeriod.progress.toNumber() / leasePeriod.length.toNumber()]}
                    />
                    <View>
                      <StatInfoBlock title="Current lease">{formatNumber(leasePeriod?.currentPeriod)}</StatInfoBlock>
                      <StatInfoBlock title="Total">{totalPeriod}</StatInfoBlock>
                      <StatInfoBlock title="Remainder">{periodRemainder}</StatInfoBlock>
                    </View>
                  </View>
                </View>
              ) : null}
            </Card>
            <Padder scale={1} />
            <View style={styles.parachainsHeaderContainer}>
              <Text category="s1">Parachains</Text>
              <Text category="s1">Leases</Text>
            </View>
            <Padder scale={1} />
          </>
        );
      }}
      data={parachains}
      keyExtractor={(item) => item.toString()}
      renderItem={({item}) => <Parachain id={item} leasePeriod={leasePeriod} />}
    />
  );
});

function Parachain({id, leasePeriod}: {id: ParaId; leasePeriod?: LeasePeriod}) {
  const {navigate} = useNavigation();
  const {data: leases} = useParachainLeases(id);
  const endpoints = useParaEndpoints(id);
  const endpoint = endpoints ? endpoints[endpoints.length - 1] : null;

  const period = useMemo(
    () =>
      leasePeriod?.currentPeriod &&
      leases &&
      leases
        .reduce((all: [BN, BN][], _period): [BN, BN][] => {
          const bnp = leasePeriod.currentPeriod.addn(_period);

          if (!all.length || all[all.length - 1]?.[1].add(BN_ONE).lt(bnp)) {
            all.push([bnp, bnp]);
          } else {
            const bn = all[all.length - 1];
            bn ? (bn[1] = bnp) : null;
          }

          return all;
        }, [])
        .map(([a, b]) => (a.eq(b) ? formatNumber(a) : `${formatNumber(a)} - ${formatNumber(b)}`))
        .join(', '),
    [leasePeriod?.currentPeriod, leases],
  );

  const lastLease = leases ? leases[leases.length - 1] : null;
  const leaseValue = lastLease ? lastLease + 1 : null;
  const blocks = useMemo(
    () =>
      leasePeriod && leaseValue && bnToBn(leaseValue).sub(BN_ONE).imul(leasePeriod.length).iadd(leasePeriod.remainder),
    [leasePeriod, leaseValue],
  );

  if (!endpoint) {
    return null;
  }
  const {text: parachainName} = endpoint;

  return (
    <>
      <ListItem
        onPress={() => {
          navigate(parachainDetailScreen, {
            id: id.toString(),
            name: parachainName,
            period,
            blocks: bnToHex(blocks),
          });
        }}
        title={() => {
          return (
            <Text style={styles.parachainName} category="s1">
              {String(parachainName)}
            </Text>
          );
        }}
        accessoryLeft={() => {
          return (
            <Text style={styles.text} category="c1">
              {formatNumber(id.toNumber())}
            </Text>
          );
        }}
        accessoryRight={() => {
          return (
            <View>
              <Text style={styles.text}>{period}</Text>
              {blocks ? <BlockTime blockNumber={blocks} /> : null}
            </View>
          );
        }}
      />
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  boxRow: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
  leasePeriodContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: monofontFamily,
  },
  parachainName: {
    paddingLeft: 20,
  },
  parachainsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
