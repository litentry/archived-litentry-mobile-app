import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {
  monofontFamily,
  standardPadding,
  colorGreen,
  colorRed,
} from 'src/styles';
import withElectionInfo, {
  InjectedPropTypes as ElectionInjectedPropTypes,
} from 'src/hoc/withElectionInfo';

type PropTypes = {};

function MotionTeaserCard(props: PropTypes & ElectionInjectedPropTypes) {
  const latestMotion = props.electionsInfo.motions?.[0];

  return (
    <Card style={styles.motionCard}>
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

export default withElectionInfo(MotionTeaserCard);
