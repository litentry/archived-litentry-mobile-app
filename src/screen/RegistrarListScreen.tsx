import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import RegistrarList from 'layout/RegistrarList';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {DrawerParamList} from 'src/navigation/navigation';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function RegistrarListScreen({}: PropTypes) {
  return (
    <SafeView edges={noTopEdges}>
      <RegistrarList />
    </SafeView>
  );
}

export default RegistrarListScreen;
