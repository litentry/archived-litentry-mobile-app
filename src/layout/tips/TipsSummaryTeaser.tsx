import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card, Layout} from '@ui-kitten/components';
import {useTips} from 'src/hook/useTips';
import StatInfoBlock from 'presentational/StatInfoBlock';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {tipDetail} from 'src/navigation/routeKeys';
import TipReason from 'src/layout/tips/TipReason';
import {StackNavigationProp} from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statInfoBlockContainer: {
    paddingRight: 5,
  },
});

type TipsSummaryTeaserProps = {
  onMorePress: () => void;
};

function TipsSummaryTeaser({onMorePress}: TipsSummaryTeaserProps) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const {data: tips} = useTips();

  if (!tips || tips.length < 1) {
    return null;
  }

  const latestTip = tips[tips.length - 1];
  const [id, tip] = latestTip ?? [];

  return (
    <SeactionTeaserContainer title={`Tips (${tips.length})`} onMorePress={onMorePress}>
      {id && tip ? (
        <Layout>
          <Card onPress={() => navigation.navigate(tipDetail, {hash: String(id)})}>
            <View style={styles.container}>
              <View style={styles.statInfoBlockContainer}>
                <StatInfoBlock title="Who">
                  <AddressInlineTeaser address={String(tip.who)} />
                </StatInfoBlock>
              </View>
              <View style={styles.statInfoBlockContainer}>
                <StatInfoBlock title="Finder">
                  <AddressInlineTeaser address={String(tip.finder)} />
                </StatInfoBlock>
              </View>
            </View>
            <StatInfoBlock title="Reason">
              <TipReason reasonHash={tip.reason} />
            </StatInfoBlock>
          </Card>
        </Layout>
      ) : undefined}
    </SeactionTeaserContainer>
  );
}

export default TipsSummaryTeaser;
