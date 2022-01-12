import React, {useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Divider, Card, List, Caption, Text, Subheading} from '@ui/library';
import {formatNumber, BN_ONE, BN_HUNDRED, bnToBn, bnToHex} from '@polkadot/util';
import type {ParaId} from '@polkadot/types/interfaces';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useUpcomingParaIds} from 'src/api/hooks/useUpcomingParaIds';
import {useParachainIds} from 'src/api/hooks/useParachainIds';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {useParachainProposalIds} from 'src/api/hooks/useParachainProposalIds';
import {useParachainLeases} from 'src/api/hooks/useParachainLeases';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {BlockTime} from '@ui/components/BlockTime';
import LoadingView from '@ui/components/LoadingView';
import {useNavigation} from '@react-navigation/core';
import {parachainDetailScreen} from '@ui/navigation/routeKeys';
import {getLeasePeriodString} from 'src/api/utils/parachainLeases';

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
      <Overview
        parachains={parachains || []}
        parathreadsCount={parathreadIds?.length || 0}
        leasePeriod={leasePeriod}
        totalPeriod={totalPeriod}
        periodRemainder={periodRemainder}
        progressPercent={progressPercent || 0}
        proposalsCount={proposalIds?.length || 0}
      />
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
      contentContainerStyle={globalStyles.paddedContainer}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <>
            <Card>
              <Card.Content>
                <View style={[styles.itemRow, styles.cardTop]}>
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
              </Card.Content>
            </Card>
            <Padder scale={1} />
            <View style={styles.parachainsHeaderContainer}>
              <Subheading>Parachains</Subheading>
              <Subheading>Leases</Subheading>
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
    () => leasePeriod?.currentPeriod && leases && getLeasePeriodString(leasePeriod.currentPeriod, leases),
    [leasePeriod, leases],
  );

  const lastLease = leases ? leases[leases.length - 1] : null;
  const leaseValue = lastLease ? lastLease + 1 : null;
  const blocks = useMemo(
    () =>
      leasePeriod && leaseValue && bnToBn(leaseValue).sub(BN_ONE).imul(leasePeriod.length).iadd(leasePeriod.remainder),
    [leasePeriod, leaseValue],
  );

  const parachainName = endpoint?.text?.toString() ?? `#${id.toString()}`;

  return (
    <>
      <List.Item
        onPress={() => {
          navigate(parachainDetailScreen, {
            id: id.toString(),
            name: parachainName,
            period,
            blocks: bnToHex(blocks),
          });
        }}
        title={parachainName}
        left={() => (
          <View style={globalStyles.justifyCenter}>
            <Caption>{formatNumber(id.toNumber())}</Caption>
          </View>
        )}
        right={() => {
          return (
            <View style={styles.rightItem}>
              <Text>{period}</Text>
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
  cardTop: {marginHorizontal: standardPadding * 2},
  leasePeriodContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parachainsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rightItem: {marginRight: standardPadding},
});
