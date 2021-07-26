import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card, Layout, Text} from '@ui-kitten/components';
import {useTips} from 'src/api/hooks/useTips';
import StatInfoBlock from 'presentational/StatInfoBlock';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {tipDetailScreen} from 'src/navigation/routeKeys';
import {TipReason} from 'src/layout/tips/TipReason';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardStackParamList} from 'src/navigation/navigation';
import Padder from 'presentational/Padder';

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
          <StatInfoBlock title="Who">
            <AddressInlineTeaser address={String(tip.who)} />
          </StatInfoBlock>
          <Padder scale={0.5} />
          <StatInfoBlock title="Finder">
            <AddressInlineTeaser address={String(tip.finder)} />
          </StatInfoBlock>
          <Padder scale={0.5} />
          <StatInfoBlock title="Reason">{tip.reason && <TipReason reasonHash={tip.reason} />}</StatInfoBlock>
        </Card>
      ) : undefined}
    </SeactionTeaserContainer>
  );
}

export default TipsSummaryTeaser;
