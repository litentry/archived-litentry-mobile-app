import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {Padder, View, useTheme} from 'src/packages/base_components';
import AddressInlineTeaser from './AddressInlineTeaser';
import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import ProgressChartWidget from 'presentational/ProgressWidget';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {LoadingBox} from 'presentational/LoadingBox';

type PropTypes = {
  onPressMore: () => void;
};

export function CouncilSummaryTeaser(props: PropTypes) {
  const {colors} = useTheme();
  const {data: summary, isLoading} = useCouncilSummary();
  const {timeStringParts} = useBlockTime(summary?.termProgress.termDuration);
  const {timeStringParts: termLeft} = useBlockTime(summary?.termProgress.termLeft);

  return (
    <SectionTeaserContainer onPressMore={props.onPressMore} title="Council">
      {isLoading ? (
        <LoadingBox />
      ) : summary ? (
        <View style={styles.container}>
          <View style={[styles.card, {borderColor: colors.backdrop}]}>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Seats">{summary.seats}</StatInfoBlock>
              <StatInfoBlock title="Runners up">{summary.runnersUp}</StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Prime Voter">
              {summary.prime && <AddressInlineTeaser address={summary.prime} />}
            </StatInfoBlock>
          </View>
          <Padder scale={0.2} />
          <View style={[styles.card, {borderColor: colors.backdrop}]}>
            <ProgressChartWidget
              title={`Term Progress (${timeStringParts[0]})`}
              detail={`${summary.termProgress.percentage}%\n${termLeft[0] || ''}${
                termLeft[1] ? `\n${termLeft[1]}` : ''
              }`}
              data={[summary.termProgress.percentage / 100]}
            />
          </View>
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
  card: {
    flex: 1,
    borderWidth: 1,
    padding: standardPadding * 2,
    borderRadius: 5,
  },
});
