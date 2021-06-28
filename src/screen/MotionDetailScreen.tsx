import React, {useEffect} from 'react';
import withMotionDetail, {InjectedPropTypes as MotionDetailInjectedPropTypes} from 'src/hoc/withMotionDetail';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import MotionDetailPage from 'layout/MotionDetailPage';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
  route: RouteProp<DashboardStackParamList, 'Motion'>;
};

function MotionDetailScreen(props: PropTypes & MotionDetailInjectedPropTypes) {
  const {
    motionDetail: {show, motion},
    route: {params},
  } = props;

  const {hash, id} = params;

  useEffect(() => {
    show(hash, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SafeView edges={noTopEdges}>{motion ? <MotionDetailPage motion={motion} /> : <LoadingView />}</SafeView>;
}

export default withMotionDetail(MotionDetailScreen);
