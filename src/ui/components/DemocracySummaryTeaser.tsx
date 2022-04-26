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
      {loading && !data ? (
        <LoadingBox />
      ) : data ? (
        <View style={styles.boxRow}>
          <Card mode="outlined" style={styles.card}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Proposals" testID="activeProposals_id">
                {String(data.activeProposals)}
              </StatInfoBlock>
              <StatInfoBlock title="Total" testID="proposals_id">
                {String(data.proposals)}
              </StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Referenda" testID="activeReferendums_id">
                {String(data.activeReferendums)}
              </StatInfoBlock>
              <StatInfoBlock title="Total" testID="referendums_id">
                {String(data.referendums)}
              </StatInfoBlock>
            </View>
          </Card>
          <Padder scale={0.2} />
          <Card mode="outlined" style={styles.card}>
            {data.launchPeriodInfo && (
              <ProgressChartWidget
                title={`Launch period`}
                detail={`${data.launchPeriodInfo.progressPercent}%\n${timeLeftString}`}
                data={[data.launchPeriodInfo.progressPercent / 100]}
              />
            )}
          </Card>
        </View>
      ) : null}
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
