import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {useDemocracySummary} from 'src/api/hooks/useDemocracySummary';
import {formatNumber, BN_ONE, BN_ZERO, BN_HUNDRED} from '@polkadot/util';
import {Padder} from '@ui/components/Padder';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {standardPadding} from '@ui/styles';
import {LoadingBox} from '@ui/components/LoadingBox';
import {Card} from '@ui/library';

type Props = {
  onPress: () => void;
};

export function DemocracySummaryTeaser(props: Props) {
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
    <SectionTeaserContainer onPress={props.onPress} title="Democracy">
      {isLoading ? (
        <LoadingBox />
      ) : (
        <View style={styles.boxRow}>
          <Card mode="outlined" style={styles.card}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Proposals">{formatNumber(data?.activeProposalsCount)}</StatInfoBlock>
              <StatInfoBlock title="Total">{formatNumber(data?.publicPropCount)}</StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Referenda">{formatNumber(data?.referenda)}</StatInfoBlock>
              <StatInfoBlock title="Total">{formatNumber(data?.referendumTotal)}</StatInfoBlock>
            </View>
          </Card>
          <Padder scale={0.2} />
          <Card mode="outlined" style={styles.card}>
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
    padding: standardPadding * 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
