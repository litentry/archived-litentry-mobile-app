import React from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {LoadingBox} from '@ui/components/LoadingBox';
import {Card} from '@ui/library';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {AccountTeaser} from './Account/AccountTeaser';

type PropTypes = {
  onPress: () => void;
};

export function CouncilSummaryTeaser(props: PropTypes) {
  const {data: council, loading} = useCouncilSummary();

  return (
    <SectionTeaserContainer onPress={props.onPress} title="Council">
      {loading && !council ? (
        <LoadingBox />
      ) : (
        <>
          <View style={globalStyles.spaceBetweenRowContainer}>
            <Card mode="outlined" style={styles.card}>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <StatInfoBlock title="Seats">{`${council?.totalMembers}/${council?.desiredSeats}`}</StatInfoBlock>
                <StatInfoBlock title="Runners up">{`${council?.totalRunnersUp}/${council?.desiredRunnersUp}`}</StatInfoBlock>
              </View>
              <Padder scale={1} />
              <StatInfoBlock title="Candidates">{`${council?.totalCandidates}`}</StatInfoBlock>
            </Card>
            <Padder scale={0.2} />
            <Card mode="outlined" style={styles.card}>
              {council ? (
                <ProgressChartWidget
                  title={`Term Progress (${council.termProgress.termDurationParts[0]})`}
                  detail={`${council.termProgress.percentage}%\n${council.termProgress.termLeftParts
                    ?.slice(0, 2)
                    .join('\n')}`}
                  data={[council.termProgress.percentage / 100]}
                />
              ) : null}
            </Card>
          </View>
          <Padder scale={0.2} />
          {council?.primeMember ? (
            <Card mode="outlined" style={[styles.card]}>
              <StatInfoBlock title="Prime Voter">
                <AccountTeaser account={council.primeMember.account} />
              </StatInfoBlock>
            </Card>
          ) : null}
        </>
      )}
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
