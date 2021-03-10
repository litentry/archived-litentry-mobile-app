import React, {useEffect} from 'react';
import withMotionDetail, {
  InjectedPropTypes as MotionDetailInjectedPropTypes,
} from 'src/hoc/withMotionDetail';

import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import MotionDetailPage from 'layout/MotionDetailPage';
import LoadingView from 'presentational/LoadingView';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
  route: RouteProp<DashboardStackParamList, 'MotionDetail'>;
};

function MotionDetailScreen(props: PropTypes & MotionDetailInjectedPropTypes) {
  const {
    navigation,
    motionDetail: {show, motion},
    route: {params},
  } = props;

  const {hash, id} = params;

  useEffect(() => {
    show(hash, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GenericNavigationLayout
      title={`Motion Detail #${id}`}
      onBackPressed={() => navigation.goBack()}>
      {motion ? <MotionDetailPage motion={motion} /> : <LoadingView />}
    </GenericNavigationLayout>
  );
}

export default withMotionDetail(MotionDetailScreen);
