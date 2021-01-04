import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout} from '@ui-kitten/components';
import globalStyles from 'src/styles';
import withElectionInfo, {InjectedPropTypes} from 'src/hoc/withElectionInfo';
import Padder from 'presentational/Padder';
import AddressInlineTeaser from './AddressInlineTeaser';
import MotionTeaserCard from './MotionTeaser';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import {useBlockTime} from 'src/hook/useBlockTime';
import ProgressChartWidget from 'presentational/ProgressWidget';
import StatInfoBlock from 'presentational/StatInfoBlock';

type PropTypes = {
  onMorePress: () => void;
};

function CouncilTeaserCard(props: PropTypes & InjectedPropTypes) {
  const {timeStringParts} = useBlockTime(props.electionsInfo.data.termDuration);
  const {timeStringParts: termLeft} = useBlockTime(
    props.electionsInfo.data.termLeft,
  );

  return (
    <SeactionTeaserContainer onMorePress={props.onMorePress} title="Concil">
      <View>
        <Layout style={styles.container}>
          <Card style={[styles.item, styles.left]}>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="Seats">
                {props.electionsInfo.data.seatDisplay}
              </StatInfoBlock>
              <StatInfoBlock title="Runners up">
                {props.electionsInfo.data.runnersupDisplay}
              </StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Prime Voter">
              {props.electionsInfo.prime && (
                <AddressInlineTeaser
                  address={props.electionsInfo.prime?.toString()}
                />
              )}
            </StatInfoBlock>
          </Card>
          <Card style={[styles.item, styles.right, styles.center]} disabled>
            <ProgressChartWidget
              title={`Term Progress (${timeStringParts[0]})`}
              detail={`${props.electionsInfo.data.percentage}%\n${termLeft[0]}\n${termLeft[1]}`}
              data={[props.electionsInfo.data.percentage / 100]}
            />
          </Card>
        </Layout>
      </View>
      <MotionTeaserCard title="Latest Motion" />
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

export default withElectionInfo(CouncilTeaserCard);
