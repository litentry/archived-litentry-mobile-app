import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card} from '@ui-kitten/components/ui';
import {LoadingBox} from 'presentational/LoadingBox';
import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import {standardPadding} from 'src/styles';
import {useBountiesSummary} from 'src/api/hooks/useBountiesSummary';
import StatInfoBlock from 'presentational/StatInfoBlock';
import Padder from 'presentational/Padder';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {BN_ONE, BN_ZERO, BN_HUNDRED} from '@polkadot/util';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {formatNumber} from '@polkadot/util';

type Props = {
  onPressMore: () => void;
};

export function BountySummaryTeaser(props: Props) {
  const formatBalance = useFormatBalance();
  const bestNumber = useBestNumber();
  const {data, isLoading} = useBountiesSummary();

  const spendPeriod = data?.treasurySpendPeriod;
  const progress = spendPeriod && bestNumber ? bestNumber.mod(spendPeriod).iadd(BN_ONE) : BN_ZERO;

  const timeLeft = spendPeriod?.sub(progress);
  const {timeStringParts} = useBlockTime(timeLeft);

  const firstTwoNoneEmptyTimeParts = timeStringParts.filter(Boolean).slice(0, 2);
  const timeLeftString = firstTwoNoneEmptyTimeParts.join('\n');

  const progressPercent = progress
    .mul(BN_HUNDRED)
    .div(spendPeriod ?? BN_ONE)
    .toNumber();

  return (
    <SectionTeaserContainer onPressMore={props.onPressMore} title="Bounties">
      {isLoading ? (
        <LoadingBox />
      ) : (
        <View style={styles.boxRow}>
          <Card style={styles.card}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Active">{formatNumber(data?.activeBounties)}</StatInfoBlock>
              <StatInfoBlock title="Past">{formatNumber(data?.pastBounties)}</StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Active total">
                {data?.totalValue ? formatBalance(data.totalValue) : null}
              </StatInfoBlock>
            </View>
          </Card>
          <Padder scale={0.2} />
          <Card style={styles.card}>
            {bestNumber && spendPeriod?.gtn(0) && (
              <ProgressChartWidget
                title={`Funding period s (${timeStringParts[0]})`}
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
