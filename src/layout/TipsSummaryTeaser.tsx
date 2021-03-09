import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card, Layout, Text} from '@ui-kitten/components';
import {useTips} from 'src/hook/useTips';
import StatInfoBlock from 'presentational/StatInfoBlock';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import AddressInlineTeaser from './AddressInlineTeaser';
import {Hash} from '@polkadot/types/interfaces';
import {monofontFamily, standardPadding} from 'src/styles';
import {useTipReason} from 'src/hook/useTipReason';
import {tipDetail} from 'src/navigation/routeKeys';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipReasonText: {
    fontSize: 12,
    color: '#ccc',
    fontFamily: monofontFamily,
    paddingVertical: standardPadding,
    textAlign: 'justify',
  },
  statInfoBlockContainer: {
    paddingRight: 5,
  },
});

export function TipReason({reasonHash}: {reasonHash: Hash}) {
  const reasonText = useTipReason(reasonHash);

  return <Text style={styles.tipReasonText}>{reasonText}</Text>;
}

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
      <>
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
      </>
    </SeactionTeaserContainer>
  );
}

export default TipsSummaryTeaser;
