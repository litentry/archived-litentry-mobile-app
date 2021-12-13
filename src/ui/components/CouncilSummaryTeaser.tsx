import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from '@ui-kitten/components';
import globalStyles from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import AddressInlineTeaser from './AddressInlineTeaser';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {LoadingBox} from '@ui/components/LoadingBox';

type PropTypes = {
  onPressMore: () => void;
};

export function CouncilSummaryTeaser(props: PropTypes) {
  const {data: summary, isLoading} = useCouncilSummary();
  const {timeStringParts} = useBlockTime(summary?.termProgress.termDuration);
  const {timeStringParts: termLeft} = useBlockTime(summary?.termProgress.termLeft);

  return (
    <SectionTeaserContainer onPressMore={props.onPressMore} title="Council">
      {isLoading ? (
        <LoadingBox />
      ) : summary ? (
        <View style={styles.container}>
          <Card style={[styles.item, styles.left]} disabled>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Seats">{summary.seats}</StatInfoBlock>
              <StatInfoBlock title="Runners up">{summary.runnersUp}</StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Prime Voter">
              {summary.prime && <AddressInlineTeaser address={summary.prime} />}
            </StatInfoBlock>
          </Card>
          <Card style={[styles.item, styles.right, styles.center]} disabled>
            <ProgressChartWidget
              title={`Term Progress (${timeStringParts[0]})`}
              detail={`${summary.termProgress.percentage}%\n${termLeft[0] || ''}${
                termLeft[1] ? `\n${termLeft[1]}` : ''
              }`}
              data={[summary.termProgress.percentage / 100]}
            />
          </Card>
        </View>
      ) : null}
    </SectionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
  },
  left: {
    marginRight: 2,
  },
  right: {
    marginLeft: 2,
  },
  center: {
    alignItems: 'center',
  },
});
