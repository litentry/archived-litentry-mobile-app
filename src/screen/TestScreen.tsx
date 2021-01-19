import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/types';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {Layout} from '@ui-kitten/components';
import {Text} from 'react-native';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function TestScreen({navigation}: PropTypes) {
  return (
    <GenericNavigationLayout
      title="Identity Form"
      onBackPressed={() => navigation.goBack()}>
      <Layout level="1">
        <Text>Test</Text>
      </Layout>
    </GenericNavigationLayout>
  );
}

export default TestScreen;
