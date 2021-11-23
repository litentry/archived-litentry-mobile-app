import {bnToBn, BN_ONE, BN_ZERO, formatNumber} from '@polkadot/util';
import {Card} from '@ui-kitten/components';
import {LoadingBox} from 'presentational/LoadingBox';
import {Padder} from 'src/packages/base_components';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import StatInfoBlock from 'presentational/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useTreasurySummary} from 'src/api/hooks/useTreasurySummary';
import globalStyles from 'src/styles';

type PropTypes = {
  onPressMore: () => void;
};

export function TreasurySummaryTeaser(props: PropTypes) {
  const bestNumber = useBestNumber();
  const {data: treasurySummary, isLoading} = useTreasurySummary();
  const total = treasurySummary?.spendPeriod || BN_ONE;
  const value = bestNumber?.mod(treasurySummary?.spendPeriod?.toBn() ?? BN_ONE);
  const angle = total.gtn(0)
    ? bnToBn(value || 0)
        .muln(36000)
        .div(total)
        .toNumber() / 100
    : 0;
  const percentage = Math.floor((angle * 100) / 360);

  const {timeStringParts} = useBlockTime(treasurySummary?.spendPeriod);
  const {timeStringParts: termLeft} = useBlockTime(total.sub(value || BN_ONE));
  const formatBalance = useFormatBalance();

  return (
    <SectionTeaserContainer onPressMore={props.onPressMore} title="Treasury">
      {isLoading ? (
        <LoadingBox />
      ) : treasurySummary ? (
        <>
          <View style={styles.container}>
            <Card style={[styles.item, styles.left]} disabled>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <StatInfoBlock title="Proposals">{String(treasurySummary.activeProposals)}</StatInfoBlock>
                <StatInfoBlock title="Totals">{formatNumber(treasurySummary.proposalCount)}</StatInfoBlock>
              </View>
              <Padder scale={1} />
              <StatInfoBlock title="Approved">{String(treasurySummary.approvedProposals)}</StatInfoBlock>
            </Card>
            <Card style={[styles.item, styles.right, styles.center]} disabled>
              <ProgressChartWidget
                title={`Spend period s (${timeStringParts[0]})`}
                detail={`${percentage}%\n${termLeft[0]}${termLeft[1] ? `\n${termLeft[1]}` : ''}`}
                data={[percentage / 100]}
              />
            </Card>
          </View>
          <Padder scale={0.3} />
          <Card disabled>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Available">
                {formatBalance(treasurySummary.treasuryBalance?.freeBalance)}
              </StatInfoBlock>
              <StatInfoBlock title="Next Burn">
                {formatBalance(treasurySummary.burn || BN_ZERO, {isShort: true})}
              </StatInfoBlock>
            </View>
          </Card>
        </>
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
