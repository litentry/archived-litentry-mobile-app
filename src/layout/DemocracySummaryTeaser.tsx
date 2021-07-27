import {Card} from '@ui-kitten/components/ui';
import SectionTeaserContainer from 'presentational/SectionTeaserContainer';
import StatInfoBlock from 'presentational/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {formatNumber, BN_ONE, BN_ZERO, BN_HUNDRED} from '@polkadot/util';
import Padder from 'presentational/Padder';
import {useBestNumber} from 'src/api/hooks/useVotingStatus';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {standardPadding} from 'src/styles';

type Props = {
  onMorePress: () => void;
};

export function DemocracySummaryTeaser(props: Props) {
  const {data} = useDemocracy();
  const bestNumber = useBestNumber();

  const total = data?.launchPeriod;
  const progress = total && bestNumber ? bestNumber.mod(total).iadd(BN_ONE) : BN_ZERO;
  const timeLeft = total?.sub(progress);

  const progressPercent = progress
    .mul(BN_HUNDRED)
    .div(total ?? BN_ONE)
    .toNumber();

  const {
    timeStringParts: [daysLeft, hoursLeft],
  } = useBlockTime(timeLeft);

  return (
    <SectionTeaserContainer onMorePress={props.onMorePress} title="Democracy">
      <View style={styles.boxRow}>
        <Card style={styles.card}>
          <View style={styles.itemRow}>
            <StatInfoBlock title="Proposals">{formatNumber(data?.activeProposals.length)}</StatInfoBlock>
            <StatInfoBlock title="Total">{formatNumber(data?.publicPropCount)}</StatInfoBlock>
          </View>
          <View style={styles.itemRow}>
            <StatInfoBlock title="Referenda">{formatNumber(data?.referndums.length)}</StatInfoBlock>
            <StatInfoBlock title="Total">{formatNumber(data?.referendumTotal)}</StatInfoBlock>
          </View>
        </Card>
        <Padder scale={0.2} />
        <Card style={styles.card}>
          {data?.launchPeriod && bestNumber && (
            <ProgressChartWidget
              title={`Launch period`}
              detail={`${progressPercent}%\n${daysLeft}\n${hoursLeft}`}
              data={[progressPercent / 100]}
            />
          )}
        </Card>
      </View>
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
