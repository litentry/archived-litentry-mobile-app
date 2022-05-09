import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useCrowdloanSummary} from 'src/api/hooks/useCrowdloanSummary';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {ProgressChart} from '@ui/components/ProgressChart';
import {Padder} from '@ui/components/Padder';
import {Subheading, Caption, Card} from '@ui/library';
import {LoadingBox} from './LoadingBox';

export function CrowdloanSummaryTeaser() {
  const {formatBalance} = useFormatBalance();
  const {data, loading} = useCrowdloanSummary();

  if (loading && !data) {
    return (
      <Card>
        <Card.Content>
          <LoadingBox />
        </Card.Content>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const activeRaised = formatBalance(data.activeRaised, {isShort: true});
  const activeCap = formatBalance(data.activeCap, {isShort: true});
  const totalRaised = formatBalance(data.totalRaised, {isShort: true});
  const totalCap = formatBalance(data.totalCap, {isShort: true});

  return (
    <Card>
      <Card.Content>
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <ProgressChart percent={data.activeProgress} width={100} />
            <Padder />
            <View>
              <Subheading>{`Active Raised / Cap`}</Subheading>
              <Caption>{`${activeRaised} / ${activeCap}`}</Caption>
            </View>
          </View>
          <Padder scale={0.4} />
          <View style={styles.progressContainer}>
            <ProgressChart percent={data.totalProgress} width={100} />
            <Padder />
            <View>
              <Subheading>{`Total Raised / Cap`}</Subheading>
              <Caption>{`${totalRaised} / ${totalCap}`}</Caption>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
