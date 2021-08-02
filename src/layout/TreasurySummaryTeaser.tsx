import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Card, Layout} from '@ui-kitten/components';
import globalStyles from 'src/styles';
import Padder from 'presentational/Padder';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import ProgressChartWidget from 'presentational/ProgressWidget';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {formatNumber, BN_ONE, bnToBn, formatBalance, BN_ZERO} from '@polkadot/util';
import {useTreasuryInfo} from 'src/api/hooks/useTreasuryInfo';
import {useBestNumber} from 'src/api/hooks/useBestNumber';

type PropTypes = {
  onPressMore: () => void;
};

export function TreasurySummaryTeaser(props: PropTypes) {
  const bestNumber = useBestNumber();
  const {data: treasuryInfo, isLoading} = useTreasuryInfo();
  const total = treasuryInfo?.spendPeriod || BN_ONE;
  const value = bestNumber?.mod(treasuryInfo?.spendPeriod?.toBn() ?? BN_ONE);
  const angle = total.gtn(0)
    ? bnToBn(value || 0)
        .muln(36000)
        .div(total)
        .toNumber() / 100
    : 0;
  const percentage = Math.floor((angle * 100) / 360);

  const {timeStringParts} = useBlockTime(treasuryInfo?.spendPeriod);
  const {timeStringParts: termLeft} = useBlockTime(total.sub(value || BN_ONE));

  if (isLoading) {
    return <ActivityIndicator style={globalStyles.paddedContainer} />;
  }

  if (!treasuryInfo) {
    return null;
  }

  return (
    <SeactionTeaserContainer onPressMore={props.onPressMore} title="Treasury">
      <View>
        <Layout style={styles.container}>
          <Card style={[styles.item, styles.left]} disabled>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Proposals">{String(treasuryInfo.proposals.proposals.length)}</StatInfoBlock>
              <StatInfoBlock title="Totals">{formatNumber(treasuryInfo.proposals.proposalCount)}</StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Approved">{String(treasuryInfo.proposals.approvals.length)}</StatInfoBlock>
          </Card>
          <Card style={[styles.item, styles.right, styles.center]} disabled>
            <ProgressChartWidget
              title={`Spend period s (${timeStringParts[0]})`}
              detail={`${percentage}%\n${termLeft[0]}${termLeft[1] ? `\n${termLeft[1]}` : ''}`}
              data={[percentage / 100]}
            />
          </Card>
        </Layout>
        <Padder scale={0.3} />
        <Card disabled>
          <View style={globalStyles.spaceBetweenRowContainer}>
            <StatInfoBlock title="Available">{formatBalance(treasuryInfo.treasuryBalance?.freeBalance)}</StatInfoBlock>
            <StatInfoBlock title="Next Burn">{formatBalance(treasuryInfo.burn || BN_ZERO)}</StatInfoBlock>
          </View>
        </Card>
      </View>
    </SeactionTeaserContainer>
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
