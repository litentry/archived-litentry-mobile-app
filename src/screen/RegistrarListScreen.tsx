import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import RegistrarList from 'layout/RegistrarList';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function RegistrarListScreen(props: PropTypes) {
  const {navigation} = props;

  return (
    <GenericNavigationLayout title="Registrars" onBackPressed={() => navigation.goBack()}>
      <RegistrarList />
    </GenericNavigationLayout>
  );
}

export default RegistrarListScreen;
