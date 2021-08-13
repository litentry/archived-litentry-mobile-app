import {Card} from '@ui-kitten/components/ui';
import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import StatInfoBlock from 'presentational/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {formatNumber, BN_ONE, BN_ZERO, BN_HUNDRED} from '@polkadot/util';
import Padder from 'presentational/Padder';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {standardPadding} from 'src/styles';
import {LoadingBox} from 'presentational/LoadingBox';

type Props = {
  onPressMore: () => void;
};

export function DemocracySummaryTeaser(props: Props) {
  const {data, isLoading} = useDemocracy();
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
          <Card style={styles.card}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Proposals">{formatNumber(data?.activeProposals.length)}</StatInfoBlock>
              <StatInfoBlock title="Total">{formatNumber(data?.publicPropCount)}</StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Referenda">{formatNumber(data?.referendums.length)}</StatInfoBlock>
              <StatInfoBlock title="Total">{formatNumber(data?.referendumTotal)}</StatInfoBlock>
            </View>
          </Card>
          <Padder scale={0.2} />
          <Card style={styles.card}>
            {data?.launchPeriod && bestNumber && (
              <ProgressChartWidget
                title={`Launch period`}
                detail={`${progressPercent}%\n${timeLeftString}`}
                data={[progressPercent / 100]}
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
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
