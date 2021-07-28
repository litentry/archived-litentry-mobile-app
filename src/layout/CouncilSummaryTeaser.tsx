import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout} from '@ui-kitten/components';
import globalStyles from 'src/styles';
import Padder from 'presentational/Padder';
import AddressInlineTeaser from './AddressInlineTeaser';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import ProgressChartWidget from 'presentational/ProgressWidget';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {useElectionsInfo} from 'src/api/hooks/useElectionsInfo';
import LoadingView from 'presentational/LoadingView';

type PropTypes = {
  onMorePress: () => void;
};

export function CouncilSummaryTeaser(props: PropTypes) {
  const {data: electionsInfo, isLoading} = useElectionsInfo();
  const {timeStringParts} = useBlockTime(electionsInfo?.data.termDuration);
  const {timeStringParts: termLeft} = useBlockTime(electionsInfo?.data.termLeft);

  if (isLoading) {
    return <LoadingView />;
  }

  if (!electionsInfo) {
    return <View />;
  }

  return (
    <SeactionTeaserContainer onMorePress={props.onMorePress} title="Council">
      <View>
        <Layout style={styles.container}>
          <Card style={[styles.item, styles.left]}>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Seats">{electionsInfo.data.seatDisplay}</StatInfoBlock>
              <StatInfoBlock title="Runners up">{electionsInfo.data.runnersupDisplay}</StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Prime Voter">
              {electionsInfo.prime && <AddressInlineTeaser address={electionsInfo.prime?.toString()} />}
            </StatInfoBlock>
          </Card>
          <Card style={[styles.item, styles.right, styles.center]} disabled>
            <ProgressChartWidget
              title={`Term Progress (${timeStringParts[0]})`}
              detail={`${electionsInfo.data.percentage}%\n${termLeft[0] || ''}${termLeft[1] ? `\n${termLeft[1]}` : ''}`}
              data={[electionsInfo.data.percentage / 100]}
            />
          </Card>
        </Layout>
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
