import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import RegistrarList from '@ui/components/RegistrarList';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {DrawerParamList} from '@ui/navigation/navigation';

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
