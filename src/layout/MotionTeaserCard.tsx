import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {flowRight as compose} from 'lodash';
import {
  monofontFamily,
  standardPadding,
  colorGreen,
  colorRed,
} from 'src/styles';
import withElectionInfo, {
  InjectedPropTypes as ElectionInjectedPropTypes,
} from 'src/hoc/withElectionInfo';
import withMotionDetail, {
  InjectedPropTypes as MotionDetailInjectedPropTypes,
} from 'src/hoc/withMotionDetail';

type PropTypes = {};

function MotionTeaserCard(
  props: PropTypes & ElectionInjectedPropTypes & MotionDetailInjectedPropTypes,
) {
  const {motionDetail} = props;
  const latestMotion = props.electionsInfo.motions?.[0];

  const handleDetail = useCallback(() => {
    if (latestMotion.votes) {
      motionDetail.show(latestMotion.hash, latestMotion.votes.index.toNumber());
    }
  }, [latestMotion, motionDetail]);

  return (
    <Card style={styles.motionCard} onPress={handleDetail}>
      <Text category="c1">Latest Motion</Text>
      {latestMotion && latestMotion.votes ? (
        <View style={styles.motionContainer}>
          <Text style={styles.motionIndex}>
            #{latestMotion.votes.index.toNumber() ?? 'unknown'}
          </Text>
          <Text style={styles.aye}>
            Aye ({latestMotion.votes.ayes.length}/
            {latestMotion.votes.threshold.toNumber()})
          </Text>
          <Text style={styles.nye}>
            Nay ({latestMotion.votes.nays.length}/
            {latestMotion.votes.threshold.toNumber()})
          </Text>
        </View>
      ) : (
        <Text>There is currently no motion.</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  motionCard: {
    marginTop: 4,
  },
  motionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: standardPadding,
  },
  motionIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: monofontFamily,
  },
  aye: {
    color: colorGreen,
    fontFamily: monofontFamily,
  },
  nye: {
    color: colorRed,
    fontFamily: monofontFamily,
  },
});

export default compose(withElectionInfo, withMotionDetail)(MotionTeaserCard);
