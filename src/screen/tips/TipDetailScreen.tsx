import React from 'react';
import {Text} from '@ui-kitten/components';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';

type ScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
  route: RouteProp<DashboardStackParamList, 'TipDetail'>;
};

function TipDetailScreen({navigation, route}: ScreenProps) {
  return (
    <GenericNavigationLayout
      title="Tip"
      onBackPressed={() => navigation.goBack()}>
      <Text>Tip Detail Screen</Text>
      <Text>{route.params?.hash}</Text>
    </GenericNavigationLayout>
  );
}

export default TipDetailScreen;
