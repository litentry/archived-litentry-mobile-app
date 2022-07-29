import {Padder} from '@ui/components/Padder';
import {useTheme} from '@ui/library';
import {ProgressChartWidget} from '@ui/components/ProgressChartWidget';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTreasurySummary} from 'src/api/hooks/useTreasurySummary';
import globalStyles, {standardPadding} from '@ui/styles';
import {DashboardTeaserSkeleton} from '@ui/components/DashboardTeaserSkeleton';
import {EmptyStateTeaser} from './EmptyStateTeaser';

type PropTypes = {
  onPress: () => void;
};

export function TreasurySummaryTeaser(props: PropTypes) {
  const {colors, roundness} = useTheme();
  const {data: treasurySummary, loading} = useTreasurySummary();

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Treasury">
      {loading && !treasurySummary ? (
        <DashboardTeaserSkeleton />
      ) : treasurySummary ? (
        <View>
          <View style={styles.container}>
            <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <StatInfoBlock title="Proposals">{String(treasurySummary.activeProposals)}</StatInfoBlock>
                <StatInfoBlock title="Totals">{String(treasurySummary.totalProposals)}</StatInfoBlock>
              </View>
              <Padder scale={1} />
              <StatInfoBlock title="Approved">{String(treasurySummary.approvedProposals)}</StatInfoBlock>
            </View>
            <Padder scale={0.2} />
            <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
              <ProgressChartWidget
                title={`Spend period (${treasurySummary.spendPeriod.period})`}
                detail={`${treasurySummary.spendPeriod.percentage}%\n${treasurySummary.spendPeriod.termLeftParts[0]}${
                  treasurySummary.spendPeriod.termLeftParts[1]
                    ? `\n${treasurySummary.spendPeriod.termLeftParts[1]}`
                    : ''
                }`}
                progress={treasurySummary.spendPeriod.percentage / 100}
              />
            </View>
          </View>
          <Padder scale={0.2} />
          <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Available">{treasurySummary.treasuryBalance.freeBalance}</StatInfoBlock>
              <StatInfoBlock title="Next Burn">{treasurySummary.nextBurn}</StatInfoBlock>
            </View>
          </View>
        </View>
      ) : (
        <EmptyStateTeaser subheading="No Treasury Proposals" caption="Check back soon" />
      )}
    </SectionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: standardPadding * 2,
    borderWidth: 1,
  },
});
