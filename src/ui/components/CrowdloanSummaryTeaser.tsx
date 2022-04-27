import globalStyles from '@ui/styles';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useCrowdloanSummary} from 'src/api/hooks/useCrowdloanSummary';
import {Chart} from '@ui/components/Chart';
import {Subheading, Caption, List} from '@ui/library';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {LoadingBox} from './LoadingBox';

export function CrowdloanSummaryTeaser() {
  const {formatBalance} = useFormatBalance();
  const {data, loading} = useCrowdloanSummary();

  if (loading && !data) {
    return <LoadingBox />;
  }

  if (!data) {
    return null;
  }

  const activeRaised = formatBalance(data.activeRaised, {isShort: true});
  const activeCap = formatBalance(data.activeCap, {isShort: true});
  const totalRaised = formatBalance(data.totalRaised, {isShort: true});
  const totalCap = formatBalance(data.totalCap, {isShort: true});

  return (
    <View style={globalStyles.rowContainer}>
      <View style={styles.infoContainer}>
        <List.Item
          left={() => <Chart percent={data.activeProgress} />}
          title={<Subheading>{`Active Raised / Cap`}</Subheading>}
          description={<Caption>{`${activeRaised} / ${activeCap}`}</Caption>}
        />
        <List.Item
          left={() => <Chart percent={data.totalProgress} />}
          title={<Subheading>{`Total Raised / Cap`}</Subheading>}
          description={<Caption>{`${totalRaised} / ${totalCap}`}</Caption>}
        />
      </View>

      <View style={styles.fundsContainer}>
        <Subheading>{`Funds: ${data.totalFunds}`}</Subheading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 3,
  },
  fundsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
