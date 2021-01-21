import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/types';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {Layout} from '@ui-kitten/components';
import IdentityInfoForm from 'presentational/IdentityInfoForm';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function TestScreen({navigation}: PropTypes) {
  return (
    <GenericNavigationLayout
      title="Identity Info Form"
      onBackPressed={() => navigation.goBack()}>
      <Layout level="1">
        <IdentityInfoForm
          onSubmit={(identityInfo) => console.log(identityInfo)}
        />
      </Layout>
    </GenericNavigationLayout>
  );
}

export default TestScreen;
