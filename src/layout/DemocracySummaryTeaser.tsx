import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import StatInfoBlock from 'presentational/StatInfoBlock';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDemocracySummary} from 'src/api/hooks/useDemocracySummary';
import {formatNumber, BN_ONE, BN_ZERO, BN_HUNDRED} from '@polkadot/util';
import {Padder, View, useTheme} from 'src/packages/base_components';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {standardPadding} from 'src/styles';
import {LoadingBox} from 'presentational/LoadingBox';

type Props = {
  onPressMore: () => void;
};

export function DemocracySummaryTeaser(props: Props) {
  const {colors} = useTheme();
  const {data, isLoading} = useDemocracySummary();
  const bestNumber = useBestNumber();

  const total = data?.launchPeriod;
  const progress = total && bestNumber ? bestNumber.mod(total).iadd(BN_ONE) : BN_ZERO;
  const timeLeft = total?.sub(progress);
  const {timeStringParts} = useBlockTime(timeLeft);

  const progressPercent = progress
    .mul(BN_HUNDRED)
    .div(total ?? BN_ONE)
    .toNumber();

  const firstTwoNoneEmptyTimeParts = timeStringParts.filter(Boolean).slice(0, 2);
  const timeLeftString = firstTwoNoneEmptyTimeParts.join('\n');

  return (
    <SectionTeaserContainer onPressMore={props.onPressMore} title="Democracy">
      {isLoading ? (
        <LoadingBox />
      ) : (
        <View style={styles.boxRow}>
          <View style={[styles.card, {borderColor: colors.backdrop}]}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Proposals">{formatNumber(data?.activeProposalsCount)}</StatInfoBlock>
              <StatInfoBlock title="Total">{formatNumber(data?.publicPropCount)}</StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Referenda">{formatNumber(data?.referenda)}</StatInfoBlock>
              <StatInfoBlock title="Total">{formatNumber(data?.referendumTotal)}</StatInfoBlock>
            </View>
          </View>
          <Padder scale={0.2} />
          <View style={[styles.card, {borderColor: colors.backdrop}]}>
            {data?.launchPeriod && bestNumber && (
              <ProgressChartWidget
                title={`Launch period`}
                detail={`${progressPercent}%\n${timeLeftString}`}
                data={[progressPercent / 100]}
              />
            )}
          </View>
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
    borderWidth: 1,
    paddingTop: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
    borderRadius: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
