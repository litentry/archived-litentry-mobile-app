import React from 'react';
import {StyleSheet} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/types';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import RegistrarList from 'layout/RegistrarList';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function RegistrarListScreen(props: PropTypes) {
  const {navigation} = props;

  return (
    <GenericNavigationLayout
      title="Registrars"
      onBackPressed={() => navigation.goBack()}>
      <RegistrarList />
    </GenericNavigationLayout>
  );
}

const styles = StyleSheet.create({});

export default RegistrarListScreen;
