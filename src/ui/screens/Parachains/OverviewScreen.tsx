import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Divider, Card, List, Caption, Text, Subheading} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import LoadingView from '@ui/components/LoadingView';
import {useNavigation} from '@react-navigation/core';
import {parachainDetailScreen} from '@ui/navigation/routeKeys';
import {EmptyView} from '@ui/components/EmptyView';
import {Parachain, useParachainsOverview} from 'src/api/hooks/useParachainsOverview';

export function ParachainsOverviewScreen() {
  const {parachainsInfo, parachains, loading} = useParachainsOverview();
  if (loading && !parachainsInfo) {
    return <LoadingView />;
  }

  if (!parachainsInfo || !parachains) {
    return <EmptyView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <Overview
        parachainsCount={parachainsInfo?.parachainsCount || 0}
        parathreadsCount={parachainsInfo?.parathreadsCount || 0}
        proposalsCount={parachainsInfo?.proposalsCount || 0}
        parachains={parachains}
        currentLeasePeriod={Number(parachainsInfo?.leasePeriod.currentLease) || 0}
        totalPeriod={parachainsInfo?.leasePeriod.totalPeriod}
        periodRemainder={parachainsInfo?.leasePeriod.remainder}
        progressPercent={parachainsInfo?.leasePeriod.progressPercent || 0}
      />
    </SafeView>
  );
}

type OverviewProps = {
  parachainsCount: number;
  parathreadsCount: number;
  parachains: Parachain[];
  currentLeasePeriod?: number;
  proposalsCount: number;
  totalPeriod: string;
  periodRemainder: string;
  progressPercent: number;
};

const Overview = React.memo(function Overview({
  parachainsCount,
  currentLeasePeriod,
  progressPercent,
  parathreadsCount,
  parachains,
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
                  <StatInfoBlock title="Parachains">{String(parachainsCount)}</StatInfoBlock>
                  <StatInfoBlock title="Parathreads">{String(parathreadsCount)}</StatInfoBlock>
                </View>
                {proposalsCount ? (
                  <View style={styles.itemRow}>
                    <StatInfoBlock title="Proposals">{String(proposalsCount)}</StatInfoBlock>
                  </View>
                ) : null}
                <Divider />
                <Padder scale={1} />
                <View style={styles.itemRow}>
                  <View style={styles.leasePeriodContainer}>
                    <ProgressChartWidget
                      title={`Lease Period`}
                      detail={`\n${progressPercent}%`}
                      data={[progressPercent]}
                    />
                    <View>
                      <StatInfoBlock title="Current lease">{String(currentLeasePeriod)}</StatInfoBlock>
                      <StatInfoBlock title="Total">{totalPeriod}</StatInfoBlock>
                      <StatInfoBlock title="Remainder">{periodRemainder}</StatInfoBlock>
                    </View>
                  </View>
                </View>
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
      keyExtractor={(item) => item.id}
      renderItem={(item) => <ParachainItem item={item.item} key={item.item.id} />}
    />
  );
});

function ParachainItem({item}: {item: Parachain}) {
  const {navigate} = useNavigation();
  const {lease} = item;
  const [days, hours] = lease?.blockTime || [];

  return (
    <>
      <List.Item
        title={item.name}
        key={item.id}
        onPress={() => {
          navigate(parachainDetailScreen, {
            parachainId: item.id,
          });
        }}
        left={() => (
          <View style={globalStyles.justifyCenter}>
            <Caption>{item.id}</Caption>
          </View>
        )}
        right={() => {
          return (
            <View style={styles.rightItem}>
              <Text>{lease?.period}</Text>
              <Text style={globalStyles.rowContainer}>{days || hours ? `${days || ''} ${hours || ''}` : null}</Text>
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
    right: standardPadding,
  },
  rightItem: {
    marginRight: standardPadding,
  },
});
