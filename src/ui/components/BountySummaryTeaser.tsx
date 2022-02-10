import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LoadingBox} from '@ui/components/LoadingBox';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import {standardPadding} from '@ui/styles';
import {useBountiesSummary} from 'src/api/hooks/useBountiesSummary';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {Padder} from '@ui/components/Padder';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import {Card} from '@ui/library';

type Props = {
  onPress: () => void;
};

export function BountySummaryTeaser(props: Props) {
  const {data, loading} = useBountiesSummary();

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Bounties">
      {loading ? (
        <LoadingBox />
      ) : (
        <View style={styles.boxRow}>
          <Card mode="outlined" style={styles.card}>
            <View style={styles.itemRow}>
              {data?.activeBounties && <StatInfoBlock title="Active">{data.activeBounties}</StatInfoBlock>}
              {data?.pastBounties && <StatInfoBlock title="Past">{data.pastBounties}</StatInfoBlock>}
            </View>
            <View style={styles.itemRow}>
              {data?.formattedTotalValue && (
                <StatInfoBlock title="Active total">{data.formattedTotalValue}</StatInfoBlock>
              )}
            </View>
          </Card>
          <Padder scale={0.2} />
          <Card mode="outlined" style={styles.card}>
            {data?.progressPercent && data.timeLeft && (
              <ProgressChartWidget
                title={`Funding period (${data.timeLeft[0]})`}
                detail={`${data.progressPercent}%\n${data.timeLeft.join('\n')}`}
                data={[data.progressPercent / 100]}
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
