import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from '@ui-kitten/components';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import {LoadingBox} from '@ui/components/LoadingBox';
import {Padder} from '@ui/components/Padder';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {useTips} from 'src/api/hooks/useTips';
import {TipReason} from '@ui/components/tips/TipReason';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {tipDetailScreen} from '@ui/navigation/routeKeys';

type TipsSummaryTeaserProps = {
  onPressMore: () => void;
};

function TipsSummaryTeaser({onPressMore}: TipsSummaryTeaserProps) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const {data: tips, isLoading} = useTips();

  const latestTip = tips ? tips[tips.length - 1] : undefined;
  const [id, tip] = latestTip ?? [];

  return (
    <SectionTeaserContainer title={`Tips ${tips?.length ? `(${tips.length})` : ''}`} onPressMore={onPressMore}>
      {isLoading ? (
        <LoadingBox />
      ) : id && tip ? (
        <Card onPress={() => navigation.navigate(tipDetailScreen, {hash: String(id)})}>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <StatInfoBlock title="Who">
                <View style={styles.addressContainer}>
                  <AddressInlineTeaser address={String(tip.who)} />
                </View>
              </StatInfoBlock>
            </View>
            <Padder scale={0.5} />
            <View style={styles.rowItem}>
              <StatInfoBlock title="Finder">
                <View style={styles.addressContainer}>
                  <AddressInlineTeaser address={String(tip.finder)} />
                </View>
              </StatInfoBlock>
            </View>
          </View>
          <Padder scale={0.5} />
          {tip.reason && <TipReason reasonHash={tip.reason} />}
        </Card>
      ) : undefined}
    </SectionTeaserContainer>
  );
}

export default TipsSummaryTeaser;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
  },
  addressContainer: {
    paddingRight: 30,
  },
});
