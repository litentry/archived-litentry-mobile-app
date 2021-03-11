import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from '@ui-kitten/components';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import StatInfoBlock from 'presentational/StatInfoBlock';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {useTip} from 'src/hook/useTip';
import TipReason from 'layout/tips/TipReason';
import globalStyles from 'src/styles';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'TipDetail'>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statInfoBlockContainer: {
    paddingRight: 5,
  },
});

function TipDetailScreen({navigation, route}: ScreenProps) {
  const hash = route.params?.hash;
  const tip = useTip(hash);

  if (!tip) {
    return null;
  }

  console.log('TIPS', tip.tips);

  return (
    <GenericNavigationLayout
      title="Tip"
      onBackPressed={() => navigation.goBack()}>
      <ScrollView style={[globalStyles.paddedContainer, styles.container]}>
        <Card>
          <View style={styles.contentContainer}>
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
      </ScrollView>
    </GenericNavigationLayout>
  );
}

export default TipDetailScreen;
