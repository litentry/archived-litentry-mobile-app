import {bnToBn, BN_ONE, BN_ZERO, formatNumber} from '@polkadot/util';
import {LoadingBox} from '@ui/components/LoadingBox';
import {Padder} from '@ui/components/Padder';
import {Card} from '@ui/library';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useTreasurySummary} from 'src/api/hooks/useTreasurySummary';
import globalStyles, {standardPadding} from '@ui/styles';

type PropTypes = {
  onPress: () => void;
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
    <SectionTeaserContainer onPress={props.onPress} title="Treasury">
      {isLoading ? (
        <LoadingBox />
      ) : treasurySummary ? (
        <>
          <View style={styles.container}>
            <Card mode="outlined" style={styles.card}>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <StatInfoBlock title="Proposals">{String(treasurySummary.activeProposals)}</StatInfoBlock>
                <StatInfoBlock title="Totals">{formatNumber(treasurySummary.proposalCount)}</StatInfoBlock>
              </View>
              <Padder scale={1} />
              <StatInfoBlock title="Approved">{String(treasurySummary.approvedProposals)}</StatInfoBlock>
            </Card>
            <Padder scale={0.2} />
            <Card mode="outlined" style={styles.card}>
              <ProgressChartWidget
                title={`Spend period s (${timeStringParts[0]})`}
                detail={`${percentage}%\n${termLeft[0]}${termLeft[1] ? `\n${termLeft[1]}` : ''}`}
                data={[percentage / 100]}
              />
            </Card>
          </View>
          <Padder scale={0.2} />
          <Card mode="outlined" style={styles.card}>
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
  card: {
    flex: 1,
    padding: standardPadding * 2,
  },
});
