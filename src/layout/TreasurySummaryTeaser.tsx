import {bnToBn, BN_ONE, BN_ZERO, formatBalance, formatNumber} from '@polkadot/util';
import {Card, Layout} from '@ui-kitten/components';
import {LoadingBox} from 'presentational/LoadingBox';
import Padder from 'presentational/Padder';
import ProgressChartWidget from 'presentational/ProgressWidget';
import {SectionTeaserContainer} from 'presentational/SectionTeaserContainer';
import StatInfoBlock from 'presentational/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useTreasuryInfo} from 'src/api/hooks/useTreasuryInfo';
import globalStyles from 'src/styles';

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

  return (
    <SectionTeaserContainer onPressMore={props.onPressMore} title="Treasury">
      {isLoading ? (
        <LoadingBox />
      ) : treasuryInfo ? (
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
              <StatInfoBlock title="Available">
                {formatBalance(treasuryInfo.treasuryBalance?.freeBalance)}
              </StatInfoBlock>
              <StatInfoBlock title="Next Burn">{formatBalance(treasuryInfo.burn || BN_ZERO)}</StatInfoBlock>
            </View>
          </Card>
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
