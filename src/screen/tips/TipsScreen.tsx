import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {List, Divider} from '@ui-kitten/components';
import {RouteProp} from '@react-navigation/native';

import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {useTips} from 'src/hook/useTips';
import TipTeaser from 'layout/TipTeaser';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'TipDetail'>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

function TipsScreen({navigation}: ScreenProps) {
  const tips = useTips();

  return (
    <GenericNavigationLayout
      title="Tips"
      onBackPressed={() => navigation.goBack()}>
      <View style={styles.container}>
        <List
          data={tips}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => <TipTeaser tip={item} />}
        />
      </View>
    </GenericNavigationLayout>
  );
}

export default TipsScreen;
