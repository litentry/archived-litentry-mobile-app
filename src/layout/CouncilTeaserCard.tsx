import React from 'react';
import {StyleSheet, View, ViewProps, TouchableOpacity} from 'react-native';
import {Card, Text, Icon, Layout, useTheme} from '@ui-kitten/components';
import globalStyles, {
  hitSlop,
  monofontFamily,
  standardPadding,
  colorGreen,
  colorRed,
} from 'src/styles';
import withElectionInfo, {InjectedPropTypes} from 'src/hoc/withElectionInfo';
import Padder from 'presentational/Padder';
import {ProgressChart} from 'react-native-chart-kit';
import AddressInlineTeaser from './AddressInlineTeaser';

type PropTypes = {
  onMorePress: () => void;
};

const Header = (props?: ViewProps & Partial<PropTypes>) => (
  <View style={styles.headerContainer}>
    <Text category="h6">Concil</Text>
    <TouchableOpacity onPress={props?.onMorePress} hitSlop={hitSlop}>
      <Icon
        pack="ionic"
        name="chevron-forward-outline"
        style={[globalStyles.inlineIconDimension, globalStyles.iconColor]}
      />
    </TouchableOpacity>
  </View>
);

function CouncilTeaserCard(props: PropTypes & InjectedPropTypes) {
  const latestMotion = props.electionsInfo.motions?.[0];
  const theme = useTheme();

  return (
    <Card appearance="filled" status="control" activeOpacity={0.8}>
      <View>
        <Header onMorePress={props.onMorePress} />
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
          <Card style={[styles.item, styles.right, styles.center]}>
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
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: standardPadding,
  },
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

export default withElectionInfo(CouncilTeaserCard);
