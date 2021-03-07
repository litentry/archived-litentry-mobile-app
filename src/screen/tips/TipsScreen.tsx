import React from 'react';
import {Text} from '@ui-kitten/components';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';

type ScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
  route: RouteProp<DashboardStackParamList, 'TipDetail'>;
};

function TipsScreen({navigation}: ScreenProps) {
  return (
    <GenericNavigationLayout
      title="Tips"
      onBackPressed={() => navigation.goBack()}>
      <Text>Tips Screen</Text>
    </GenericNavigationLayout>
  );
}

export default TipsScreen;
