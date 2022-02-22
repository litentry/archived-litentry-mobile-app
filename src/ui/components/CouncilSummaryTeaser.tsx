import React from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {LoadingBox} from '@ui/components/LoadingBox';
import {Card} from '@ui/library';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

type PropTypes = {
  onPress: () => void;
};

export function CouncilSummaryTeaser(props: PropTypes) {
  const {data, loading} = useCouncilSummary();

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Council">
      {loading ? (
        <LoadingBox />
      ) : data ? (
        <>
          <View style={globalStyles.spaceBetweenRowContainer}>
            <Card mode="outlined" style={styles.card}>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <StatInfoBlock title="Seats">{`${data.totalMembers}/${data.desiredSeats}`}</StatInfoBlock>
                <StatInfoBlock title="Runners up">{`${data.totalRunnersUp}/${data.desiredRunnersUp}`}</StatInfoBlock>
              </View>
              <Padder scale={1} />
              <StatInfoBlock title="Candidates">{`${data.totalCandidates}`}</StatInfoBlock>
            </Card>
            <Padder scale={0.2} />
            <Card mode="outlined" style={styles.card}>
              <ProgressChartWidget
                title={`Term Progress (${data.termProgress.termDurationParts[0]})`}
                detail={`${data.termProgress.percentage}%\n${data.termProgress.termLeftParts?.[0] || ''}${
                  data.termProgress.termLeftParts?.[1] ? `\n${data.termProgress.termLeftParts[1]}` : ''
                }`}
                data={[data.termProgress.percentage ?? 0 / 100]}
              />
            </Card>
          </View>
          <Padder scale={0.2} />
          {data.primeMember ? (
            <Card mode="outlined" style={[styles.card]}>
              <StatInfoBlock title="Prime Voter">
                <AccountTeaser identiconSize={30} account={data.primeMember.account} />
              </StatInfoBlock>
            </Card>
          ) : null}
        </>
      ) : null}
    </SectionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: standardPadding * 2,
  },
});
