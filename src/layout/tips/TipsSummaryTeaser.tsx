import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from '@ui-kitten/components';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import Padder from 'presentational/Padder';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import StatInfoBlock from 'presentational/StatInfoBlock';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTips} from 'src/api/hooks/useTips';
import {TipReason} from 'src/layout/tips/TipReason';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {tipDetailScreen} from 'src/navigation/routeKeys';

type TipsSummaryTeaserProps = {
  onMorePress: () => void;
};

function TipsSummaryTeaser({onMorePress}: TipsSummaryTeaserProps) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const {data: tips} = useTips();

  const latestTip = tips ? tips[tips.length - 1] : undefined;
  const [id, tip] = latestTip ?? [];

  return (
    <SeactionTeaserContainer title={`Tips ${tips?.length ? `(${tips.length})` : ''}`} onMorePress={onMorePress}>
      {id && tip ? (
        <Card onPress={() => navigation.navigate(tipDetailScreen, {hash: String(id)})}>
          <View style={styles.row}>
            <StatInfoBlock title="Who">
              <AddressInlineTeaser address={String(tip.who)} />
            </StatInfoBlock>
            <Padder scale={0.5} />
            <StatInfoBlock title="Finder">
              <AddressInlineTeaser address={String(tip.finder)} />
            </StatInfoBlock>
          </View>
          <Padder scale={0.5} />
          <StatInfoBlock title="Reason">{tip.reason && <TipReason reasonHash={tip.reason} />}</StatInfoBlock>
        </Card>
      ) : undefined}
    </SeactionTeaserContainer>
  );
}

export default TipsSummaryTeaser;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
