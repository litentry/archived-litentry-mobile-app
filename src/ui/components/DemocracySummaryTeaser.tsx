import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {useDemocracySummary} from 'src/api/hooks/useDemocracySummary';
import {Padder} from '@ui/components/Padder';
import {ProgressChartWidget} from '@ui/components/ProgressChartWidget';
import {standardPadding} from '@ui/styles';
import {useTheme} from '@ui/library';
import {DashboardTeaserSkeleton} from '@ui/components/DashboardTeaserSkeleton';
import {EmptyStateTeaser} from './EmptyStateTeaser';

type Props = {
  onPress: () => void;
};

export function DemocracySummaryTeaser(props: Props) {
  const {colors, roundness} = useTheme();
  const {data, loading} = useDemocracySummary();
  const firstTwoNoneEmptyTimeParts = data?.launchPeriod?.timeLeftParts.filter(Boolean).slice(0, 2);
  const timeLeftString = firstTwoNoneEmptyTimeParts?.join('\n') ?? '';

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Democracy">
      {loading && !data ? (
        <DashboardTeaserSkeleton />
      ) : data ? (
        <View style={styles.boxRow}>
          <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Proposals">{String(data.activeProposals)}</StatInfoBlock>
              <StatInfoBlock title="Total">{String(data.proposals)}</StatInfoBlock>
            </View>
            <Padder />
            <View style={styles.itemRow}>
              <StatInfoBlock title="Referenda">{String(data.activeReferendums)}</StatInfoBlock>
              <StatInfoBlock title="Total">{String(data.referendums)}</StatInfoBlock>
            </View>
          </View>
          <Padder scale={0.2} />
          <View style={[styles.card, {borderColor: colors.surfaceVariant, borderRadius: roundness}]}>
            {data.launchPeriod && (
              <ProgressChartWidget
                title={`Launch period`}
                detail={`${data.launchPeriod.progressPercent}%\n${timeLeftString}`}
                progress={data.launchPeriod.progressPercent / 100}
              />
            )}
          </View>
        </View>
      ) : (
        <EmptyStateTeaser subheading="No Democracy Proposals" caption="Check back soon" />
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
    borderWidth: 1,
    padding: standardPadding * 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
