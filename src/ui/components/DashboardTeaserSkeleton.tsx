import React from 'react';
import {View} from 'react-native';
import {Padder} from '@ui/components/Padder';
import {Skeleton} from '@ui/library';

export function DashboardTeaserSkeleton() {
  return (
    <View testID="loading_box">
      <Skeleton width={50} />
      <Padder scale={0.3} />
      <Skeleton width={70} />
      <Padder scale={0.3} />
      <Skeleton width={60} />
      <Padder scale={0.3} />
      <Skeleton width={80} />
    </View>
  );
}
