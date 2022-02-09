import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {useDemocracySummary} from 'src/api/hooks/useDemocracySummary';
import {Padder} from '@ui/components/Padder';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import {standardPadding} from '@ui/styles';
import {LoadingBox} from '@ui/components/LoadingBox';
import {Card} from '@ui/library';

type Props = {
  onPress: () => void;
};

export function DemocracySummaryTeaser(props: Props) {
  const {data, loading} = useDemocracySummary();
  const firstTwoNoneEmptyTimeParts = data?.launchPeriodInfo?.timeLeftParts.filter(Boolean).slice(0, 2);
  const timeLeftString = firstTwoNoneEmptyTimeParts?.join('\n') ?? '';

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Democracy">
      {loading ? (
        <LoadingBox />
      ) : (
        <View style={styles.boxRow}>
          <Card mode="outlined" style={styles.card}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Proposals">{String(data?.activeProposals ?? 0)}</StatInfoBlock>
              <StatInfoBlock title="Total">{String(data?.proposals ?? 0)}</StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Referenda">{String(data?.activeReferendums ?? 0)}</StatInfoBlock>
              <StatInfoBlock title="Total">{String(data?.referendums ?? 0)}</StatInfoBlock>
            </View>
          </Card>
          <Padder scale={0.2} />
          <Card mode="outlined" style={styles.card}>
            {data?.launchPeriodInfo && (
              <ProgressChartWidget
                title={`Launch period`}
                detail={`${data?.launchPeriodInfo.progressPercent}%\n${timeLeftString}`}
                data={[data?.launchPeriodInfo.progressPercent / 100]}
              />
            )}
          </Card>
        </View>
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
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
