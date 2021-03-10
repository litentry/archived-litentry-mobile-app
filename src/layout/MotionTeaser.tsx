import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {flowRight as compose} from 'lodash';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import withElectionInfo, {
  InjectedPropTypes as ElectionInjectedPropTypes,
} from 'src/hoc/withElectionInfo';
import {useNavigation} from '@react-navigation/native';
import {motionDetail} from 'src/navigation/routeKeys';

type PropTypes = {title: string};

function MotionTeaser(props: PropTypes & ElectionInjectedPropTypes) {
  const navigation = useNavigation();
  const {title} = props;
  const latestMotion = props.electionsInfo.motions?.[0];

  const handleDetail = useCallback(() => {
    if (latestMotion && latestMotion.votes) {
      navigation.navigate(motionDetail, {
        hash: latestMotion.hash.toString(),
        id: latestMotion.votes.index.toNumber(),
      });
    }
  }, [latestMotion, navigation]);

  return (
    <Card style={styles.motionCard} onPress={handleDetail}>
      <Text category="c1">{title}</Text>
      {latestMotion && latestMotion.votes ? (
        <View style={styles.motionContainer}>
          <Text style={styles.motionIndex}>
            #{latestMotion.votes.index.toNumber() ?? 'unknown'}
          </Text>
          <Text style={globalStyles.aye}>
            Aye ({latestMotion.votes.ayes.length}/
            {latestMotion.votes.threshold.toNumber()})
          </Text>
          <Text style={globalStyles.nay}>
            Nay ({latestMotion.votes.nays.length}/
            {latestMotion.votes.threshold.toNumber()})
          </Text>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text>There is currently no motion.</Text>
        </View>
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
  emptyState: {
    paddingVertical: standardPadding,
  },
});

export default compose(withElectionInfo)(MotionTeaser);
