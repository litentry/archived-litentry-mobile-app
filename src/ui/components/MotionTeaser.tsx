import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card, Text} from '@ui-kitten/components';
import LoadingView from '@ui/components/LoadingView';
import {useCouncilMotions} from 'src/api/hooks/useCouncilMotions';
import {motionDetailScreen} from '@ui/navigation/routeKeys';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';

type PropTypes = {title: string};

export function MotionTeaser(props: PropTypes) {
  const navigation = useNavigation();
  const {title} = props;
  const {data: motions, isLoading} = useCouncilMotions();

  if (isLoading) {
    return <LoadingView />;
  }

  if (!motions) {
    return null;
  }

  const latestMotion = motions[0];

  const handleDetail = () => {
    if (latestMotion && latestMotion.votes) {
      navigation.navigate(motionDetailScreen, {
        hash: latestMotion.hash.toString(),
        id: latestMotion.votes.index.toNumber(),
      });
    }
  };

  return (
    <Card style={styles.motionCard} onPress={handleDetail}>
      <Text category="c1">{title}</Text>
      {latestMotion && latestMotion.votes ? (
        <View style={styles.motionContainer}>
          <Text style={styles.motionIndex}>#{latestMotion.votes.index.toNumber() ?? 'unknown'}</Text>
          <Text style={globalStyles.aye}>
            Aye ({latestMotion.votes.ayes.length}/{latestMotion.votes.threshold.toNumber()})
          </Text>
          <Text style={globalStyles.nay}>
            Nay ({latestMotion.votes.nays.length}/{latestMotion.votes.threshold.toNumber()})
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
