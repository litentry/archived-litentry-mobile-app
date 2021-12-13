import React from 'react';
import {StyleSheet} from 'react-native';
import {LoadingBox} from 'presentational/LoadingBox';
import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import {standardPadding} from 'src/styles';
import {useBountiesSummary} from 'src/api/hooks/useBountiesSummary';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {Padder, View, useTheme} from 'src/packages/base_components';
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
  const {colors} = useTheme();
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
          <View style={[styles.card, {borderColor: colors.backdrop}]}>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Active">{formatNumber(data?.activeBounties)}</StatInfoBlock>
              <StatInfoBlock title="Past">{formatNumber(data?.pastBounties)}</StatInfoBlock>
            </View>
            <View style={styles.itemRow}>
              <StatInfoBlock title="Active total">
                {data?.totalValue ? formatBalance(data.totalValue) : null}
              </StatInfoBlock>
            </View>
          </View>
          <Padder scale={0.2} />
          <View style={[styles.card, {borderColor: colors.backdrop}]}>
            {bestNumber && spendPeriod?.gtn(0) && (
              <ProgressChartWidget
                title={`Funding period s (${timeStringParts[0]})`}
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
    padding: standardPadding * 2,
    borderRadius: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
});
