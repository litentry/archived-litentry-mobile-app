import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import MotionDetailPage from 'layout/MotionDetailPage';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {useMotionDetail} from 'src/api/hooks/useMotionDetail';
import {DashboardStackParamList, DrawerParamList} from 'src/navigation/navigation';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
  route: RouteProp<DashboardStackParamList, 'Motion'>;
};

function MotionDetailScreen(props: PropTypes) {
  const {
    route: {params},
  } = props;

  const {data: motion} = useMotionDetail(params);

  return <SafeView edges={noTopEdges}>{motion ? <MotionDetailPage motion={motion} /> : <LoadingView />}</SafeView>;
}

export default MotionDetailScreen;
