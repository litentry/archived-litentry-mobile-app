import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import {standardPadding} from '@ui/styles';
import {useBountiesSummary} from 'src/api/hooks/useBountiesSummary';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {Padder} from '@ui/components/Padder';
import {ProgressChartWidget} from '@ui/components/ProgressChartWidget';
import {useTheme} from '@ui/library';
import {DashboardTeaserSkeleton} from '@ui/components/DashboardTeaserSkeleton';
import {EmptyStateTeaser} from './EmptyStateTeaser';

type Props = {
  onPress: () => void;
};

export function BountySummaryTeaser(props: Props) {
  const {colors, roundness} = useTheme();
  const {data, loading} = useBountiesSummary();

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Bounties">
      {loading && !data ? (
        <DashboardTeaserSkeleton />
      ) : data ? (
        <View style={styles.boxRow}>
          <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
            <View style={styles.itemRow}>
              {data?.activeBounties && <StatInfoBlock title="Active">{data.activeBounties}</StatInfoBlock>}
              {data?.pastBounties && <StatInfoBlock title="Past">{data.pastBounties}</StatInfoBlock>}
            </View>
            <View style={styles.itemRow}>
              {data?.formattedTotalValue && (
                <StatInfoBlock title="Active total">{data.formattedTotalValue}</StatInfoBlock>
              )}
            </View>
          </View>
          <Padder scale={0.2} />
          <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
            {data.timeLeft && (
              <ProgressChartWidget
                title={`Funding period (${data.timeLeft[0]})`}
                detail={`${data.progressPercent ?? 0}%\n${data.timeLeft.slice(0, 2).join('\n')}`}
                progress={data.progressPercent / 100}
              />
            )}
          </View>
        </View>
      ) : (
        <EmptyStateTeaser subheading="No Bounties" caption="Check back soon" />
      )}
    </SectionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  boxRow: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    padding: standardPadding * 2,
    borderWidth: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
