import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, Layout, useTheme} from '@ui-kitten/components';
import {monofontFamily, standardPadding} from 'src/styles';
import withElectionInfo, {InjectedPropTypes} from 'src/hoc/withElectionInfo';
import Padder from 'presentational/Padder';
import {ProgressChart} from 'react-native-chart-kit';
import AddressInlineTeaser from './AddressInlineTeaser';
import MotionTeaserCard from './MotionTeaserCard';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';

type PropTypes = {
  onMorePress: () => void;
};

function CouncilTeaserCard(props: PropTypes & InjectedPropTypes) {
  const theme = useTheme();

  return (
    <SeactionTeaserContainer onMorePress={props.onMorePress} title="Concil">
      <View>
        <Layout style={styles.container}>
          <Card style={[styles.item, styles.left]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text category="c1">Seats</Text>
                <Text style={styles.stats}>
                  {props.electionsInfo.data.seatDisplay}
                </Text>
              </View>
              <View>
                <Text category="c1">Runners up</Text>
                <Text style={styles.stats}>
                  {props.electionsInfo.data.runnersupDisplay}
                </Text>
              </View>
            </View>
            <Padder scale={1} />
            <Text category="c1">Prime Voter</Text>
            <Text style={styles.stats}>
              {props.electionsInfo.prime && (
                <AddressInlineTeaser
                  address={props.electionsInfo.prime?.toString()}
                />
              )}
            </Text>
          </Card>
          <Card style={[styles.item, styles.right, styles.center]} disabled>
            <Text category="c1">Term Progress</Text>
            <View style={styles.chartContainer}>
              <Text
                category="s1"
                style={[
                  StyleSheet.absoluteFillObject,
                  {zIndex: 1, left: '36%', top: '47%'},
                ]}>
                {`${props.electionsInfo.data.percentage}%`}
              </Text>
              <ProgressChart
                data={[props.electionsInfo.data.percentage / 100]}
                width={100}
                height={100}
                strokeWidth={12}
                radius={40}
                chartConfig={{
                  backgroundGradientFromOpacity: 0.5,
                  backgroundGradientFrom: theme['background-basic-color-1'],
                  backgroundGradientTo: theme['background-basic-color-1'],
                  backgroundGradientToOpacity: 1,
                  color: (opacity = 1) => `rgba(27, 197, 117, ${opacity})`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.5,
                  useShadowColorFromDataset: false, // optional
                }}
                hideLegend
              />
            </View>
          </Card>
        </Layout>
      </View>
      <MotionTeaserCard />
    </SeactionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    textAlign: 'center',
    paddingVertical: standardPadding,
    fontSize: 16,
    color: '#ccc',
    fontFamily: monofontFamily,
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
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: standardPadding,
  },
});

export default withElectionInfo(CouncilTeaserCard);
