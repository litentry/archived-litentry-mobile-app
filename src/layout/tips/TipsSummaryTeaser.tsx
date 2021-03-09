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
  const navigation = useNavigation();
  const tips = useTips();

  if (tips.length < 1) {
    return null;
  }

  const latestTip = tips[tips.length - 1][1];

  return (
    <SeactionTeaserContainer
      title={`Tips (${tips.length})`}
      onMorePress={onMorePress}>
      <Layout>
        <Card onPress={() => navigation.navigate(tipDetail)}>
          <View style={styles.container}>
            <View style={styles.statInfoBlockContainer}>
              <StatInfoBlock title="Who">
                <AddressInlineTeaser address={String(latestTip.who)} />
              </StatInfoBlock>
            </View>
            <View style={styles.statInfoBlockContainer}>
              <StatInfoBlock title="Finder">
                <AddressInlineTeaser address={String(latestTip.finder)} />
              </StatInfoBlock>
            </View>
          </View>
          <StatInfoBlock title="Reason">
            <TipReason reasonHash={latestTip.reason} />
          </StatInfoBlock>
        </Card>
      </Layout>
    </SeactionTeaserContainer>
  );
}

export default TipsSummaryTeaser;
