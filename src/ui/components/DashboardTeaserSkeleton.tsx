import React from 'react';
import {Padder} from '@ui/components/Padder';
import {Skeleton} from '@ui/library';

export function DashboardTeaserSkeleton() {
  return (
    <>
      <Skeleton width={50} />
      <Padder scale={0.3} />
      <Skeleton width={70} />
      <Padder scale={0.3} />
      <Skeleton width={60} />
      <Padder scale={0.3} />
      <Skeleton width={80} />
    </>
  );
}
